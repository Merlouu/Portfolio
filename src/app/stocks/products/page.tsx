'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function NewProductPage() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [unit, setUnit] = useState('unité')
    const [pointsCost, setPointsCost] = useState('1')
    const [description, setDescription] = useState('')

    const categories = [
        { id: 'epicerie', name: 'Épicerie' },
        { id: 'laitiers', name: 'Produits laitiers' },
        { id: 'conserves', name: 'Conserves' },
        { id: 'boissons', name: 'Boissons' },
        { id: 'hygiene', name: 'Hygiène' },
        { id: 'frais', name: 'Produits frais' },
    ]

    const units = ['unité', 'kg', 'g', 'litre', 'ml', 'paquet', 'boîte', 'bouteille']

    const handleSubmit = () => {
        alert('Produit créé avec succès ! (Démo - non connecté à la base)')
    }

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/stocks" className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Retour
                    </Link>
                </div>
                <h1 className="page-title">Nouveau Produit</h1>
                <p className="page-description">Ajouter un nouveau produit au catalogue</p>
            </div>

            <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
                <div className="form-group">
                    <label className="label">Nom du produit *</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Ex: Pâtes (500g)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="label">Catégorie *</label>
                        <select
                            className="input select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Sélectionner</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Unité de mesure</label>
                        <select
                            className="input select"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            {units.map(u => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="label">Coût en points</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            className="input"
                            style={{ width: 120 }}
                            min="1"
                            value={pointsCost}
                            onChange={(e) => setPointsCost(e.target.value)}
                        />
                        <span style={{ color: 'var(--foreground-muted)' }}>points par {unit}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginTop: 'var(--space-1)' }}>
                        Définit le nombre de points nécessaires pour distribuer ce produit
                    </p>
                </div>

                <div className="form-group">
                    <label className="label">Description (optionnel)</label>
                    <textarea
                        className="input"
                        rows={3}
                        placeholder="Description ou notes sur le produit..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Preview Card */}
                {name && (
                    <div style={{
                        background: 'var(--neutral-50)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--space-6)'
                    }}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginBottom: 'var(--space-2)' }}>
                            Aperçu du produit :
                        </p>
                        <div className="flex justify-between items-center">
                            <div>
                                <div style={{ fontWeight: 600 }}>{name}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                    {categories.find(c => c.id === category)?.name || 'Non catégorisé'} • {unit}
                                </div>
                            </div>
                            <span className="badge badge-primary">{pointsCost} pts</span>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <Link href="/stocks" className="btn btn-secondary" style={{ flex: 1 }}>
                        Annuler
                    </Link>
                    <button
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                        onClick={handleSubmit}
                        disabled={!name || !category}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Créer le produit
                    </button>
                </div>
            </div>
        </div>
    )
}
