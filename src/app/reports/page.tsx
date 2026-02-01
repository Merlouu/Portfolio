'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ReportsPage() {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isExporting, setIsExporting] = useState<string | null>(null)

    const handleExport = async (type: 'distributions' | 'haccp') => {
        setIsExporting(type)
        try {
            let url = `/api/reports/${type}?`
            if (startDate) url += `startDate=${startDate}&`
            if (endDate) url += `endDate=${endDate}&`

            const response = await fetch(url)
            const blob = await response.blob()

            const downloadUrl = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(downloadUrl)
            document.body.removeChild(a)
        } catch (error) {
            console.error('Export error:', error)
            alert('Erreur lors de l\'export')
        } finally {
            setIsExporting(null)
        }
    }

    // Default to current month
    const today = new Date()
    const defaultStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
    const defaultEnd = today.toISOString().split('T')[0]

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">📊 Rapports & Exports</h1>
                <p className="page-description">
                    Générez et téléchargez des rapports pour votre centre
                </p>
            </div>

            {/* Date Filter */}
            <div className="card mb-6">
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                    📅 Période du rapport
                </h2>
                <div className="flex gap-4 items-end">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="label">Date de début</label>
                        <input
                            type="date"
                            className="input"
                            value={startDate || defaultStart}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{ width: 180 }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="label">Date de fin</label>
                        <input
                            type="date"
                            className="input"
                            value={endDate || defaultEnd}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{ width: 180 }}
                        />
                    </div>
                    <button
                        className="btn btn-ghost"
                        onClick={() => {
                            setStartDate(defaultStart)
                            setEndDate(defaultEnd)
                        }}
                    >
                        Ce mois
                    </button>
                </div>
            </div>

            {/* Export Cards */}
            <div className="grid grid-cols-2">
                {/* Distributions Export */}
                <div className="card">
                    <div className="flex items-start gap-4 mb-4">
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--secondary-100)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            📦
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 600, fontSize: '1.125rem' }}>Export Distributions</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                Historique complet des distributions alimentaires
                            </p>
                        </div>
                    </div>
                    <ul style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', marginBottom: 'var(--space-4)', paddingLeft: 'var(--space-4)' }}>
                        <li>Date et heure de chaque distribution</li>
                        <li>Informations bénéficiaire</li>
                        <li>Détail des produits distribués</li>
                        <li>Points utilisés</li>
                    </ul>
                    <button
                        className="btn btn-primary w-full"
                        onClick={() => handleExport('distributions')}
                        disabled={!!isExporting}
                    >
                        {isExporting === 'distributions' ? (
                            <>⏳ Export en cours...</>
                        ) : (
                            <>📥 Télécharger CSV</>
                        )}
                    </button>
                </div>

                {/* HACCP Export */}
                <div className="card">
                    <div className="flex items-start gap-4 mb-4">
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--success-100)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            🌡️
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 600, fontSize: '1.125rem' }}>Rapport HACCP</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                Relevés de température et registre des équipements
                            </p>
                        </div>
                    </div>
                    <ul style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)', marginBottom: 'var(--space-4)', paddingLeft: 'var(--space-4)' }}>
                        <li>Contrôles de température</li>
                        <li>Conformité aux normes</li>
                        <li>Registre des fours</li>
                        <li>Statistiques de conformité</li>
                    </ul>
                    <button
                        className="btn btn-accent w-full"
                        onClick={() => handleExport('haccp')}
                        disabled={!!isExporting}
                    >
                        {isExporting === 'haccp' ? (
                            <>⏳ Export en cours...</>
                        ) : (
                            <>📥 Télécharger CSV</>
                        )}
                    </button>
                </div>
            </div>

            {/* Quick Links */}
            <div className="card mt-6">
                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>Accès rapides</h3>
                <div className="flex gap-3">
                    <Link href="/stocks/expiring" className="btn btn-secondary">
                        📅 Dates de péremption
                    </Link>
                    <Link href="/hygiene" className="btn btn-secondary">
                        🌡️ Registre hygiène
                    </Link>
                    <Link href="/distributions" className="btn btn-secondary">
                        📦 Historique distributions
                    </Link>
                </div>
            </div>
        </div>
    )
}
