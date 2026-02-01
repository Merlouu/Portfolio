'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function NewCampaignPage() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [maxRegistrations, setMaxRegistrations] = useState('100')
    const [selectedCenter, setSelectedCenter] = useState('')

    const centers = [
        { id: '1', name: 'Centre Principal - Paris 11ème' },
        { id: '2', name: 'Antenne Nord - Paris 18ème' },
        { id: '3', name: 'Antenne Est - Montreuil' },
    ]

    const handleSubmit = () => {
        alert('Campagne créée avec succès ! (Démo - non connecté à la base)')
    }

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
                <h1 className="page-title">Nouvelle Campagne</h1>
                <p className="page-description">Créer une nouvelle campagne d'inscription</p>
            </div>

            <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
                <div className="form-group">
                    <label className="label">Nom de la campagne *</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Ex: Campagne Printemps 2026"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="label">Description</label>
                    <textarea
                        className="input"
                        rows={3}
                        placeholder="Description de la campagne et ses objectifs..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="label">Date de début *</label>
                        <input
                            type="date"
                            className="input"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Date de fin *</label>
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
                        <label className="label">Centre de rattachement</label>
                        <select
                            className="input select"
                            value={selectedCenter}
                            onChange={(e) => setSelectedCenter(e.target.value)}
                        >
                            <option value="">Tous les centres</option>
                            {centers.map(center => (
                                <option key={center.id} value={center.id}>{center.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Nombre max d'inscriptions</label>
                        <input
                            type="number"
                            className="input"
                            min="1"
                            value={maxRegistrations}
                            onChange={(e) => setMaxRegistrations(e.target.value)}
                        />
                    </div>
                </div>

                {/* Preview */}
                {name && startDate && endDate && (
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                        color: 'white',
                        padding: 'var(--space-5)',
                        borderRadius: 'var(--radius-xl)',
                        marginBottom: 'var(--space-6)'
                    }}>
                        <p style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: 'var(--space-2)' }}>
                            Aperçu de la campagne :
                        </p>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-2)' }}>{name}</h3>
                        <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: 'var(--space-3)' }}>
                            {description || 'Aucune description'}
                        </p>
                        <div className="flex gap-6">
                            <div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Période</div>
                                <div style={{ fontWeight: 500 }}>
                                    {new Date(startDate).toLocaleDateString('fr-FR')} - {new Date(endDate).toLocaleDateString('fr-FR')}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Places</div>
                                <div style={{ fontWeight: 500 }}>{maxRegistrations} max</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <Link href="/campaigns" className="btn btn-secondary" style={{ flex: 1 }}>
                        Annuler
                    </Link>
                    <button
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                        onClick={handleSubmit}
                        disabled={!name || !startDate || !endDate}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Créer la campagne
                    </button>
                </div>
            </div>
        </div>
    )
}
