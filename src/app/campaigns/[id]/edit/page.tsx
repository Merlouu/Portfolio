'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function EditCampaignPage() {
    const params = useParams()
    const campaignId = params.id

    // Mock data - would be fetched from API
    const [name, setName] = useState('Campagne Hiver 2026')
    const [description, setDescription] = useState('Aide alimentaire pour la période hivernale')
    const [startDate, setStartDate] = useState('2026-01-01')
    const [endDate, setEndDate] = useState('2026-03-31')
    const [maxRegistrations, setMaxRegistrations] = useState('200')
    const [isActive, setIsActive] = useState(true)

    const handleSubmit = () => {
        alert('Campagne modifiée avec succès ! (Démo)')
    }

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-center gap-4 mb-4">
                    <Link href={`/campaigns/${campaignId}`} className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Retour
                    </Link>
                </div>
                <h1 className="page-title">Modifier la campagne</h1>
                <p className="page-description">Modification de : {name}</p>
            </div>

            <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
                <div className="form-group">
                    <label className="label">Nom de la campagne *</label>
                    <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="label">Description</label>
                    <textarea
                        className="input"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="label">Date de début</label>
                        <input
                            type="date"
                            className="input"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Date de fin</label>
                        <input
                            type="date"
                            className="input"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="label">Nombre max d'inscriptions</label>
                        <input
                            type="number"
                            className="input"
                            value={maxRegistrations}
                            onChange={(e) => setMaxRegistrations(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Statut</label>
                        <div className="flex items-center gap-3" style={{ height: 42 }}>
                            <button
                                onClick={() => setIsActive(true)}
                                style={{
                                    padding: 'var(--space-2) var(--space-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: 'none',
                                    background: isActive ? 'var(--success-500)' : 'var(--neutral-200)',
                                    color: isActive ? 'white' : 'var(--foreground-muted)',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    fontSize: '0.875rem'
                                }}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setIsActive(false)}
                                style={{
                                    padding: 'var(--space-2) var(--space-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: 'none',
                                    background: !isActive ? 'var(--neutral-500)' : 'var(--neutral-200)',
                                    color: !isActive ? 'white' : 'var(--foreground-muted)',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    fontSize: '0.875rem'
                                }}
                            >
                                Inactive
                            </button>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div style={{
                    background: 'var(--warning-50)',
                    border: '1px solid var(--warning-200)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4)',
                    marginBottom: 'var(--space-6)',
                    display: 'flex',
                    gap: 'var(--space-3)'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--warning-600)" style={{ width: 24, height: 24, flexShrink: 0 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <div style={{ fontSize: '0.875rem', color: 'var(--warning-700)' }}>
                        <strong>Attention :</strong> Cette campagne a déjà 156 inscriptions.
                        Réduire le nombre maximum en dessous de ce chiffre n'est pas possible.
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Link href={`/campaigns/${campaignId}`} className="btn btn-secondary" style={{ flex: 1 }}>
                        Annuler
                    </Link>
                    <button
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                        onClick={handleSubmit}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    )
}
