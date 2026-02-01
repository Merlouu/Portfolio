'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

export default function StocksPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')
    const [activeTab, setActiveTab] = useState<'stocks' | 'movements'>('stocks')

    // Mock categories
    const categories = [
        { id: 'epicerie', name: 'Épicerie' },
        { id: 'laitiers', name: 'Produits laitiers' },
        { id: 'conserves', name: 'Conserves' },
        { id: 'hygiene', name: 'Hygiène' },
    ]

    // Mock stock data
    const allStocks = [
        { id: '1', name: 'Pâtes (500g)', category: 'epicerie', quantity: 85, minQuantity: 30, unit: 'paquets', expiryDate: '2026-06-15' },
        { id: '2', name: 'Riz (1kg)', category: 'epicerie', quantity: 62, minQuantity: 25, unit: 'paquets', expiryDate: '2026-08-20' },
        { id: '3', name: 'Lait UHT (1L)', category: 'laitiers', quantity: 18, minQuantity: 40, unit: 'bouteilles', expiryDate: '2026-04-10' },
        { id: '4', name: 'Huile de tournesol', category: 'epicerie', quantity: 28, minQuantity: 30, unit: 'bouteilles', expiryDate: '2026-12-01' },
        { id: '5', name: 'Conserve de légumes', category: 'conserves', quantity: 95, minQuantity: 40, unit: 'boîtes', expiryDate: '2027-03-15' },
        { id: '6', name: 'Sucre (1kg)', category: 'epicerie', quantity: 45, minQuantity: 20, unit: 'paquets', expiryDate: null },
        { id: '7', name: 'Beurre (250g)', category: 'laitiers', quantity: 8, minQuantity: 20, unit: 'plaquettes', expiryDate: '2026-02-28' },
        { id: '8', name: 'Savon', category: 'hygiene', quantity: 52, minQuantity: 30, unit: 'pains', expiryDate: null },
        { id: '9', name: 'Dentifrice', category: 'hygiene', quantity: 35, minQuantity: 25, unit: 'tubes', expiryDate: '2027-06-01' },
        { id: '10', name: 'Café moulu', category: 'epicerie', quantity: 22, minQuantity: 15, unit: 'paquets', expiryDate: '2026-09-30' },
    ]

    // Mock movements data (entrées et sorties)
    const allMovements = [
        { id: '1', type: 'ENTRY', product: 'Pâtes (500g)', quantity: 50, date: '2026-01-30T14:30:00', source: 'Don Carrefour', user: 'Sophie Martin' },
        { id: '2', type: 'EXIT', product: 'Lait UHT (1L)', quantity: 6, date: '2026-01-30T11:15:00', source: 'Distribution #245', user: 'Marie Lambert' },
        { id: '3', type: 'ENTRY', product: 'Huile de tournesol', quantity: 30, date: '2026-01-29T16:00:00', source: 'Banque Alimentaire', user: 'Pierre Dubois' },
        { id: '4', type: 'EXIT', product: 'Riz (1kg)', quantity: 8, date: '2026-01-29T10:45:00', source: 'Distribution #244', user: 'Jean Dupont' },
        { id: '5', type: 'EXIT', product: 'Conserve de légumes', quantity: 12, date: '2026-01-28T16:30:00', source: 'Distribution #243', user: 'Marie Lambert' },
        { id: '6', type: 'ENTRY', product: 'Beurre (250g)', quantity: 20, date: '2026-01-28T09:00:00', source: 'Don particulier', user: 'Sophie Martin' },
        { id: '7', type: 'EXIT', product: 'Pâtes (500g)', quantity: 15, date: '2026-01-27T15:20:00', source: 'Distribution #242', user: 'Jean Dupont' },
        { id: '8', type: 'ENTRY', product: 'Savon', quantity: 40, date: '2026-01-27T11:00:00', source: 'Collection école', user: 'Pierre Dubois' },
    ]

    const getStatus = (quantity: number, minQuantity: number) => {
        const ratio = quantity / minQuantity
        if (ratio < 0.5) return 'critical'
        if (ratio < 1) return 'low'
        return 'ok'
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'critical': return 'Critique'
            case 'low': return 'Faible'
            case 'ok': return 'OK'
            default: return status
        }
    }

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'critical': return { bg: 'var(--error-100)', color: 'var(--error-700)' }
            case 'low': return { bg: 'var(--warning-100)', color: 'var(--warning-700)' }
            case 'ok': return { bg: 'var(--success-100)', color: 'var(--success-700)' }
            default: return { bg: 'var(--neutral-100)', color: 'var(--neutral-700)' }
        }
    }

    // Filter stocks
    const filteredStocks = useMemo(() => {
        return allStocks.filter(stock => {
            // Search filter
            if (searchQuery && !stock.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false
            }
            // Category filter
            if (selectedCategory && stock.category !== selectedCategory) {
                return false
            }
            // Status filter
            if (selectedStatus) {
                const status = getStatus(stock.quantity, stock.minQuantity)
                if (status !== selectedStatus) {
                    return false
                }
            }
            return true
        })
    }, [allStocks, searchQuery, selectedCategory, selectedStatus])

    // Calculate stats
    const stats = useMemo(() => {
        const critical = allStocks.filter(s => getStatus(s.quantity, s.minQuantity) === 'critical').length
        const low = allStocks.filter(s => getStatus(s.quantity, s.minQuantity) === 'low').length
        const ok = allStocks.filter(s => getStatus(s.quantity, s.minQuantity) === 'ok').length
        const totalEntries = allMovements.filter(m => m.type === 'ENTRY').reduce((a, b) => a + b.quantity, 0)
        const totalExits = allMovements.filter(m => m.type === 'EXIT').reduce((a, b) => a + b.quantity, 0)
        return { critical, low, ok, totalEntries, totalExits }
    }, [allStocks, allMovements])

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const formatDateTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Gestion des Stocks</h1>
                    <p className="page-description">Suivi des produits et mouvements de stock</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/stocks/entry" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Entrée de stock
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-5 mb-6">
                <div className="stat-card stat-card-success">
                    <div className="stat-value">{stats.ok}</div>
                    <div className="stat-label">Stock OK</div>
                </div>
                <div className="stat-card stat-card-warning">
                    <div className="stat-value">{stats.low}</div>
                    <div className="stat-label">Stock faible</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--error-500)' }}>
                    <div className="stat-value" style={{ color: 'var(--error-600)' }}>{stats.critical}</div>
                    <div className="stat-label">Critique</div>
                </div>
                <div className="stat-card stat-card-primary">
                    <div className="flex items-center gap-2">
                        <span style={{ color: 'var(--success-500)', fontSize: '1.25rem' }}>↑</span>
                        <div className="stat-value">{stats.totalEntries}</div>
                    </div>
                    <div className="stat-label">Entrées (7j)</div>
                </div>
                <div className="stat-card stat-card-secondary">
                    <div className="flex items-center gap-2">
                        <span style={{ color: 'var(--error-500)', fontSize: '1.25rem' }}>↓</span>
                        <div className="stat-value">{stats.totalExits}</div>
                    </div>
                    <div className="stat-label">Sorties (7j)</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setActiveTab('stocks')}
                    style={{
                        padding: 'var(--space-3) var(--space-5)',
                        borderRadius: 'var(--radius-lg)',
                        border: 'none',
                        background: activeTab === 'stocks' ? 'var(--primary-500)' : 'var(--neutral-100)',
                        color: activeTab === 'stocks' ? 'white' : 'var(--foreground)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                    }}
                >
                    📦 Inventaire
                </button>
                <button
                    onClick={() => setActiveTab('movements')}
                    style={{
                        padding: 'var(--space-3) var(--space-5)',
                        borderRadius: 'var(--radius-lg)',
                        border: 'none',
                        background: activeTab === 'movements' ? 'var(--primary-500)' : 'var(--neutral-100)',
                        color: activeTab === 'movements' ? 'white' : 'var(--foreground)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                    }}
                >
                    📋 Mouvements
                </button>
            </div>

            {/* Stocks Tab */}
            {activeTab === 'stocks' && (
                <>
                    {/* Filters */}
                    <div className="card mb-6" style={{ padding: 'var(--space-4)' }}>
                        <div className="flex gap-4 items-end">
                            {/* Search */}
                            <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
                                <label className="label">Rechercher</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Nom du produit..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                <label className="label">Catégorie</label>
                                <select
                                    className="input"
                                    value={selectedCategory}
                                    onChange={e => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">Toutes</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                <label className="label">Statut</label>
                                <select
                                    className="input"
                                    value={selectedStatus}
                                    onChange={e => setSelectedStatus(e.target.value)}
                                >
                                    <option value="">Tous</option>
                                    <option value="ok">OK</option>
                                    <option value="low">Faible</option>
                                    <option value="critical">Critique</option>
                                </select>
                            </div>

                            {/* Reset */}
                            {(searchQuery || selectedCategory || selectedStatus) && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('')
                                        setSelectedCategory('')
                                        setSelectedStatus('')
                                    }}
                                    className="btn btn-ghost"
                                >
                                    Réinitialiser
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Stocks Table */}
                    <div className="card">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Produit</th>
                                    <th>Catégorie</th>
                                    <th>Quantité</th>
                                    <th>Statut</th>
                                    <th>Date d'expiration</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStocks.map(stock => {
                                    const status = getStatus(stock.quantity, stock.minQuantity)
                                    const statusStyle = getStatusStyle(status)
                                    const categoryName = categories.find(c => c.id === stock.category)?.name || stock.category

                                    return (
                                        <tr key={stock.id}>
                                            <td style={{ fontWeight: 500 }}>{stock.name}</td>
                                            <td>
                                                <span className="badge">{categoryName}</span>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <span style={{ fontWeight: 600 }}>{stock.quantity}</span>
                                                    <span style={{ color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>
                                                        / {stock.minQuantity} {stock.unit}
                                                    </span>
                                                </div>
                                                <div className="progress" style={{ height: 4, marginTop: 4, width: 80 }}>
                                                    <div
                                                        className="progress-bar"
                                                        style={{
                                                            width: `${Math.min((stock.quantity / stock.minQuantity) * 100, 100)}%`,
                                                            background: statusStyle.color
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <span style={{
                                                    padding: '4px 10px',
                                                    borderRadius: 'var(--radius-full)',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 500,
                                                    background: statusStyle.bg,
                                                    color: statusStyle.color
                                                }}>
                                                    {getStatusLabel(status)}
                                                </span>
                                            </td>
                                            <td style={{ color: stock.expiryDate ? 'var(--foreground)' : 'var(--foreground-muted)' }}>
                                                {stock.expiryDate ? formatDate(stock.expiryDate) : 'N/A'}
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button className="btn btn-ghost btn-sm">+ Entrée</button>
                                                    <button className="btn btn-ghost btn-sm">- Sortie</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {filteredStocks.length === 0 && (
                            <div style={{
                                textAlign: 'center',
                                padding: 'var(--space-8)',
                                color: 'var(--foreground-muted)'
                            }}>
                                Aucun produit ne correspond aux filtres sélectionnés
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Movements Tab */}
            {activeTab === 'movements' && (
                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                            Historique des mouvements
                        </h2>
                        <div className="flex gap-2">
                            <span style={{
                                padding: '4px 12px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem',
                                background: 'var(--success-100)',
                                color: 'var(--success-700)',
                                fontWeight: 500
                            }}>
                                ↑ Entrées: {stats.totalEntries}
                            </span>
                            <span style={{
                                padding: '4px 12px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem',
                                background: 'var(--error-100)',
                                color: 'var(--error-700)',
                                fontWeight: 500
                            }}>
                                ↓ Sorties: {stats.totalExits}
                            </span>
                        </div>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Produit</th>
                                <th>Quantité</th>
                                <th>Source / Destination</th>
                                <th>Date</th>
                                <th>Par</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allMovements.map(movement => (
                                <tr key={movement.id}>
                                    <td>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-1)',
                                            padding: '4px 10px',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            background: movement.type === 'ENTRY' ? 'var(--success-100)' : 'var(--error-100)',
                                            color: movement.type === 'ENTRY' ? 'var(--success-700)' : 'var(--error-700)'
                                        }}>
                                            {movement.type === 'ENTRY' ? '↑ Entrée' : '↓ Sortie'}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{movement.product}</td>
                                    <td>
                                        <span style={{
                                            fontWeight: 600,
                                            color: movement.type === 'ENTRY' ? 'var(--success-600)' : 'var(--error-600)'
                                        }}>
                                            {movement.type === 'ENTRY' ? '+' : '-'}{movement.quantity}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--foreground-muted)' }}>{movement.source}</td>
                                    <td>{formatDateTime(movement.date)}</td>
                                    <td style={{ color: 'var(--foreground-muted)' }}>{movement.user}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
