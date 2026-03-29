'use client'

import { useAuth, ROLE_LABELS } from '@/lib/auth-context'

export default function MyAccountPage() {
    const { user } = useAuth()

    if (!user || user.role !== 'BENEFICIARY') {
        return (
            <div className="animate-fade-in">
                <div className="card" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
                    <p>Accès réservé aux bénéficiaires</p>
                </div>
            </div>
        )
    }

    // Mock data for beneficiary
    const beneficiaryData = {
        dossierNumber: 'BEN-2026-0156',
        registrationDate: '2026-01-15',
        status: 'active',
        points: 45,
        usedThisWeek: 23,
        adults: 2,
        children: 2,
        nextDistribution: '2026-02-01',
        lastDistribution: '2026-01-25',
        totalDistributions: 8
    }

    const recentDistributions = [
        { date: '2026-01-25', items: 6, points: 18 },
        { date: '2026-01-18', items: 5, points: 15 },
        { date: '2026-01-11', items: 7, points: 21 },
        { date: '2026-01-04', items: 4, points: 12 },
    ]

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">Mon Espace</h1>
                <p className="page-description">Bienvenue, {user.name}</p>
            </div>

            {/* Status Card */}
            <div className="card mb-6" style={{
                background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                color: 'white',
                padding: 'var(--space-6)'
            }}>
                <div className="flex justify-between items-start">
                    <div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: 'var(--space-1)' }}>
                            Numéro de dossier
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
                            {beneficiaryData.dossierNumber}
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Statut</div>
                                <span style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    padding: '4px 12px',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                }}>
                                    ✓ Actif
                                </span>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Inscrit depuis</div>
                                <div style={{ fontWeight: 500 }}>{formatDate(beneficiaryData.registrationDate)}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Points disponibles</div>
                        <div style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1 }}>
                            {beneficiaryData.points - beneficiaryData.usedThisWeek}
                        </div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                            sur {beneficiaryData.points} cette semaine
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 mb-6">
                <div className="stat-card stat-card-secondary">
                    <div className="stat-value" style={{ color: 'var(--secondary-600)' }}>
                        {beneficiaryData.adults + beneficiaryData.children}
                    </div>
                    <div className="stat-label">Personnes au foyer</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginTop: 'var(--space-1)' }}>
                        {beneficiaryData.adults} adultes, {beneficiaryData.children} enfants
                    </div>
                </div>
                <div className="stat-card stat-card-success">
                    <div className="stat-value" style={{ color: 'var(--success-600)' }}>
                        {beneficiaryData.totalDistributions}
                    </div>
                    <div className="stat-label">Distributions reçues</div>
                </div>
                <div className="stat-card stat-card-accent">
                    <div className="stat-value" style={{ color: 'var(--accent-600)', fontSize: '1.25rem' }}>
                        {formatDate(beneficiaryData.nextDistribution)}
                    </div>
                    <div className="stat-label">Prochaine distribution</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Recent Distributions */}
                <div className="card">
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                        Mes dernières distributions
                    </h2>
                    <div className="flex flex-col gap-3">
                        {recentDistributions.map((dist, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 'var(--space-3)',
                                    background: 'var(--neutral-50)',
                                    borderRadius: 'var(--radius-lg)'
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 500 }}>{formatDate(dist.date)}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                        {dist.items} articles
                                    </div>
                                </div>
                                <span style={{
                                    fontWeight: 600,
                                    color: 'var(--primary-600)',
                                    background: 'var(--primary-100)',
                                    padding: 'var(--space-1) var(--space-3)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    {dist.points} pts
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Useful Info */}
                <div className="card">
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                        Informations utiles
                    </h2>

                    <div style={{
                        background: 'var(--secondary-50)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--space-4)'
                    }}>
                        <div className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--secondary-600)" style={{ width: 24, height: 24, flexShrink: 0 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 'var(--space-1)' }}>
                                    Votre centre
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                    {user.centerName}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'var(--accent-50)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--space-4)'
                    }}>
                        <div className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--accent-600)" style={{ width: 24, height: 24, flexShrink: 0 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 'var(--space-1)' }}>
                                    Horaires d&apos;ouverture
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                    Mardi et Jeudi : 9h - 12h<br />
                                    Samedi : 10h - 14h
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'var(--primary-50)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)'
                    }}>
                        <div className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary-600)" style={{ width: 24, height: 24, flexShrink: 0 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 'var(--space-1)' }}>
                                    Contact
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                    01 43 55 12 34<br />
                                    contact@coeursolidaire.org
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
