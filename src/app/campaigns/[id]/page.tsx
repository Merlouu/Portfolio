'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function CampaignDetailPage() {
    const params = useParams()
    const campaignId = params.id

    // Mock data - in real app, fetch from API based on id
    const campaign = {
        id: campaignId,
        name: 'Campagne Hiver 2026',
        description: 'Aide alimentaire pour la période hivernale. Distribution de produits de première nécessité aux familles dans le besoin.',
        startDate: '2026-01-01',
        endDate: '2026-03-31',
        maxRegistrations: 200,
        registrations: 156,
        status: 'active',
        center: 'Tous les centres',
        createdAt: '2025-12-15',
    }

    const registrations = [
        { id: '1', name: 'Marie Lambert', date: '2026-01-15', status: 'approved' },
        { id: '2', name: 'Pierre Dubois', date: '2026-01-16', status: 'approved' },
        { id: '3', name: 'Sophie Martin', date: '2026-01-18', status: 'approved' },
        { id: '4', name: 'Ahmed Rahmani', date: '2026-01-20', status: 'pending' },
        { id: '5', name: 'Claire Petit', date: '2026-01-22', status: 'approved' },
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <span className="badge badge-success">Approuvé</span>
            case 'pending':
                return <span className="badge badge-warning">En attente</span>
            case 'rejected':
                return <span className="badge badge-error">Refusé</span>
            default:
                return null
        }
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    const progressPercent = (campaign.registrations / campaign.maxRegistrations) * 100

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/campaigns" className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Retour
                    </Link>
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="page-title" style={{ marginBottom: 0 }}>{campaign.name}</h1>
                            <span className="badge badge-success">En cours</span>
                        </div>
                        <p className="page-description">{campaign.description}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/campaigns/${campaignId}/edit`} className="btn btn-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Modifier
                        </Link>
                        <Link href="/beneficiaries/new" className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                            </svg>
                            Inscrire
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 mb-6">
                <div className="stat-card stat-card-primary">
                    <div className="stat-value" style={{ color: 'var(--primary-600)' }}>{campaign.registrations}</div>
                    <div className="stat-label">Inscriptions</div>
                </div>
                <div className="stat-card stat-card-secondary">
                    <div className="stat-value" style={{ color: 'var(--secondary-600)' }}>{campaign.maxRegistrations - campaign.registrations}</div>
                    <div className="stat-label">Places restantes</div>
                </div>
                <div className="stat-card stat-card-success">
                    <div className="stat-value" style={{ color: 'var(--success-600)' }}>91</div>
                    <div className="stat-label">Jours restants</div>
                </div>
                <div className="stat-card stat-card-accent">
                    <div className="stat-value" style={{ color: 'var(--accent-600)' }}>{Math.round(progressPercent)}%</div>
                    <div className="stat-label">Remplissage</div>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1fr 350px', gap: 'var(--space-6)' }}>
                {/* Left - Registrations */}
                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Inscriptions récentes</h2>
                        <div className="flex gap-2">
                            <select className="input select" style={{ width: 150, padding: 'var(--space-2) var(--space-3)' }}>
                                <option>Tous statuts</option>
                                <option>Approuvé</option>
                                <option>En attente</option>
                            </select>
                        </div>
                    </div>

                    <div className="table-container" style={{ boxShadow: 'none' }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Bénéficiaire</th>
                                    <th>Date d'inscription</th>
                                    <th>Statut</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map(reg => (
                                    <tr key={reg.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar avatar-sm">
                                                    {reg.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span style={{ fontWeight: 500 }}>{reg.name}</span>
                                            </div>
                                        </td>
                                        <td>{formatDate(reg.date)}</td>
                                        <td>{getStatusBadge(reg.status)}</td>
                                        <td>
                                            {reg.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--success-600)' }}>
                                                        Approuver
                                                    </button>
                                                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error-600)' }}>
                                                        Refuser
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right - Info */}
                <div className="card">
                    <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>Informations</h3>

                    <div className="flex flex-col gap-4">
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginBottom: 'var(--space-1)' }}>
                                Période
                            </div>
                            <div style={{ fontWeight: 500 }}>
                                {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginBottom: 'var(--space-1)' }}>
                                Centre
                            </div>
                            <div style={{ fontWeight: 500 }}>{campaign.center}</div>
                        </div>

                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginBottom: 'var(--space-1)' }}>
                                Créée le
                            </div>
                            <div style={{ fontWeight: 500 }}>{formatDate(campaign.createdAt)}</div>
                        </div>

                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginBottom: 'var(--space-2)' }}>
                                Progression
                            </div>
                            <div className="progress" style={{ marginBottom: 'var(--space-1)' }}>
                                <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                {campaign.registrations} / {campaign.maxRegistrations} places
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: 'var(--space-6)',
                        paddingTop: 'var(--space-4)',
                        borderTop: '1px solid var(--neutral-200)'
                    }}>
                        <button className="btn btn-secondary w-full mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Exporter les inscriptions
                        </button>
                        <button className="btn btn-ghost w-full" style={{ color: 'var(--error-600)' }}>
                            Clôturer la campagne
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
