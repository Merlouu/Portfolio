'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function CenterReportPage() {
    const params = useParams()
    const centerId = params.id

    // Mock data
    const center = {
        id: centerId,
        name: 'Centre Principal - Paris 11ème',
        address: '45 Rue de la Roquette, 75011 Paris',
    }

    const stats = {
        totalBeneficiaries: 156,
        activeThisMonth: 134,
        newThisMonth: 12,
        distributions: 287,
        productsDistributed: 1456,
        volunteers: 8,
    }

    const monthlyData = [
        { month: 'Septembre', distributions: 42, beneficiaries: 89, products: 234 },
        { month: 'Octobre', distributions: 48, beneficiaries: 102, products: 287 },
        { month: 'Novembre', distributions: 52, beneficiaries: 118, products: 312 },
        { month: 'Décembre', distributions: 61, beneficiaries: 134, products: 398 },
        { month: 'Janvier', distributions: 45, beneficiaries: 128, products: 289 },
    ]

    const topProducts = [
        { name: 'Pâtes (500g)', quantity: 234, percent: 100 },
        { name: 'Riz (1kg)', quantity: 189, percent: 81 },
        { name: 'Huile (1L)', quantity: 156, percent: 67 },
        { name: 'Lait UHT (1L)', quantity: 143, percent: 61 },
        { name: 'Sucre (1kg)', quantity: 98, percent: 42 },
    ]

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/centers" className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Retour
                    </Link>
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="page-title">Rapport d'activité</h1>
                        <p className="page-description">{center.name}</p>
                    </div>
                    <button className="btn btn-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Exporter PDF
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 mb-6">
                <div className="stat-card stat-card-primary">
                    <div className="stat-value" style={{ color: 'var(--primary-600)' }}>{stats.totalBeneficiaries}</div>
                    <div className="stat-label">Bénéficiaires inscrits</div>
                </div>
                <div className="stat-card stat-card-success">
                    <div className="stat-value" style={{ color: 'var(--success-600)' }}>{stats.distributions}</div>
                    <div className="stat-label">Distributions ce mois</div>
                </div>
                <div className="stat-card stat-card-secondary">
                    <div className="stat-value" style={{ color: 'var(--secondary-600)' }}>{stats.productsDistributed}</div>
                    <div className="stat-label">Produits distribués</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Monthly Activity */}
                <div className="card">
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                        Activité mensuelle
                    </h2>
                    <div className="table-container" style={{ boxShadow: 'none' }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Mois</th>
                                    <th style={{ textAlign: 'right' }}>Distributions</th>
                                    <th style={{ textAlign: 'right' }}>Bénéficiaires</th>
                                    <th style={{ textAlign: 'right' }}>Produits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyData.map((row, idx) => (
                                    <tr key={idx}>
                                        <td style={{ fontWeight: 500 }}>{row.month}</td>
                                        <td style={{ textAlign: 'right' }}>{row.distributions}</td>
                                        <td style={{ textAlign: 'right' }}>{row.beneficiaries}</td>
                                        <td style={{ textAlign: 'right' }}>{row.products}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Products */}
                <div className="card">
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                        Produits les plus distribués
                    </h2>
                    <div className="flex flex-col gap-4">
                        {topProducts.map((product, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-center mb-1">
                                    <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{product.name}</span>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                        {product.quantity} unités
                                    </span>
                                </div>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${product.percent}%`,
                                            background: idx === 0
                                                ? 'var(--primary-500)'
                                                : 'var(--secondary-400)'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="card mt-6">
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                    Indicateurs clés
                </h2>
                <div className="grid grid-cols-4 gap-4">
                    <div style={{
                        background: 'var(--neutral-50)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-600)' }}>
                            {stats.newThisMonth}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                            Nouveaux bénéficiaires
                        </div>
                    </div>
                    <div style={{
                        background: 'var(--neutral-50)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success-600)' }}>
                            86%
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                            Taux de présence
                        </div>
                    </div>
                    <div style={{
                        background: 'var(--neutral-50)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary-600)' }}>
                            {stats.volunteers}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                            Bénévoles actifs
                        </div>
                    </div>
                    <div style={{
                        background: 'var(--neutral-50)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-600)' }}>
                            10.8
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                            Articles/distribution
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
