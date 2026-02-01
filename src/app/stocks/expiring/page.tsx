'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ExpiringLot {
    id: string
    batchNumber: string | null
    quantity: number
    expiryDate: string
    daysUntilExpiry: number | null
    isExpired: boolean
    urgency: 'expired' | 'critical' | 'warning' | 'normal'
    product: {
        id: string
        name: string
        category: string
        unit: string
    }
    center: {
        id: string
        name: string
    }
    source: string | null
    receivedDate: string
}

interface ExpiringData {
    expiring: ExpiringLot[]
    expired: ExpiringLot[]
    summary: {
        expiringCount: number
        expiredCount: number
        criticalCount: number
    }
}

export default function ExpiringProductsPage() {
    const [data, setData] = useState<ExpiringData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'expired'>('all')
    const [daysFilter, setDaysFilter] = useState(7)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/lots/expiring?days=${daysFilter}`)
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.error('Error fetching expiring lots:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [daysFilter])

    const getUrgencyBadge = (urgency: string) => {
        switch (urgency) {
            case 'expired':
                return <span className="badge badge-error">⛔ Expiré</span>
            case 'critical':
                return <span className="badge badge-error">🔴 Critique (&lt;3j)</span>
            case 'warning':
                return <span className="badge badge-warning">🟡 Attention (&lt;7j)</span>
            default:
                return <span className="badge badge-success">🟢 Normal</span>
        }
    }

    const allLots = [
        ...(data?.expired || []),
        ...(data?.expiring || [])
    ]

    const filteredLots = allLots.filter(lot => {
        if (filter === 'all') return true
        if (filter === 'expired') return lot.isExpired
        if (filter === 'critical') return lot.urgency === 'critical'
        if (filter === 'warning') return lot.urgency === 'warning'
        return true
    })

    return (
        <div className="animate-fade-in">
            <div className="page-header flex justify-between items-start">
                <div>
                    <h1 className="page-title">📅 Dates de Péremption</h1>
                    <p className="page-description">
                        Gérez les produits proches de leur date d'expiration
                    </p>
                </div>
                <Link href="/stocks" className="btn btn-secondary">
                    ← Retour aux stocks
                </Link>
            </div>

            {/* Summary Cards */}
            {data && (
                <div className="grid grid-cols-3 mb-6">
                    <div className="stat-card stat-card-error">
                        <div className="stat-value">{data.summary.expiredCount}</div>
                        <div className="stat-label">Produits expirés</div>
                    </div>
                    <div className="stat-card stat-card-warning">
                        <div className="stat-value">{data.summary.criticalCount}</div>
                        <div className="stat-label">Expire dans 3 jours</div>
                    </div>
                    <div className="stat-card stat-card-accent">
                        <div className="stat-value">{data.summary.expiringCount}</div>
                        <div className="stat-label">Expire dans {daysFilter} jours</div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="card mb-6">
                <div className="flex gap-4 items-center">
                    <div>
                        <label className="label">Période</label>
                        <select
                            className="input select"
                            value={daysFilter}
                            onChange={(e) => setDaysFilter(Number(e.target.value))}
                            style={{ width: 150 }}
                        >
                            <option value={3}>3 jours</option>
                            <option value={7}>7 jours</option>
                            <option value={14}>14 jours</option>
                            <option value={30}>30 jours</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Filtre</label>
                        <div className="flex gap-2">
                            {['all', 'expired', 'critical', 'warning'].map((f) => (
                                <button
                                    key={f}
                                    className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setFilter(f as typeof filter)}
                                >
                                    {f === 'all' ? 'Tous' :
                                        f === 'expired' ? '⛔ Expirés' :
                                            f === 'critical' ? '🔴 Critiques' : '🟡 Attention'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                {isLoading ? (
                    <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                        Chargement...
                    </div>
                ) : filteredLots.length === 0 ? (
                    <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--foreground-muted)' }}>
                        🎉 Aucun produit proche de péremption dans cette période
                    </div>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Catégorie</th>
                                <th>Quantité</th>
                                <th>Date d'expiration</th>
                                <th>Statut</th>
                                <th>Centre</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLots.map((lot) => (
                                <tr key={lot.id} style={{
                                    background: lot.isExpired ? 'var(--error-50)' :
                                        lot.urgency === 'critical' ? 'var(--warning-50)' : 'transparent'
                                }}>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{lot.product.name}</div>
                                        {lot.batchNumber && (
                                            <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                                Lot: {lot.batchNumber}
                                            </div>
                                        )}
                                    </td>
                                    <td>{lot.product.category}</td>
                                    <td>
                                        <strong>{lot.quantity}</strong> {lot.product.unit}
                                    </td>
                                    <td>
                                        <div>{new Date(lot.expiryDate).toLocaleDateString('fr-FR')}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                            {lot.isExpired
                                                ? `Expiré depuis ${Math.abs(lot.daysUntilExpiry || 0)} jours`
                                                : `Dans ${lot.daysUntilExpiry} jours`
                                            }
                                        </div>
                                    </td>
                                    <td>{getUrgencyBadge(lot.urgency)}</td>
                                    <td>{lot.center.name}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                className="btn btn-sm btn-ghost"
                                                title="Marquer comme consommé"
                                            >
                                                ✓
                                            </button>
                                            <button
                                                className="btn btn-sm btn-ghost"
                                                title="Déclarer une perte"
                                                style={{ color: 'var(--error-500)' }}
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
