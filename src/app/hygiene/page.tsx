'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'

interface OvenLog {
    id: string
    ovenName: string
    turnOnTime: string
    turnOffTime: string | null
    temperature: number | null
    notes: string | null
    createdAt: string
    user: { name: string }
}

interface TemperatureLog {
    id: string
    dishName: string
    temperature: number
    checkType: string
    isCompliant: boolean
    measuredAt: string
    notes: string | null
    user: { name: string }
}

export default function HygieneDashboard() {
    const { user } = useAuth()
    const [ovenLogs, setOvenLogs] = useState<OvenLog[]>([])
    const [tempLogs, setTempLogs] = useState<TemperatureLog[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

    useEffect(() => {
        fetchData()
    }, [selectedDate])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [ovenRes, tempRes] = await Promise.all([
                fetch(`/api/hygiene/oven-logs?date=${selectedDate}`),
                fetch(`/api/hygiene/temperature-logs?date=${selectedDate}`)
            ])
            const ovenData = await ovenRes.json()
            const tempData = await tempRes.json()
            setOvenLogs(ovenData.data || [])
            setTempLogs(tempData.data || [])
        } catch (error) {
            console.error('Error fetching hygiene data:', error)
        }
        setLoading(false)
    }

    const getCheckTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            RECEPTION: 'Réception',
            STOCKAGE: 'Stockage',
            SERVICE: 'Service',
            REFROIDISSEMENT: 'Refroidissement'
        }
        return labels[type] || type
    }

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const nonCompliantCount = tempLogs.filter(t => !t.isCompliant).length
    const activeOvens = ovenLogs.filter(o => !o.turnOffTime).length

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1 className="page-title">🧪 Qualité & Hygiène</h1>
                    <p className="page-description">Suivi HACCP et contrôles sanitaires</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/hygiene/oven" className="btn btn-secondary">
                        🔥 Log Four
                    </Link>
                    <Link href="/hygiene/temperature" className="btn btn-primary">
                        🌡️ Relevé Température
                    </Link>
                </div>
            </div>

            {/* Date Selector */}
            <div className="card mb-6" style={{ padding: 'var(--space-4)' }}>
                <div className="flex items-center gap-4">
                    <label style={{ fontWeight: 500 }}>Date:</label>
                    <input
                        type="date"
                        className="input"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{ width: 200 }}
                    />
                    <button onClick={fetchData} className="btn btn-ghost btn-sm">
                        🔄 Actualiser
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 mb-6">
                <div className="stat-card stat-card-primary">
                    <div className="stat-value">{tempLogs.length}</div>
                    <div className="stat-label">Relevés température</div>
                </div>
                <div className="stat-card stat-card-secondary">
                    <div className="stat-value">{ovenLogs.length}</div>
                    <div className="stat-label">Logs four</div>
                </div>
                <div className={`stat-card ${activeOvens > 0 ? 'stat-card-warning' : 'stat-card-success'}`}>
                    <div className="stat-value">{activeOvens}</div>
                    <div className="stat-label">Fours actifs</div>
                </div>
                <div className={`stat-card ${nonCompliantCount > 0 ? 'stat-card-error' : 'stat-card-success'}`}>
                    <div className="stat-value">{nonCompliantCount}</div>
                    <div className="stat-label">Non conformes</div>
                    {nonCompliantCount > 0 && (
                        <div style={{ color: 'var(--error-600)', fontSize: '0.75rem', marginTop: 4 }}>
                            ⚠️ Action requise
                        </div>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="card" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                    <div>⏳ Chargement...</div>
                </div>
            ) : (
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                    {/* Temperature Logs */}
                    <div className="card">
                        <div className="flex justify-between items-center mb-4">
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                                🌡️ Relevés de température
                            </h2>
                            <Link href="/hygiene/temperature" className="btn btn-ghost btn-sm">
                                + Ajouter
                            </Link>
                        </div>

                        {tempLogs.length === 0 ? (
                            <div style={{ textAlign: 'center', color: 'var(--foreground-muted)', padding: 'var(--space-6)' }}>
                                Aucun relevé pour cette date
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {tempLogs.map((log) => (
                                    <div
                                        key={log.id}
                                        style={{
                                            padding: 'var(--space-3)',
                                            borderRadius: 'var(--radius-md)',
                                            background: log.isCompliant ? 'var(--success-50)' : 'var(--error-50)',
                                            border: `1px solid ${log.isCompliant ? 'var(--success-200)' : 'var(--error-200)'}`
                                        }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{log.dishName}</div>
                                                <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                                    {getCheckTypeLabel(log.checkType)} • {formatTime(log.measuredAt)} • {log.user.name}
                                                </div>
                                            </div>
                                            <div style={{
                                                fontSize: '1.25rem',
                                                fontWeight: 700,
                                                color: log.isCompliant ? 'var(--success-600)' : 'var(--error-600)'
                                            }}>
                                                {log.temperature}°C
                                            </div>
                                        </div>
                                        {!log.isCompliant && (
                                            <div style={{
                                                marginTop: 'var(--space-2)',
                                                padding: 'var(--space-2)',
                                                background: 'var(--error-100)',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.75rem',
                                                color: 'var(--error-700)'
                                            }}>
                                                ⚠️ NON CONFORME HACCP - Action corrective requise
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Oven Logs */}
                    <div className="card">
                        <div className="flex justify-between items-center mb-4">
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                                🔥 Logs Four
                            </h2>
                            <Link href="/hygiene/oven" className="btn btn-ghost btn-sm">
                                + Ajouter
                            </Link>
                        </div>

                        {ovenLogs.length === 0 ? (
                            <div style={{ textAlign: 'center', color: 'var(--foreground-muted)', padding: 'var(--space-6)' }}>
                                Aucun log pour cette date
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {ovenLogs.map((log) => (
                                    <div
                                        key={log.id}
                                        style={{
                                            padding: 'var(--space-3)',
                                            borderRadius: 'var(--radius-md)',
                                            background: 'var(--neutral-50)',
                                            border: '1px solid var(--neutral-200)'
                                        }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{log.ovenName}</div>
                                                <div style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                                                    {log.user.name}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '0.875rem' }}>
                                                    🟢 {formatTime(log.turnOnTime)}
                                                    {log.turnOffTime && (
                                                        <> → 🔴 {formatTime(log.turnOffTime)}</>
                                                    )}
                                                </div>
                                                {log.temperature && (
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                                        {log.temperature}°C
                                                    </div>
                                                )}
                                                {!log.turnOffTime && (
                                                    <span className="badge badge-warning" style={{ marginTop: 4 }}>
                                                        En cours
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
