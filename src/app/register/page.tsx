'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        // Step 1: Personal info
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',

        // Step 2: Address
        address: '',
        city: '',
        postalCode: '',

        // Step 3: Household
        adultsCount: 1,
        childrenCount: 0,
        monthlyIncome: '',
        socialStatus: '',

        // Step 4: Password (for user account)
        password: '',
        confirmPassword: ''
    })

    const updateField = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setError('')
    }

    const validateStep = () => {
        switch (step) {
            case 1:
                if (!formData.firstName || !formData.lastName) {
                    setError('Le prénom et le nom sont requis')
                    return false
                }
                break
            case 2:
                if (!formData.address || !formData.city || !formData.postalCode) {
                    setError('L\'adresse complète est requise')
                    return false
                }
                break
            case 3:
                if (formData.adultsCount < 1) {
                    setError('Il doit y avoir au moins 1 adulte')
                    return false
                }
                break
            case 4:
                if (formData.password.length < 6) {
                    setError('Le mot de passe doit contenir au moins 6 caractères')
                    return false
                }
                if (formData.password !== formData.confirmPassword) {
                    setError('Les mots de passe ne correspondent pas')
                    return false
                }
                break
        }
        return true
    }

    const nextStep = () => {
        if (validateStep()) {
            setStep(prev => Math.min(prev + 1, 4))
        }
    }

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1))
    }

    const handleSubmit = async () => {
        if (!validateStep()) return

        setIsLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email || undefined,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    adultsCount: formData.adultsCount,
                    childrenCount: formData.childrenCount,
                    password: formData.password
                })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Erreur lors de l\'inscription')
                setIsLoading(false)
                return
            }

            // Success - redirect to login
            router.push('/login?registered=true')

        } catch (err) {
            console.error('Registration error:', err)
            setError('Erreur de connexion au serveur')
            setIsLoading(false)
        }
    }

    const socialStatuses = [
        { value: '', label: 'Sélectionnez...' },
        { value: 'RSA', label: 'RSA' },
        { value: 'ASS', label: 'ASS (Allocation de solidarité spécifique)' },
        { value: 'AAH', label: 'AAH (Allocation adulte handicapé)' },
        { value: 'ASPA', label: 'ASPA (Minimum vieillesse)' },
        { value: 'CHOMAGE', label: 'Allocations chômage' },
        { value: 'SALARIE', label: 'Salarié' },
        { value: 'AUTRE', label: 'Autre' },
    ]

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-600) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)'
        }}>
            <div className="card animate-fade-in" style={{
                width: '100%',
                maxWidth: 520,
                padding: 'var(--space-8)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 28C16 28 4 20 4 12C4 8 7.5 4 12 4C14.5 4 16 6 16 6C16 6 17.5 4 20 4C24.5 4 28 8 28 12C28 20 16 28 16 28Z" fill="var(--primary-500)" />
                        </svg>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-600)' }}>
                            CoeurSolidaire
                        </span>
                    </div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                        Créer un compte
                    </h1>
                    <p style={{ color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>
                        Inscrivez-vous pour bénéficier de notre aide alimentaire
                    </p>
                </div>

                {/* Progress Steps */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 'var(--space-2)',
                    marginBottom: 'var(--space-6)'
                }}>
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)'
                        }}>
                            <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: 'var(--radius-full)',
                                background: s <= step ? 'var(--primary-500)' : 'var(--neutral-200)',
                                color: s <= step ? 'white' : 'var(--foreground-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                transition: 'all var(--transition-base)'
                            }}>
                                {s < step ? '✓' : s}
                            </div>
                            {s < 4 && (
                                <div style={{
                                    width: 40,
                                    height: 2,
                                    background: s < step ? 'var(--primary-500)' : 'var(--neutral-200)',
                                    transition: 'all var(--transition-base)'
                                }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Labels */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: 'var(--space-4)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--primary-600)'
                }}>
                    {step === 1 && 'Étape 1: Informations personnelles'}
                    {step === 2 && 'Étape 2: Adresse'}
                    {step === 3 && 'Étape 3: Composition du foyer'}
                    {step === 4 && 'Étape 4: Créer votre compte'}
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        padding: 'var(--space-3)',
                        background: 'var(--error-50)',
                        border: '1px solid var(--error-200)',
                        borderRadius: 'var(--radius-lg)',
                        color: 'var(--error-700)',
                        marginBottom: 'var(--space-4)',
                        fontSize: '0.875rem'
                    }}>
                        {error}
                    </div>
                )}

                {/* Step 1: Personal Info */}
                {step === 1 && (
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="label">Prénom *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.firstName}
                                    onChange={e => updateField('firstName', e.target.value)}
                                    placeholder="Jean"
                                />
                            </div>
                            <div className="form-group">
                                <label className="label">Nom *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.lastName}
                                    onChange={e => updateField('lastName', e.target.value)}
                                    placeholder="Dupont"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                className="input"
                                value={formData.email}
                                onChange={e => updateField('email', e.target.value)}
                                placeholder="jean.dupont@email.com"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="label">Téléphone</label>
                                <input
                                    type="tel"
                                    className="input"
                                    value={formData.phone}
                                    onChange={e => updateField('phone', e.target.value)}
                                    placeholder="06 12 34 56 78"
                                />
                            </div>
                            <div className="form-group">
                                <label className="label">Date de naissance</label>
                                <input
                                    type="date"
                                    className="input"
                                    value={formData.dateOfBirth}
                                    onChange={e => updateField('dateOfBirth', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Address */}
                {step === 2 && (
                    <div className="flex flex-col gap-4">
                        <div className="form-group">
                            <label className="label">Adresse *</label>
                            <input
                                type="text"
                                className="input"
                                value={formData.address}
                                onChange={e => updateField('address', e.target.value)}
                                placeholder="15 Rue de la Paix"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="label">Code postal *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.postalCode}
                                    onChange={e => updateField('postalCode', e.target.value)}
                                    placeholder="75001"
                                />
                            </div>
                            <div className="form-group">
                                <label className="label">Ville *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.city}
                                    onChange={e => updateField('city', e.target.value)}
                                    placeholder="Paris"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Household */}
                {step === 3 && (
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="label">Nombre d'adultes *</label>
                                <input
                                    type="number"
                                    className="input"
                                    min={1}
                                    value={formData.adultsCount}
                                    onChange={e => updateField('adultsCount', parseInt(e.target.value) || 1)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="label">Nombre d'enfants</label>
                                <input
                                    type="number"
                                    className="input"
                                    min={0}
                                    value={formData.childrenCount}
                                    onChange={e => updateField('childrenCount', parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label">Situation sociale</label>
                            <select
                                className="input"
                                value={formData.socialStatus}
                                onChange={e => updateField('socialStatus', e.target.value)}
                            >
                                {socialStatuses.map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label">Revenus mensuels (€)</label>
                            <input
                                type="number"
                                className="input"
                                value={formData.monthlyIncome}
                                onChange={e => updateField('monthlyIncome', e.target.value)}
                                placeholder="Optionnel"
                            />
                        </div>

                        {/* Points Preview */}
                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--success-50)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--success-200)'
                        }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--success-700)', marginBottom: 'var(--space-1)' }}>
                                📊 Estimation de vos points hebdomadaires
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success-600)' }}>
                                {20 + formData.adultsCount * 10 + formData.childrenCount * 15} points
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginTop: 'var(--space-1)' }}>
                                Basé sur {formData.adultsCount} adulte(s) et {formData.childrenCount} enfant(s)
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Account */}
                {step === 4 && (
                    <div className="flex flex-col gap-4">
                        <div className="form-group">
                            <label className="label">Mot de passe *</label>
                            <input
                                type="password"
                                className="input"
                                value={formData.password}
                                onChange={e => updateField('password', e.target.value)}
                                placeholder="Au moins 6 caractères"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Confirmer le mot de passe *</label>
                            <input
                                type="password"
                                className="input"
                                value={formData.confirmPassword}
                                onChange={e => updateField('confirmPassword', e.target.value)}
                                placeholder="Répétez le mot de passe"
                            />
                        </div>

                        {/* Summary */}
                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--neutral-50)',
                            borderRadius: 'var(--radius-lg)',
                            marginTop: 'var(--space-2)'
                        }}>
                            <div style={{ fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                                Récapitulatif
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                <div>👤 {formData.firstName} {formData.lastName}</div>
                                <div>📍 {formData.address}, {formData.postalCode} {formData.city}</div>
                                <div>👨‍👩‍👧‍👦 {formData.adultsCount} adulte(s), {formData.childrenCount} enfant(s)</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3" style={{ marginTop: 'var(--space-6)' }}>
                    {step > 1 && (
                        <button onClick={prevStep} className="btn btn-ghost" style={{ flex: 1 }}>
                            ← Précédent
                        </button>
                    )}
                    {step < 4 ? (
                        <button onClick={nextStep} className="btn btn-primary" style={{ flex: 1 }}>
                            Suivant →
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary"
                            style={{ flex: 1 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Création en cours...' : 'Créer mon compte'}
                        </button>
                    )}
                </div>

                {/* Login Link */}
                <div style={{
                    textAlign: 'center',
                    marginTop: 'var(--space-6)',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--neutral-200)'
                }}>
                    <span style={{ color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>
                        Déjà inscrit ?{' '}
                    </span>
                    <Link href="/login" style={{ color: 'var(--primary-600)', fontWeight: 500 }}>
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    )
}
