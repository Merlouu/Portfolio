'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth, ROLE_LABELS } from '@/lib/auth-context'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showDemoAccounts, setShowDemoAccounts] = useState(false)

    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        const result = await login(email, password)

        if (result.success) {
            // Redirect based on role
            if (result.role === 'BENEFICIARY') {
                router.push('/my-account')
            } else {
                router.push('/')
            }
        } else {
            setError(result.error || 'Erreur de connexion')
        }

        setIsLoading(false)
    }

    const demoAccounts = [
        { email: 'admin@coeursolidaire.org', password: 'admin123', role: 'ADMIN' as const },
        { email: 'manager@coeursolidaire.org', password: 'manager123', role: 'MANAGER' as const },
        { email: 'benevole@coeursolidaire.org', password: 'benevole123', role: 'VOLUNTEER' as const },
        { email: 'beneficiaire@example.com', password: 'beneficiaire123', role: 'BENEFICIARY' as const },
    ]

    const fillDemoAccount = (demoEmail: string, demoPassword: string) => {
        setEmail(demoEmail)
        setPassword(demoPassword)
        setError('')
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 50%, var(--secondary-700) 100%)',
            padding: 'var(--space-4)'
        }}>
            <div style={{
                width: '100%',
                maxWidth: 440,
            }}>
                {/* Logo & Title */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                    <div style={{
                        width: 80,
                        height: 80,
                        borderRadius: 'var(--radius-full)',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto var(--space-4)',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary-600)" style={{ width: 40, height: 40 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    <h1 style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: 'var(--space-2)'
                    }}>
                        CoeurSolidaire
                    </h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
                        Connectez-vous pour accéder à votre espace
                    </p>
                </div>

                {/* Login Card */}
                <div className="card" style={{
                    padding: 'var(--space-8)',
                    boxShadow: 'var(--shadow-xl)'
                }}>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div style={{
                                background: 'var(--error-50)',
                                border: '1px solid var(--error-200)',
                                color: 'var(--error-700)',
                                padding: 'var(--space-3) var(--space-4)',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-4)',
                                fontSize: '0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="label">Adresse email</label>
                            <input
                                type="email"
                                className="input"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label className="label">Mot de passe</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-full"
                            disabled={isLoading}
                            style={{ marginTop: 'var(--space-4)' }}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
                                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Connexion...
                                </span>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>
                                    Se connecter
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Accounts Toggle */}
                    <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
                        <button
                            type="button"
                            onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--primary-600)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 'var(--space-1)'
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16, transform: showDemoAccounts ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                            Comptes de démonstration
                        </button>
                    </div>

                    {/* Demo Accounts List */}
                    {showDemoAccounts && (
                        <div style={{
                            marginTop: 'var(--space-4)',
                            background: 'var(--neutral-50)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--space-4)',
                            animation: 'fadeIn 0.2s ease'
                        }}>
                            <p style={{
                                fontSize: '0.75rem',
                                color: 'var(--foreground-muted)',
                                marginBottom: 'var(--space-3)',
                                textAlign: 'center'
                            }}>
                                Cliquez sur un compte pour remplir les champs
                            </p>
                            <div className="flex flex-col gap-2">
                                {demoAccounts.map((account) => (
                                    <button
                                        key={account.email}
                                        type="button"
                                        onClick={() => fillDemoAccount(account.email, account.password)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: 'var(--space-3)',
                                            background: 'white',
                                            border: '1px solid var(--neutral-200)',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            transition: 'all var(--transition-fast)',
                                            textAlign: 'left'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--primary-300)'
                                            e.currentTarget.style.background = 'var(--primary-50)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--neutral-200)'
                                            e.currentTarget.style.background = 'white'
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                                                {ROLE_LABELS[account.role]}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                                {account.email}
                                            </div>
                                        </div>
                                        <span
                                            className="badge"
                                            style={{
                                                background: account.role === 'ADMIN' ? 'var(--primary-100)' :
                                                    account.role === 'MANAGER' ? 'var(--secondary-100)' :
                                                        account.role === 'VOLUNTEER' ? 'var(--success-100)' :
                                                            'var(--accent-100)',
                                                color: account.role === 'ADMIN' ? 'var(--primary-700)' :
                                                    account.role === 'MANAGER' ? 'var(--secondary-700)' :
                                                        account.role === 'VOLUNTEER' ? 'var(--success-700)' :
                                                            'var(--accent-700)',
                                                fontSize: '0.7rem'
                                            }}
                                        >
                                            {account.role}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Register Link */}
                <div style={{
                    textAlign: 'center',
                    marginTop: 'var(--space-6)',
                    padding: 'var(--space-4)',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-lg)'
                }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
                        Pas encore inscrit ?{' '}
                    </span>
                    <Link
                        href="/register"
                        style={{
                            color: 'white',
                            fontWeight: 600,
                            textDecoration: 'underline'
                        }}
                    >
                        Créer un compte
                    </Link>
                </div>

                {/* Footer */}
                <p style={{
                    textAlign: 'center',
                    marginTop: 'var(--space-4)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.75rem'
                }}>
                    © 2026 CoeurSolidaire - Tous droits réservés
                </p>
            </div>
        </div>
    )
}
