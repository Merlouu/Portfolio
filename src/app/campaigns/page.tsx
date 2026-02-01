import Link from 'next/link'

export default function CampaignsPage() {
  const campaigns = [
    {
      id: '1',
      name: 'Campagne Hiver 2026',
      description: 'Aide alimentaire pour la période hivernale',
      startDate: '2026-01-01',
      endDate: '2026-03-31',
      registrations: 156,
      maxRegistrations: 200,
      status: 'active'
    },
    {
      id: '2',
      name: 'Rentrée Scolaire 2025',
      description: 'Soutien aux familles pour la rentrée',
      startDate: '2025-08-15',
      endDate: '2025-09-30',
      registrations: 89,
      maxRegistrations: 100,
      status: 'completed'
    },
    {
      id: '3',
      name: 'Fêtes de fin d\'année 2025',
      description: 'Distribution spéciale Noël',
      startDate: '2025-12-01',
      endDate: '2025-12-31',
      registrations: 200,
      maxRegistrations: 200,
      status: 'completed'
    },
    {
      id: '4',
      name: 'Campagne Printemps 2026',
      description: 'Préparation de la campagne de printemps',
      startDate: '2026-04-01',
      endDate: '2026-06-30',
      registrations: 0,
      maxRegistrations: 180,
      status: 'upcoming'
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-success">En cours</span>
      case 'upcoming':
        return <span className="badge badge-primary">À venir</span>
      case 'completed':
        return <span className="badge badge-neutral">Terminée</span>
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

  const getProgressPercent = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100)
  }

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Campagnes</h1>
          <p className="page-description">Gestion des campagnes d'inscription et de distribution</p>
        </div>
        <Link href="/campaigns/new" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nouvelle campagne
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 mb-6">
        <div className="stat-card stat-card-success">
          <div className="stat-value" style={{ color: 'var(--success-600)' }}>1</div>
          <div className="stat-label">Campagne active</div>
        </div>
        <div className="stat-card stat-card-primary">
          <div className="stat-value" style={{ color: 'var(--primary-600)' }}>1</div>
          <div className="stat-label">À venir</div>
        </div>
        <div className="stat-card stat-card-secondary">
          <div className="stat-value" style={{ color: 'var(--secondary-600)' }}>156</div>
          <div className="stat-label">Inscriptions en cours</div>
        </div>
        <div className="stat-card stat-card-accent">
          <div className="stat-value" style={{ color: 'var(--accent-600)' }}>445</div>
          <div className="stat-label">Total inscriptions 2025</div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Campaign Header */}
            <div style={{
              padding: 'var(--space-5)',
              background: campaign.status === 'active'
                ? 'linear-gradient(135deg, var(--primary-500), var(--primary-600))'
                : campaign.status === 'upcoming'
                  ? 'linear-gradient(135deg, var(--secondary-500), var(--secondary-600))'
                  : 'var(--neutral-100)',
              color: campaign.status === 'completed' ? 'var(--foreground)' : 'white'
            }}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                    {campaign.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>{campaign.description}</p>
                </div>
                {getStatusBadge(campaign.status)}
              </div>
            </div>

            {/* Campaign Body */}
            <div style={{ padding: 'var(--space-5)' }}>
              {/* Dates */}
              <div className="flex gap-6 mb-4">
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginBottom: 'var(--space-1)' }}>
                    Date de début
                  </div>
                  <div style={{ fontWeight: 500 }}>{formatDate(campaign.startDate)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginBottom: 'var(--space-1)' }}>
                    Date de fin
                  </div>
                  <div style={{ fontWeight: 500 }}>{formatDate(campaign.endDate)}</div>
                </div>
              </div>

              {/* Progress */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>Inscriptions</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    {campaign.registrations} / {campaign.maxRegistrations}
                  </span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${getProgressPercent(campaign.registrations, campaign.maxRegistrations)}%`,
                      background: campaign.registrations >= campaign.maxRegistrations
                        ? 'var(--success-500)'
                        : 'linear-gradient(90deg, var(--primary-500), var(--primary-400))'
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link href={`/campaigns/${campaign.id}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  Voir détails
                </Link>
                {campaign.status === 'active' && (
                  <Link href="/beneficiaries/new" className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    Inscrire
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
