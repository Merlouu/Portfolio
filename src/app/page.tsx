'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useState, useEffect } from 'react'

interface StatsData {
  stats: {
    beneficiaries: { total: number; newThisMonth: number; trend: string }
    distributions: { total: number; thisWeek: number; trend: string }
    stocks: { lowItems: number; criticalItems: number; totalProducts: number }
    volunteers: { active: number; thisMonth: number }
  }
  weeklyDistributions: { day: string; count: number }[]
  topProducts: { name: string; count: number; percentage: number }[]
  recentActivities: { type: string; message: string; time: string; icon: string }[]
  forecasts: {
    nextWeekDistributions: number
    nextWeekBeneficiaries: number
    stocksToOrder: { name: string; current: number; needed: number; urgency: string }[]
  }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [data, setData] = useState<StatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats')
        if (!response.ok) throw new Error('Erreur chargement')
        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error('Stats fetch error:', err)
        setError('Erreur lors du chargement des statistiques')
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  // Use real data or fallback
  const stats = data?.stats || {
    beneficiaries: { total: 0, newThisMonth: 0, trend: '+0%' },
    distributions: { total: 0, thisWeek: 0, trend: '+0%' },
    stocks: { lowItems: 0, criticalItems: 0, totalProducts: 0 },
    volunteers: { active: 0, thisMonth: 0 }
  }

  const weeklyDistributions = data?.weeklyDistributions || [
    { day: 'Lun', count: 0 },
    { day: 'Mar', count: 0 },
    { day: 'Mer', count: 0 },
    { day: 'Jeu', count: 0 },
    { day: 'Ven', count: 0 },
    { day: 'Sam', count: 0 },
    { day: 'Dim', count: 0 },
  ]

  const maxDistributions = Math.max(...weeklyDistributions.map(d => d.count), 1)

  const forecasts = {
    nextWeekDistributions: data?.forecasts?.nextWeekDistributions || 0,
    nextWeekBeneficiaries: data?.forecasts?.nextWeekBeneficiaries || 0,
    stocksToOrder: data?.forecasts?.stocksToOrder || [],
    monthlyTrend: [
      { month: 'Oct', distributions: 120, beneficiaries: 310 },
      { month: 'Nov', distributions: 135, beneficiaries: 325 },
      { month: 'Déc', distributions: 148, beneficiaries: 335 },
      { month: 'Jan', distributions: stats.distributions.total || 156, beneficiaries: stats.beneficiaries.total || 342 },
      { month: 'Fév', distributions: Math.round((stats.distributions.total || 156) * 1.05), beneficiaries: Math.round((stats.beneficiaries.total || 342) * 1.05), forecast: true },
      { month: 'Mar', distributions: Math.round((stats.distributions.total || 156) * 1.12), beneficiaries: Math.round((stats.beneficiaries.total || 342) * 1.09), forecast: true },
    ]
  }

  const maxMonthly = Math.max(...forecasts.monthlyTrend.map(m => m.distributions))

  const recentActivities = data?.recentActivities || []

  const topProducts = data?.topProducts || []

  // Skeleton loader component
  const Skeleton = ({ width = '100%', height = '20px' }: { width?: string; height?: string }) => (
    <div style={{
      width,
      height,
      background: 'linear-gradient(90deg, var(--neutral-200) 25%, var(--neutral-100) 50%, var(--neutral-200) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: 'var(--radius-sm)'
    }} />
  )

  return (
    <div className="animate-fade-in">
      {/* Welcome Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Bonjour, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="page-description">
            Voici un aperçu de l'activité de CoeurSolidaire aujourd'hui
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/distributions/new" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nouvelle distribution
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 mb-6">
        <div className="stat-card stat-card-primary">
          <div className="flex justify-between items-start">
            <div>
              <div className="stat-value">{stats.beneficiaries.total}</div>
              <div className="stat-label">Bénéficiaires</div>
            </div>
            <span style={{
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--success-100)',
              color: 'var(--success-700)',
              fontWeight: 500
            }}>
              {stats.beneficiaries.trend}
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginTop: 'var(--space-2)' }}>
            +{stats.beneficiaries.newThisMonth} ce mois
          </div>
        </div>

        <div className="stat-card stat-card-secondary">
          <div className="flex justify-between items-start">
            <div>
              <div className="stat-value">{stats.distributions.thisWeek}</div>
              <div className="stat-label">Distributions cette semaine</div>
            </div>
            <span style={{
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--success-100)',
              color: 'var(--success-700)',
              fontWeight: 500
            }}>
              {stats.distributions.trend}
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginTop: 'var(--space-2)' }}>
            {stats.distributions.total} ce mois
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-value">{stats.stocks.lowItems}</div>
          <div className="stat-label">Stocks faibles</div>
          {stats.stocks.criticalItems > 0 && (
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--error-600)',
              marginTop: 'var(--space-2)',
              fontWeight: 500
            }}>
              ⚠️ {stats.stocks.criticalItems} critique
            </div>
          )}
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-value">{stats.volunteers.active}</div>
          <div className="stat-label">Bénévoles actifs</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginTop: 'var(--space-2)' }}>
            +{stats.volunteers.thisMonth} ce mois
          </div>
        </div>
      </div>

      {/* Forecasts Section */}
      <div className="card mb-6" style={{
        background: 'linear-gradient(135deg, var(--secondary-50), var(--primary-50))',
        border: '1px solid var(--secondary-200)'
      }}>
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--secondary-600)" style={{ width: 24, height: 24 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </svg>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--secondary-800)' }}>
            📊 Prévisions & Tendances
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Forecast Summary */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--foreground-muted)' }}>
              Prévision semaine prochaine
            </h3>
            <div className="flex flex-col gap-3">
              <div style={{
                padding: 'var(--space-3)',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.875rem' }}>📦 Distributions prévues</span>
                <span style={{ fontWeight: 700, color: 'var(--secondary-600)', fontSize: '1.25rem' }}>
                  ~{forecasts.nextWeekDistributions}
                </span>
              </div>
              <div style={{
                padding: 'var(--space-3)',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.875rem' }}>👥 Nouveaux inscrits estimés</span>
                <span style={{ fontWeight: 700, color: 'var(--primary-600)', fontSize: '1.25rem' }}>
                  ~{forecasts.nextWeekBeneficiaries}
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Trend Chart */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--foreground-muted)' }}>
              Évolution mensuelle
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-2)', height: 100 }}>
              {forecasts.monthlyTrend.map((month, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${(month.distributions / maxMonthly) * 70}px`,
                      background: month.forecast
                        ? 'repeating-linear-gradient(45deg, var(--secondary-300), var(--secondary-300) 2px, var(--secondary-400) 2px, var(--secondary-400) 4px)'
                        : 'linear-gradient(180deg, var(--secondary-400), var(--secondary-600))',
                      borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                      opacity: month.forecast ? 0.7 : 1,
                      border: month.forecast ? '2px dashed var(--secondary-500)' : 'none'
                    }}
                  />
                  <div style={{
                    fontSize: '0.65rem',
                    color: month.forecast ? 'var(--secondary-600)' : 'var(--foreground-muted)',
                    marginTop: 'var(--space-1)',
                    fontWeight: month.forecast ? 600 : 400
                  }}>
                    {month.month}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--foreground-muted)', marginTop: 'var(--space-2)', textAlign: 'center' }}>
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                background: 'var(--secondary-500)',
                marginRight: 4,
                borderRadius: 2
              }}></span>
              Réel
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                border: '2px dashed var(--secondary-500)',
                marginLeft: 12,
                marginRight: 4,
                borderRadius: 2
              }}></span>
              Prévision
            </div>
          </div>

          {/* Stock Needs */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--foreground-muted)' }}>
              Besoins en stock estimés
            </h3>
            <div className="flex flex-col gap-2">
              {forecasts.stocksToOrder.map((item, idx) => (
                <div key={idx} style={{
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderLeft: `3px solid ${item.urgency === 'critical' ? 'var(--error-500)' : 'var(--warning-500)'}`
                }}>
                  <span style={{ fontSize: '0.875rem' }}>{item.name}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: item.urgency === 'critical' ? 'var(--error-600)' : 'var(--warning-600)'
                    }}>
                      +{item.needed - item.current} unités
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--foreground-muted)' }}>
                      {item.current} → {item.needed}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Weekly Chart */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                Distributions cette semaine
              </h2>
              <span style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                Total: {weeklyDistributions.reduce((a, b) => a + b.count, 0)}
              </span>
            </div>

            {/* Simple Bar Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-3)', height: 160 }}>
              {weeklyDistributions.map((day, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    marginBottom: 'var(--space-1)',
                    color: day.count === maxDistributions ? 'var(--primary-600)' : 'var(--foreground-muted)'
                  }}>
                    {day.count > 0 ? day.count : ''}
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: `${(day.count / maxDistributions) * 120}px`,
                      background: day.count === maxDistributions
                        ? 'linear-gradient(180deg, var(--primary-400), var(--primary-600))'
                        : 'linear-gradient(180deg, var(--secondary-300), var(--secondary-500))',
                      borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                      minHeight: day.count > 0 ? 8 : 0,
                      transition: 'height 0.3s ease'
                    }}
                  />
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--foreground-muted)',
                    marginTop: 'var(--space-2)'
                  }}>
                    {day.day}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
              Produits les plus distribués
            </h2>
            <div className="flex flex-col gap-3">
              {topProducts.map((product, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span style={{
                        width: 24,
                        height: 24,
                        borderRadius: 'var(--radius-md)',
                        background: idx === 0 ? 'var(--primary-100)' : 'var(--neutral-100)',
                        color: idx === 0 ? 'var(--primary-600)' : 'var(--foreground-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {idx + 1}
                      </span>
                      <span style={{ fontWeight: 500 }}>{product.name}</span>
                    </div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--foreground-muted)' }}>
                      {product.count} distributions
                    </span>
                  </div>
                  <div className="progress" style={{ height: 6 }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${product.percentage}%`,
                        background: idx === 0
                          ? 'linear-gradient(90deg, var(--primary-400), var(--primary-600))'
                          : 'var(--secondary-400)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Recent Activity */}
          <div className="card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
              Activité récente
            </h2>
            <div className="flex flex-col gap-4">
              {recentActivities.map((activity, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: 'var(--space-3)',
                    paddingBottom: idx < recentActivities.length - 1 ? 'var(--space-3)' : 0,
                    borderBottom: idx < recentActivities.length - 1 ? '1px solid var(--neutral-200)' : 'none'
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--neutral-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>
                    {activity.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      {activity.message}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/activity"
              className="btn btn-ghost btn-sm w-full"
              style={{ marginTop: 'var(--space-4)' }}
            >
              Voir tout l'historique
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
              Actions rapides
            </h2>
            <div className="flex flex-col gap-2">
              <Link href="/beneficiaries/new" className="btn btn-secondary btn-sm w-full" style={{ justifyContent: 'flex-start' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                Nouveau bénéficiaire
              </Link>
              <Link href="/stocks/entry" className="btn btn-secondary btn-sm w-full" style={{ justifyContent: 'flex-start' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Entrée de stock
              </Link>
              <Link href="/campaigns/new" className="btn btn-secondary btn-sm w-full" style={{ justifyContent: 'flex-start' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 18, height: 18 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                Nouvelle campagne
              </Link>
            </div>
          </div>

          {/* Alerts */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, var(--warning-50), var(--warning-100))',
            border: '1px solid var(--warning-200)'
          }}>
            <div className="flex items-start gap-3">
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-lg)',
                background: 'var(--warning-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--warning-700)'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--warning-800)', marginBottom: 'var(--space-1)' }}>
                  Alertes stocks
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--warning-700)' }}>
                  3 produits ont un stock faible et nécessitent un réapprovisionnement
                </div>
                <Link
                  href="/stocks?status=low"
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--warning-800)',
                    fontWeight: 500,
                    marginTop: 'var(--space-2)',
                    display: 'inline-block'
                  }}
                >
                  Voir les détails →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
