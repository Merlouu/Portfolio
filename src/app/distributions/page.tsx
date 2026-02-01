import Link from 'next/link'

export default function DistributionsPage() {
    // Mock data
    const distributions = [
        { id: '1', beneficiary: 'Marie Lambert', date: '2026-01-30', time: '14:30', points: 45, items: 6, status: 'completed' },
        { id: '2', beneficiary: 'Pierre Dubois', date: '2026-01-30', time: '11:15', points: 32, items: 4, status: 'completed' },
        { id: '3', beneficiary: 'Sophie Martin', date: '2026-01-29', time: '16:00', points: 58, items: 8, status: 'completed' },
        { id: '4', beneficiary: 'Ahmed Rahmani', date: '2026-01-29', time: '10:30', points: 40, items: 5, status: 'pending' },
        { id: '5', beneficiary: 'Claire Petit', date: '2026-01-28', time: '14:00', points: 25, items: 3, status: 'completed' },
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <span className="badge badge-success">Terminé</span>
            case 'pending':
                return <span className="badge badge-warning">En cours</span>
            case 'cancelled':
                return <span className="badge badge-error">Annulé</span>
            default:
                return null
        }
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const getInitials = (name: string) => {
        const parts = name.split(' ')
        return parts.map(p => p.charAt(0)).join('')
    }

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1 className="page-title">Distributions</h1>
                    <p className="page-description">Historique et gestion des distributions</p>
                </div>
                <Link href="/distributions/new" className="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nouvelle distribution
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 mb-6">
                <div className="stat-card stat-card-primary">
                    <div className="stat-value">1,256</div>
                    <div className="stat-label">Distributions ce mois</div>
                </div>
                <div className="stat-card stat-card-secondary">
                    <div className="stat-value">42,350</div>
                    <div className="stat-label">Points distribués</div>
                </div>
                <div className="stat-card stat-card-accent">
                    <div className="stat-value">248</div>
                    <div className="stat-label">Bénéficiaires servis</div>
                </div>
                <div className="stat-card stat-card-success">
                    <div className="stat-value">5.1</div>
                    <div className="stat-label">Moyenne par jour</div>
                </div>
            </div>

            {/* Filters */}
            <div className="card mb-6" style={{ padding: 'var(--space-4)' }}>
                <div className="flex gap-4">
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            className="input"
                            placeholder="Rechercher un bénéficiaire..."
                        />
                    </div>
                    <input
                        type="date"
                        className="input"
                        style={{ width: 180 }}
                    />
                    <select className="input select" style={{ width: 180 }}>
                        <option value="">Tous les statuts</option>
                        <option value="completed">Terminé</option>
                        <option value="pending">En cours</option>
                        <option value="cancelled">Annulé</option>
                    </select>
                </div>
            </div>

            {/* Distributions Table */}
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Bénéficiaire</th>
                            <th>Date</th>
                            <th>Heure</th>
                            <th>Points</th>
                            <th>Articles</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {distributions.map((dist) => (
                            <tr key={dist.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar avatar-sm">{getInitials(dist.beneficiary)}</div>
                                        <span style={{ fontWeight: 500 }}>{dist.beneficiary}</span>
                                    </div>
                                </td>
                                <td>{formatDate(dist.date)}</td>
                                <td>{dist.time}</td>
                                <td>
                                    <span style={{ fontWeight: 600, color: 'var(--primary-600)' }}>{dist.points} pts</span>
                                </td>
                                <td>{dist.items} articles</td>
                                <td>{getStatusBadge(dist.status)}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button className="btn btn-ghost btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </button>
                                        <button className="btn btn-ghost btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                    Affichage de 1-5 sur 1,256 distributions
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-ghost btn-sm" disabled>Précédent</button>
                    <button className="btn btn-primary btn-sm">1</button>
                    <button className="btn btn-ghost btn-sm">2</button>
                    <button className="btn btn-ghost btn-sm">3</button>
                    <button className="btn btn-ghost btn-sm">Suivant</button>
                </div>
            </div>
        </div>
    )
}
