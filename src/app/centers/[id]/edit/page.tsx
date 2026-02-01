'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function EditCenterPage() {
    const params = useParams()
    const centerId = params.id

    // Mock data - would be fetched from API
    const [name, setName] = useState('Centre Principal - Paris 11ème')
    const [address, setAddress] = useState('45 Rue de la Roquette')
    const [city, setCity] = useState('Paris')
    const [postalCode, setPostalCode] = useState('75011')
    const [phone, setPhone] = useState('01 43 55 12 34')
    const [email, setEmail] = useState('paris11@coeursolidaire.org')
    const [isActive, setIsActive] = useState(true)

    const handleSubmit = () => {
        alert('Centre modifié avec succès ! (Démo)')
    }

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
                <h1 className="page-title">Modifier le centre</h1>
                <p className="page-description">Modification de : {name}</p>
            </div>

            <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
                <div className="form-group">
                    <label className="label">Nom du centre *</label>
                    <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="label">Adresse</label>
                    <input
                        type="text"
                        className="input"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="label">Code postal</label>
                        <input
                            type="text"
                            className="input"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Ville</label>
                        <input
                            type="text"
                            className="input"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="label">Téléphone</label>
                        <input
                            type="tel"
                            className="input"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="label">Statut du centre</label>
                    <div className="flex items-center gap-3">
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
                            Actif
                        </button>
                        <button
                            onClick={() => setIsActive(false)}
                            style={{
                                padding: 'var(--space-2) var(--space-4)',
                                borderRadius: 'var(--radius-lg)',
                                border: 'none',
                                background: !isActive ? 'var(--error-500)' : 'var(--neutral-200)',
                                color: !isActive ? 'white' : 'var(--foreground-muted)',
                                cursor: 'pointer',
                                fontWeight: 500,
                                fontSize: '0.875rem'
                            }}
                        >
                            Inactif
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <Link href="/centers" className="btn btn-secondary" style={{ flex: 1 }}>
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
