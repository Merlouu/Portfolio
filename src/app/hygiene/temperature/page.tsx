'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

const CHECK_TYPES = [
    { value: 'RECEPTION', label: 'Réception', icon: '📦', threshold: '≤ 4°C (frais) / ≤ -18°C (surgelés)' },
    { value: 'STOCKAGE', label: 'Stockage', icon: '🧊', threshold: '≤ 4°C' },
    { value: 'SERVICE', label: 'Service', icon: '🍽️', threshold: '≥ 63°C' },
    { value: 'REFROIDISSEMENT', label: 'Refroidissement', icon: '❄️', threshold: 'De 63°C à 10°C en < 2h' }
]

export default function TemperatureLogPage() {
    const router = useRouter()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [compliancePreview, setCompliancePreview] = useState<boolean | null>(null)
    const [realIds, setRealIds] = useState<{ centerId: string; userId: string } | null>(null)

    const [formData, setFormData] = useState({
        dishName: '',
        temperature: '',
        checkType: 'RECEPTION',
        notes: ''
    })

    // Fetch real center ID from API on load - API will auto-resolve user ID
    useEffect(() => {
        const fetchCenterId = async () => {
            try {
                const centersRes = await fetch('/api/centers')
                const centersData = await centersRes.json()
                const firstCenter = centersData.data?.[0]
                if (firstCenter) {
                    setRealIds({
                        centerId: firstCenter.id,
                        userId: user?.id || 'demo' // API will auto-resolve if invalid
                    })
                }
            } catch (error) {
                console.error('Failed to fetch center ID:', error)
            }
        }
        fetchCenterId()
    }, [user])

    const checkCompliance = (temp: number, type: string): boolean => {
        switch (type) {
            case 'RECEPTION':
                return temp <= 4
            case 'STOCKAGE':
                return temp <= 4
            case 'SERVICE':
                return temp >= 63
            case 'REFROIDISSEMENT':
                return temp <= 10
            default:
                return true
        }
    }

    const handleTemperatureChange = (value: string) => {
        setFormData({ ...formData, temperature: value })
        if (value && !isNaN(parseFloat(value))) {
            setCompliancePreview(checkCompliance(parseFloat(value), formData.checkType))
        } else {
            setCompliancePreview(null)
        }
    }

    const handleTypeChange = (value: string) => {
        setFormData({ ...formData, checkType: value })
        if (formData.temperature && !isNaN(parseFloat(formData.temperature))) {
            setCompliancePreview(checkCompliance(parseFloat(formData.temperature), value))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const res = await fetch('/api/hygiene/temperature-logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    centerId: realIds?.centerId,
                    userId: realIds?.userId
                })
            })

            const data = await res.json()

            if (res.ok) {
                setMessage(data.message.includes('NON CONFORME') ? '⚠️ ' + data.message : '✅ ' + data.message)
                setTimeout(() => router.push('/hygiene'), 2000)
            } else {
                setMessage('❌ ' + data.error)
            }
        } catch (error) {
            setMessage('❌ Erreur de connexion')
        }
        setLoading(false)
    }

    const selectedType = CHECK_TYPES.find(t => t.value === formData.checkType)

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-center gap-4">
                    <Link href="/hygiene" className="btn btn-ghost btn-sm">
                        ← Retour
                    </Link>
                    <div>
                        <h1 className="page-title">🌡️ Relevé de Température</h1>
                        <p className="page-description">Contrôle HACCP des températures alimentaires</p>
                    </div>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
                {/* Form */}
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            {/* Check Type Selection */}
                            <div className="form-group">
                                <label className="form-label">Type de contrôle *</label>
                                <div className="grid grid-cols-2" style={{ gap: 'var(--space-2)' }}>
                                    {CHECK_TYPES.map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => handleTypeChange(type.value)}
                                            style={{
                                                padding: 'var(--space-3)',
                                                borderRadius: 'var(--radius-md)',
                                                border: `2px solid ${formData.checkType === type.value ? 'var(--primary-500)' : 'var(--neutral-200)'}`,
                                                background: formData.checkType === type.value ? 'var(--primary-50)' : 'white',
                                                cursor: 'pointer',
                                                textAlign: 'left'
                                            }}
                                        >
                                            <div style={{ fontSize: '1.25rem' }}>{type.icon}</div>
                                            <div style={{ fontWeight: 600 }}>{type.label}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                                {type.threshold}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dish Name */}
                            <div className="form-group">
                                <label className="form-label">Nom du plat / produit *</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Ex: Poulet rôti, Légumes frais..."
                                    value={formData.dishName}
                                    onChange={(e) => setFormData({ ...formData, dishName: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Temperature */}
                            <div className="form-group">
                                <label className="form-label">Température mesurée (°C) *</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder="Ex: 4"
                                        value={formData.temperature}
                                        onChange={(e) => handleTemperatureChange(e.target.value)}
                                        required
                                        step="0.1"
                                        min="-30"
                                        max="200"
                                        style={{ width: 150 }}
                                    />
                                    <span style={{ fontSize: '1.5rem' }}>°C</span>
                                    {compliancePreview !== null && (
                                        <span style={{
                                            padding: 'var(--space-2) var(--space-3)',
                                            borderRadius: 'var(--radius-md)',
                                            background: compliancePreview ? 'var(--success-100)' : 'var(--error-100)',
                                            color: compliancePreview ? 'var(--success-700)' : 'var(--error-700)',
                                            fontWeight: 600
                                        }}>
                                            {compliancePreview ? '✅ Conforme' : '❌ Non conforme'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="form-group">
                                <label className="form-label">Notes / Actions correctives</label>
                                <textarea
                                    className="input"
                                    rows={3}
                                    placeholder="Observations, actions correctives si non conforme..."
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            {message && (
                                <div style={{
                                    padding: 'var(--space-3)',
                                    borderRadius: 'var(--radius-md)',
                                    background: message.includes('✅') ? 'var(--success-50)' : message.includes('⚠️') ? 'var(--warning-50)' : 'var(--error-50)',
                                    color: message.includes('✅') ? 'var(--success-700)' : message.includes('⚠️') ? 'var(--warning-700)' : 'var(--error-700)'
                                }}>
                                    {message}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? '⏳ Enregistrement...' : '💾 Enregistrer le relevé'}
                                </button>
                                <Link href="/hygiene" className="btn btn-ghost">
                                    Annuler
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                {/* HACCP Reference Panel */}
                <div className="flex flex-col gap-4">
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, var(--primary-50), var(--secondary-50))',
                        border: '1px solid var(--primary-200)'
                    }}>
                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--primary-800)' }}>
                            📋 Normes HACCP
                        </h3>
                        <table style={{ width: '100%', fontSize: '0.875rem' }}>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--primary-200)' }}>
                                    <td style={{ padding: 'var(--space-2)', fontWeight: 500 }}>Réception froid</td>
                                    <td style={{ padding: 'var(--space-2)' }}>≤ 4°C</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--primary-200)' }}>
                                    <td style={{ padding: 'var(--space-2)', fontWeight: 500 }}>Surgelés</td>
                                    <td style={{ padding: 'var(--space-2)' }}>≤ -18°C</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--primary-200)' }}>
                                    <td style={{ padding: 'var(--space-2)', fontWeight: 500 }}>Stockage</td>
                                    <td style={{ padding: 'var(--space-2)' }}>≤ 4°C</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--primary-200)' }}>
                                    <td style={{ padding: 'var(--space-2)', fontWeight: 500 }}>Service chaud</td>
                                    <td style={{ padding: 'var(--space-2)' }}>≥ 63°C</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 'var(--space-2)', fontWeight: 500 }}>Refroidissement</td>
                                    <td style={{ padding: 'var(--space-2)' }}>63°C → 10°C en &lt;2h</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {selectedType && (
                        <div className="card" style={{
                            background: 'var(--neutral-50)',
                            border: '1px solid var(--neutral-200)'
                        }}>
                            <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>
                                {selectedType.icon}
                            </div>
                            <h4 style={{ fontWeight: 600 }}>{selectedType.label}</h4>
                            <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', marginTop: 'var(--space-2)' }}>
                                Seuil de conformité: <strong>{selectedType.threshold}</strong>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
