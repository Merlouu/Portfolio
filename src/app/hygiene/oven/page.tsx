'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export default function OvenLogPage() {
    const router = useRouter()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const [formData, setFormData] = useState({
        ovenName: 'Four 1',
        turnOnTime: new Date().toISOString().slice(0, 16),
        turnOffTime: '',
        temperature: '',
        notes: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const res = await fetch('/api/hygiene/oven-logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    centerId: user?.centerId || 'cldefault',
                    userId: user?.id || 'demo'
                })
            })

            const data = await res.json()

            if (res.ok) {
                setMessage('✅ ' + data.message)
                setTimeout(() => router.push('/hygiene'), 1500)
            } else {
                setMessage('❌ ' + data.error)
            }
        } catch (error) {
            setMessage('❌ Erreur de connexion')
        }
        setLoading(false)
    }

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-center gap-4">
                    <Link href="/hygiene" className="btn btn-ghost btn-sm">
                        ← Retour
                    </Link>
                    <div>
                        <h1 className="page-title">🔥 Enregistrer Log Four</h1>
                        <p className="page-description">Suivi des heures d'allumage et d'extinction</p>
                    </div>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
                {/* Form */}
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            {/* Oven Selection */}
                            <div className="form-group">
                                <label className="form-label">Nom du four *</label>
                                <select
                                    className="input select"
                                    value={formData.ovenName}
                                    onChange={(e) => setFormData({ ...formData, ovenName: e.target.value })}
                                    required
                                >
                                    <option value="Four 1">Four 1</option>
                                    <option value="Four 2">Four 2</option>
                                    <option value="Four 3">Four 3</option>
                                    <option value="Four à pizza">Four à pizza</option>
                                    <option value="Four à pain">Four à pain</option>
                                </select>
                            </div>

                            {/* Turn On Time */}
                            <div className="form-group">
                                <label className="form-label">Heure d'allumage *</label>
                                <input
                                    type="datetime-local"
                                    className="input"
                                    value={formData.turnOnTime}
                                    onChange={(e) => setFormData({ ...formData, turnOnTime: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Turn Off Time */}
                            <div className="form-group">
                                <label className="form-label">Heure d'extinction (optionnel)</label>
                                <input
                                    type="datetime-local"
                                    className="input"
                                    value={formData.turnOffTime}
                                    onChange={(e) => setFormData({ ...formData, turnOffTime: e.target.value })}
                                />
                                <small style={{ color: 'var(--foreground-muted)' }}>
                                    Laissez vide si le four est encore allumé
                                </small>
                            </div>

                            {/* Temperature */}
                            <div className="form-group">
                                <label className="form-label">Température cible (°C)</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="180"
                                    value={formData.temperature}
                                    onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                                    min="50"
                                    max="300"
                                />
                            </div>

                            {/* Notes */}
                            <div className="form-group">
                                <label className="form-label">Notes</label>
                                <textarea
                                    className="input"
                                    rows={3}
                                    placeholder="Observations, remarques..."
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            {message && (
                                <div style={{
                                    padding: 'var(--space-3)',
                                    borderRadius: 'var(--radius-md)',
                                    background: message.includes('✅') ? 'var(--success-50)' : 'var(--error-50)',
                                    color: message.includes('✅') ? 'var(--success-700)' : 'var(--error-700)'
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
                                    {loading ? '⏳ Enregistrement...' : '💾 Enregistrer'}
                                </button>
                                <Link href="/hygiene" className="btn btn-ghost">
                                    Annuler
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Info Panel */}
                <div className="card" style={{
                    background: 'linear-gradient(135deg, var(--warning-50), var(--warning-100))',
                    border: '1px solid var(--warning-200)'
                }}>
                    <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--warning-800)' }}>
                        📋 Instructions
                    </h3>
                    <ul style={{ fontSize: '0.875rem', color: 'var(--warning-700)', lineHeight: 1.8 }}>
                        <li>• Enregistrez l'allumage du four dès que vous le mettez en marche</li>
                        <li>• Notez la température cible programmée</li>
                        <li>• N'oubliez pas d'enregistrer l'extinction en fin d'utilisation</li>
                        <li>• Ces données sont conservées pour les contrôles sanitaires</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
