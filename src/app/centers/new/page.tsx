'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function NewCenterPage() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = () => {
        alert('Centre créé avec succès ! (Démo - non connecté à la base)')
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
                <h1 className="page-title">Nouveau Centre</h1>
                <p className="page-description">Ajouter un nouveau centre de distribution</p>
            </div>

            <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
                <div className="form-group">
                    <label className="label">Nom du centre *</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Ex: Antenne Sud - Vitry"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="label">Adresse *</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Numéro et nom de rue"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="label">Code postal *</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="94400"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Ville *</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Vitry-sur-Seine"
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
                            placeholder="01 XX XX XX XX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="centre@coeursolidaire.org"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                {/* Preview */}
                {name && address && (
                    <div style={{
                        background: 'var(--neutral-50)',
                        padding: 'var(--space-5)',
                        borderRadius: 'var(--radius-xl)',
                        marginBottom: 'var(--space-6)'
                    }}>
                        <div className="flex items-start gap-4">
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
                            <div>
                                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-1)' }}>{name}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                    {address}{postalCode && `, ${postalCode}`} {city}
                                </p>
                                {(phone || email) && (
                                    <div className="flex gap-4 mt-2" style={{ fontSize: '0.875rem' }}>
                                        {phone && <span>📞 {phone}</span>}
                                        {email && <span>✉️ {email}</span>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <Link href="/centers" className="btn btn-secondary" style={{ flex: 1 }}>
                        Annuler
                    </Link>
                    <button
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                        onClick={handleSubmit}
                        disabled={!name || !address || !city || !postalCode}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Créer le centre
                    </button>
                </div>
            </div>
        </div>
    )
}
