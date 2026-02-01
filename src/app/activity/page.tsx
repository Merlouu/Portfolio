'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ActivityPage() {
    const [filter, setFilter] = useState('all')

    // Mock activity data
    const activities = [
        { id: '1', type: 'distribution', message: 'Distribution pour Marie Lambert', user: 'Jean Dupont', time: '2026-01-31T10:30:00', details: '6 articles - 18 pts' },
        { id: '2', type: 'stock', message: 'Entrée de stock: 50kg de pâtes', user: 'Sophie Martin', time: '2026-01-31T10:15:00', details: 'Lot #2026-0156' },
        { id: '3', type: 'beneficiary', message: 'Nouveau bénéficiaire: Ahmed Rahmani', user: 'Marie Lambert', time: '2026-01-31T09:30:00', details: 'Foyer de 4 personnes' },
        { id: '4', type: 'campaign', message: 'Campagne Hiver 2026: 156 inscrits', user: 'Système', time: '2026-01-31T09:00:00', details: 'Mise à jour automatique' },
        { id: '5', type: 'stock', message: 'Alerte stock faible: Lait UHT', user: 'Système', time: '2026-01-31T08:00:00', details: 'Stock: 25 unités (min: 30)' },
        { id: '6', type: 'distribution', message: 'Distribution pour Fatima Ben Ali', user: 'Pierre Dubois', time: '2026-01-30T16:45:00', details: '8 articles - 24 pts' },
        { id: '7', type: 'distribution', message: 'Distribution pour Jean Martin', user: 'Jean Dupont', time: '2026-01-30T15:30:00', details: '4 articles - 12 pts' },
        { id: '8', type: 'stock', message: 'Entrée de stock: 30 bouteilles d\'huile', user: 'Sophie Martin', time: '2026-01-30T14:00:00', details: 'Don Carrefour' },
        { id: '9', type: 'beneficiary', message: 'Mise à jour: Claire Petit', user: 'Marie Lambert', time: '2026-01-30T11:20:00', details: 'Nouvelle adresse' },
        { id: '10', type: 'campaign', message: 'Nouvelle inscription: Pierre Leroy', user: 'Système', time: '2026-01-30T10:15:00', details: 'Campagne Hiver 2026' },
        { id: '11', type: 'distribution', message: 'Distribution pour Marc Durand', user: 'Jean Dupont', time: '2026-01-29T17:00:00', details: '5 articles - 15 pts' },
        { id: '12', type: 'stock', message: 'Sortie de stock: 20kg de riz', user: 'Système', time: '2026-01-29T16:30:00', details: 'Distribution #156' },
    ]

    const getIcon = (type: string) => {
        switch (type) {
            case 'distribution': return '🛒'
            case 'stock': return '📦'
            case 'beneficiary': return '👤'
            case 'campaign': return '📅'
            default: return '📋'
        }
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'distribution': return 'Distribution'
            case 'stock': return 'Stock'
            case 'beneficiary': return 'Bénéficiaire'
            case 'campaign': return 'Campagne'
            default: return 'Autre'
        }
    }

    const getTypeBadgeStyle = (type: string) => {
        switch (type) {
            case 'distribution': return { bg: 'var(--primary-100)', color: 'var(--primary-700)' }
            case 'stock': return { bg: 'var(--secondary-100)', color: 'var(--secondary-700)' }
            case 'beneficiary': return { bg: 'var(--success-100)', color: 'var(--success-700)' }
            case 'campaign': return { bg: 'var(--accent-100)', color: 'var(--accent-700)' }
            default: return { bg: 'var(--neutral-100)', color: 'var(--neutral-700)' }
        }
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 60) return `Il y a ${diffMins} min`
        if (diffHours < 24) return `Il y a ${diffHours}h`
        if (diffDays === 1) return 'Hier'
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    }

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }

    const filteredActivities = filter === 'all'
        ? activities
        : activities.filter(a => a.type === filter)

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/" className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Retour
                    </Link>
                </div>
                <h1 className="page-title">Historique d'activité</h1>
                <p className="page-description">Journal de toutes les actions effectuées dans l'application</p>
            </div>

            {/* Filters */}
            <div className="card mb-6" style={{ padding: 'var(--space-4)' }}>
                <div className="flex gap-2">
                    {[
                        { value: 'all', label: 'Tout' },
                        { value: 'distribution', label: '🛒 Distributions' },
                        { value: 'stock', label: '📦 Stocks' },
                        { value: 'beneficiary', label: '👤 Bénéficiaires' },
                        { value: 'campaign', label: '📅 Campagnes' },
                    ].map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            style={{
                                padding: 'var(--space-2) var(--space-4)',
                                borderRadius: 'var(--radius-lg)',
                                border: 'none',
                                background: filter === f.value ? 'var(--primary-500)' : 'var(--neutral-100)',
                                color: filter === f.value ? 'white' : 'var(--foreground)',
                                cursor: 'pointer',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                transition: 'all var(--transition-fast)'
                            }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Activity List */}
            <div className="card">
                <div className="flex flex-col">
                    {filteredActivities.map((activity, idx) => {
                        const badgeStyle = getTypeBadgeStyle(activity.type)
                        return (
                            <div
                                key={activity.id}
                                style={{
                                    display: 'flex',
                                    gap: 'var(--space-4)',
                                    padding: 'var(--space-4)',
                                    borderBottom: idx < filteredActivities.length - 1 ? '1px solid var(--neutral-200)' : 'none',
                                }}
                            >
                                {/* Icon */}
                                <div style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 'var(--radius-lg)',
                                    background: badgeStyle.bg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem',
                                    flexShrink: 0
                                }}>
                                    {getIcon(activity.type)}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div style={{ fontWeight: 500, marginBottom: 'var(--space-1)' }}>
                                                {activity.message}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                                {activity.details}
                                            </div>
                                        </div>
                                        <span
                                            style={{
                                                fontSize: '0.7rem',
                                                padding: '2px 8px',
                                                borderRadius: 'var(--radius-md)',
                                                background: badgeStyle.bg,
                                                color: badgeStyle.color,
                                                fontWeight: 500
                                            }}
                                        >
                                            {getTypeLabel(activity.type)}
                                        </span>
                                    </div>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--foreground-muted)',
                                        marginTop: 'var(--space-2)',
                                        display: 'flex',
                                        gap: 'var(--space-3)'
                                    }}>
                                        <span>👤 {activity.user}</span>
                                        <span>🕐 {formatDate(activity.time)} à {formatTime(activity.time)}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
