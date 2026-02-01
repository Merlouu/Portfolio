import Link from 'next/link'

export default function BeneficiariesPage() {
    // Mock data - will be replaced with API calls
    const beneficiaries = [
        { id: '1', firstName: 'Marie', lastName: 'Lambert', phone: '06 12 34 56 78', householdSize: 3, pointsBalance: 45, status: 'active' },
        { id: '2', firstName: 'Pierre', lastName: 'Dubois', phone: '06 23 45 67 89', householdSize: 2, pointsBalance: 32, status: 'active' },
        { id: '3', firstName: 'Sophie', lastName: 'Martin', phone: '06 34 56 78 90', householdSize: 5, pointsBalance: 58, status: 'active' },
        { id: '4', firstName: 'Ahmed', lastName: 'Rahmani', phone: '06 45 67 89 01', householdSize: 4, pointsBalance: 20, status: 'pending' },
        { id: '5', firstName: 'Claire', lastName: 'Petit', phone: '06 56 78 90 12', householdSize: 1, pointsBalance: 15, status: 'active' },
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <span className="badge badge-success">Actif</span>
            case 'pending':
                return <span className="badge badge-warning">En attente</span>
            case 'inactive':
                return <span className="badge badge-neutral">Inactif</span>
            default:
                return null
        }
    }

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`
    }

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1 className="page-title">Bénéficiaires</h1>
                    <p className="page-description">Gestion des bénéficiaires inscrits</p>
                </div>
                <Link href="/beneficiaries/new" className="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nouveau bénéficiaire
                </Link>
            </div>

            {/* Search and Filters */}
            <div className="card mb-6" style={{ padding: 'var(--space-4)' }}>
                <div className="flex gap-4">
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            className="input"
                            placeholder="Rechercher par nom, prénom ou téléphone..."
                        />
                    </div>
                    <select className="input select" style={{ width: 200 }}>
                        <option value="">Tous les statuts</option>
                        <option value="active">Actif</option>
                        <option value="pending">En attente</option>
                        <option value="inactive">Inactif</option>
                    </select>
                </div>
            </div>

            {/* Beneficiaries Table */}
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Bénéficiaire</th>
                            <th>Téléphone</th>
                            <th>Foyer</th>
                            <th>Points</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {beneficiaries.map((beneficiary) => (
                            <tr key={beneficiary.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar avatar-sm">
                                            {getInitials(beneficiary.firstName, beneficiary.lastName)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500 }}>
                                                {beneficiary.firstName} {beneficiary.lastName}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{beneficiary.phone}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16, color: 'var(--foreground-muted)' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg>
                                        {beneficiary.householdSize} personne{beneficiary.householdSize > 1 ? 's' : ''}
                                    </div>
                                </td>
                                <td>
                                    <span style={{ fontWeight: 600, color: 'var(--primary-600)' }}>
                                        {beneficiary.pointsBalance} pts
                                    </span>
                                </td>
                                <td>{getStatusBadge(beneficiary.status)}</td>
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
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
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
                    Affichage de 1-5 sur 248 bénéficiaires
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
