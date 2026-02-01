'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function NewBeneficiaryPage() {
    const [step, setStep] = useState(1)
    const totalSteps = 3

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/beneficiaries" className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Retour
                    </Link>
                </div>
                <h1 className="page-title">Nouveau Bénéficiaire</h1>
                <p className="page-description">Inscription d'un nouveau bénéficiaire dans le système</p>
            </div>

            {/* Progress Steps */}
            <div className="card mb-6" style={{ padding: 'var(--space-4)' }}>
                <div className="flex items-center justify-between">
                    {[
                        { num: 1, label: 'Informations personnelles' },
                        { num: 2, label: 'Composition du foyer' },
                        { num: 3, label: 'Situation & Documents' },
                    ].map((s, index) => (
                        <div key={s.num} className="flex items-center" style={{ flex: index < 2 ? 1 : 'auto' }}>
                            <div className="flex items-center gap-3">
                                <div style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 'var(--radius-full)',
                                    background: step >= s.num
                                        ? 'linear-gradient(135deg, var(--primary-500), var(--primary-600))'
                                        : 'var(--neutral-200)',
                                    color: step >= s.num ? 'white' : 'var(--foreground-muted)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 600,
                                    fontSize: '0.875rem'
                                }}>
                                    {step > s.num ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    ) : s.num}
                                </div>
                                <span style={{
                                    fontWeight: step === s.num ? 600 : 400,
                                    color: step === s.num ? 'var(--foreground)' : 'var(--foreground-muted)',
                                    fontSize: '0.875rem'
                                }}>
                                    {s.label}
                                </span>
                            </div>
                            {index < 2 && (
                                <div style={{
                                    flex: 1,
                                    height: 2,
                                    background: step > s.num ? 'var(--primary-500)' : 'var(--neutral-200)',
                                    margin: '0 var(--space-4)'
                                }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Card */}
            <div className="card" style={{ maxWidth: 800, margin: '0 auto' }}>
                {/* Step 1: Personal Info */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-6)' }}>
                            Informations personnelles
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="label">Prénom *</label>
                                <input type="text" className="input" placeholder="Prénom" />
                            </div>
                            <div className="form-group">
                                <label className="label">Nom *</label>
                                <input type="text" className="input" placeholder="Nom de famille" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="label">Date de naissance</label>
                            <input type="date" className="input" style={{ width: 200 }} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="label">Téléphone *</label>
                                <input type="tel" className="input" placeholder="06 12 34 56 78" />
                            </div>
                            <div className="form-group">
                                <label className="label">Email</label>
                                <input type="email" className="input" placeholder="email@exemple.com" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="label">Adresse</label>
                            <input type="text" className="input" placeholder="Numéro et nom de rue" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="label">Code postal</label>
                                <input type="text" className="input" placeholder="75000" />
                            </div>
                            <div className="form-group">
                                <label className="label">Ville</label>
                                <input type="text" className="input" placeholder="Paris" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Household Composition */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-6)' }}>
                            Composition du foyer
                        </h2>

                        <div style={{
                            background: 'var(--primary-50)',
                            padding: 'var(--space-4)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: 'var(--space-6)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-3)'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary-600)" style={{ width: 24, height: 24 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            <p style={{ fontSize: '0.875rem', color: 'var(--primary-700)' }}>
                                Le nombre de points attribués est calculé en fonction de la composition du foyer.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Adults */}
                            <div style={{
                                background: 'var(--neutral-50)',
                                padding: 'var(--space-5)',
                                borderRadius: 'var(--radius-xl)',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 'var(--radius-full)',
                                    background: 'var(--secondary-100)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto var(--space-4)'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--secondary-600)" style={{ width: 32, height: 32 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </div>
                                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>Adultes (+18 ans)</h3>
                                <div className="flex items-center justify-center gap-4">
                                    <button className="btn btn-secondary btn-sm" style={{ width: 40, height: 40, padding: 0 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                        </svg>
                                    </button>
                                    <span style={{ fontSize: '2rem', fontWeight: 700, minWidth: 40 }}>1</span>
                                    <button className="btn btn-secondary btn-sm" style={{ width: 40, height: 40, padding: 0 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Children */}
                            <div style={{
                                background: 'var(--neutral-50)',
                                padding: 'var(--space-5)',
                                borderRadius: 'var(--radius-xl)',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 'var(--radius-full)',
                                    background: 'var(--accent-100)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto var(--space-4)'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--accent-600)" style={{ width: 32, height: 32 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>
                                </div>
                                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>Enfants (-18 ans)</h3>
                                <div className="flex items-center justify-center gap-4">
                                    <button className="btn btn-secondary btn-sm" style={{ width: 40, height: 40, padding: 0 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                        </svg>
                                    </button>
                                    <span style={{ fontSize: '2rem', fontWeight: 700, minWidth: 40 }}>0</span>
                                    <button className="btn btn-secondary btn-sm" style={{ width: 40, height: 40, padding: 0 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Points Preview */}
                        <div style={{
                            marginTop: 'var(--space-6)',
                            padding: 'var(--space-4)',
                            background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                            borderRadius: 'var(--radius-xl)',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: 'var(--space-1)' }}>
                                Points attribués par semaine
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>45 points</div>
                        </div>
                    </div>
                )}

                {/* Step 3: Situation & Documents */}
                {step === 3 && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-6)' }}>
                            Situation & Documents
                        </h2>

                        <div className="form-group">
                            <label className="label">Statut social</label>
                            <select className="input select">
                                <option value="">Sélectionner un statut</option>
                                <option value="rsa">RSA (Revenu de Solidarité Active)</option>
                                <option value="ass">ASS (Allocation de Solidarité Spécifique)</option>
                                <option value="aah">AAH (Allocation Adulte Handicapé)</option>
                                <option value="chomage">Allocations chômage</option>
                                <option value="retraite">Minimum vieillesse</option>
                                <option value="autre">Autre situation précaire</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="label">Revenus mensuels du foyer (approximatif)</label>
                            <div className="flex items-center gap-2">
                                <input type="number" className="input" placeholder="0" style={{ width: 150 }} />
                                <span style={{ color: 'var(--foreground-muted)' }}>€ / mois</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="label">Centre de rattachement</label>
                            <select className="input select">
                                <option value="">Sélectionner un centre</option>
                                <option value="1">Centre Principal - Paris 11ème</option>
                                <option value="2">Antenne Nord - Paris 18ème</option>
                                <option value="3">Antenne Est - Montreuil</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="label">Campagne d'inscription</label>
                            <select className="input select">
                                <option value="">Sélectionner une campagne</option>
                                <option value="1">Campagne Hiver 2026 (En cours)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="label">Notes complémentaires</label>
                            <textarea
                                className="input"
                                rows={4}
                                placeholder="Informations complémentaires sur la situation du bénéficiaire..."
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        {/* Summary */}
                        <div style={{
                            background: 'var(--success-50)',
                            border: '1px solid var(--success-200)',
                            borderRadius: 'var(--radius-xl)',
                            padding: 'var(--space-5)',
                            marginTop: 'var(--space-6)'
                        }}>
                            <div className="flex items-center gap-3 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--success-600)" style={{ width: 24, height: 24 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span style={{ fontWeight: 600, color: 'var(--success-700)' }}>Récapitulatif de l'inscription</span>
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--success-700)' }}>
                                Le bénéficiaire sera inscrit avec <strong>45 points par semaine</strong> et pourra
                                commencer à bénéficier des distributions dès validation de son dossier.
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    {step > 1 ? (
                        <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Précédent
                        </button>
                    ) : (
                        <div />
                    )}

                    {step < totalSteps ? (
                        <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                            Continuer
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    ) : (
                        <button className="btn btn-primary btn-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Valider l'inscription
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
