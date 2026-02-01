import Link from 'next/link'

export default function CentersPage() {
    const centers = [
        {
            id: '1',
            name: 'Centre Principal - Paris 11ème',
            address: '45 Rue de la Roquette',
            city: 'Paris',
            postalCode: '75011',
            phone: '01 43 55 12 34',
            email: 'paris11@coeursolidaire.org',
            volunteers: 8,
            beneficiaries: 156,
            isActive: true
        },
        {
            id: '2',
            name: 'Antenne Nord - Paris 18ème',
            address: '12 Rue Marcadet',
            city: 'Paris',
            postalCode: '75018',
            phone: '01 42 64 78 90',
            email: 'paris18@coeursolidaire.org',
            volunteers: 5,
            beneficiaries: 92,
            isActive: true
        },
        {
            id: '3',
            name: 'Antenne Est - Montreuil',
            address: '78 Boulevard de la République',
            city: 'Montreuil',
            postalCode: '93100',
            phone: '01 48 70 45 67',
            email: 'montreuil@coeursolidaire.org',
            volunteers: 4,
            beneficiaries: 67,
            isActive: true
        },
        {
            id: '4',
            name: 'Antenne Sud - Ivry',
            address: '23 Avenue Georges Gosnat',
            city: 'Ivry-sur-Seine',
            postalCode: '94200',
            phone: '01 46 72 33 21',
            email: 'ivry@coeursolidaire.org',
            volunteers: 3,
            beneficiaries: 45,
            isActive: false
        },
    ]

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1 className="page-title">Centres de Distribution</h1>
                    <p className="page-description">Gérez vos différents points de distribution</p>
                </div>
                <Link href="/centers/new" className="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nouveau centre
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 mb-6">
                <div className="stat-card stat-card-primary">
                    <div className="stat-value" style={{ color: 'var(--primary-600)' }}>4</div>
                    <div className="stat-label">Centres au total</div>
                </div>
                <div className="stat-card stat-card-success">
                    <div className="stat-value" style={{ color: 'var(--success-600)' }}>3</div>
                    <div className="stat-label">Centres actifs</div>
                </div>
                <div className="stat-card stat-card-secondary">
                    <div className="stat-value" style={{ color: 'var(--secondary-600)' }}>20</div>
                    <div className="stat-label">Bénévoles total</div>
                </div>
                <div className="stat-card stat-card-accent">
                    <div className="stat-value" style={{ color: 'var(--accent-600)' }}>360</div>
                    <div className="stat-label">Bénéficiaires servis</div>
                </div>
            </div>

            {/* Centers Grid */}
            <div className="grid grid-cols-2 gap-6">
                {centers.map((center) => (
                    <div key={center.id} className="card" style={{
                        opacity: center.isActive ? 1 : 0.7,
                        position: 'relative'
                    }}>
                        {/* Status indicator */}
                        <div style={{
                            position: 'absolute',
                            top: 'var(--space-4)',
                            right: 'var(--space-4)',
                        }}>
                            <span className={`badge ${center.isActive ? 'badge-success' : 'badge-neutral'}`}>
                                {center.isActive ? 'Actif' : 'Inactif'}
                            </span>
                        </div>

                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                            <div style={{
                                width: 56,
                                height: 56,
                                borderRadius: 'var(--radius-xl)',
                                background: 'linear-gradient(135deg, var(--primary-100), var(--primary-200))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary-600)" style={{ width: 28, height: 28 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                </svg>
                            </div>
                            <div style={{ flex: 1, paddingRight: 'var(--space-16)' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                                    {center.name}
                                </h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                    {center.address}, {center.postalCode} {center.city}
                                </p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-2 gap-4 mb-4" style={{
                            background: 'var(--neutral-50)',
                            padding: 'var(--space-4)',
                            borderRadius: 'var(--radius-lg)',
                            margin: '0 calc(-1 * var(--space-6))',
                            width: 'calc(100% + 2 * var(--space-6))',
                            boxSizing: 'border-box'
                        }}>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--foreground-muted)" style={{ width: 18, height: 18 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                <span style={{ fontSize: '0.875rem' }}>{center.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--foreground-muted)" style={{ width: 18, height: 18 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <span style={{ fontSize: '0.875rem' }}>{center.email}</span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 mb-4">
                            <div className="flex items-center gap-3">
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'var(--secondary-100)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--secondary-600)" style={{ width: 20, height: 20 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{center.volunteers}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>Bénévoles</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'var(--accent-100)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--accent-600)" style={{ width: 20, height: 20 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{center.beneficiaries}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>Bénéficiaires</div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <Link href={`/centers/${center.id}/edit`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                Modifier
                            </Link>
                            <Link href={`/centers/${center.id}/report`} className="btn btn-ghost btn-sm" style={{ flex: 1 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                                Rapport
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
