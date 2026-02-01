'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth, ROLE_LABELS, hasPermission, UserRole } from '@/lib/auth-context'
import { ThemeToggle } from '@/lib/theme-context'
import { useEffect } from 'react'

interface NavItem {
    href: string
    label: string
    icon: React.ReactNode
    roles: UserRole[]
}

const navItems: NavItem[] = [
    {
        href: '/',
        label: 'Tableau de bord',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
        roles: ['ADMIN', 'MANAGER', 'VOLUNTEER']
    },
    {
        href: '/beneficiaries',
        label: 'Bénéficiaires',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
        ),
        roles: ['ADMIN', 'MANAGER', 'VOLUNTEER']
    },
    {
        href: '/distributions',
        label: 'Distributions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
        ),
        roles: ['ADMIN', 'MANAGER', 'VOLUNTEER']
    },
    {
        href: '/stocks',
        label: 'Stocks',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
        ),
        roles: ['ADMIN', 'MANAGER', 'VOLUNTEER']
    },
    {
        href: '/campaigns',
        label: 'Campagnes',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
        ),
        roles: ['ADMIN', 'MANAGER']
    },
    {
        href: '/centers',
        label: 'Centres',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
            </svg>
        ),
        roles: ['ADMIN']
    },
    {
        href: '/hygiene',
        label: 'Qualité & Hygiène',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
        ),
        roles: ['ADMIN', 'MANAGER']
    },
    {
        href: '/my-account',
        label: 'Mon Espace',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
        ),
        roles: ['BENEFICIARY']
    }
]

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { user, isLoading, logout, isAuthenticated } = useAuth()
    const pathname = usePathname()
    const router = useRouter()

    // Public pages that don't require authentication
    const publicPages = ['/login', '/register']
    const isPublicPage = publicPages.includes(pathname)

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated && !isPublicPage) {
            router.push('/login')
        }
    }, [isLoading, isAuthenticated, pathname, router, isPublicPage])

    // Show loading state
    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--neutral-50)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ width: 40, height: 40, margin: '0 auto', color: 'var(--primary-500)' }}>
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p style={{ marginTop: 'var(--space-4)', color: 'var(--foreground-muted)' }}>Chargement...</p>
                </div>
            </div>
        )
    }

    // Show public pages without sidebar
    if (isPublicPage) {
        return <>{children}</>
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
        return null
    }

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }

    const filteredNavItems = navItems.filter(item =>
        hasPermission(user?.role, item.roles)
    )

    const getRoleBadgeColor = (role: UserRole) => {
        switch (role) {
            case 'ADMIN': return { bg: 'var(--primary-100)', color: 'var(--primary-700)' }
            case 'MANAGER': return { bg: 'var(--secondary-100)', color: 'var(--secondary-700)' }
            case 'VOLUNTEER': return { bg: 'var(--success-100)', color: 'var(--success-700)' }
            case 'BENEFICIARY': return { bg: 'var(--accent-100)', color: 'var(--accent-700)' }
        }
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo" style={{ justifyContent: 'space-between' }}>
                    <div className="flex items-center gap-2">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 28C16 28 4 20 4 12C4 8 7.5 4 12 4C14.5 4 16 6 16 6C16 6 17.5 4 20 4C24.5 4 28 8 28 12C28 20 16 28 16 28Z" fill="currentColor" />
                        </svg>
                        CoeurSolidaire
                    </div>
                    <ThemeToggle />
                </div>

                <nav className="sidebar-nav">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto" style={{ marginTop: 'auto' }}>
                    {/* User Info */}
                    <div style={{
                        padding: 'var(--space-4)',
                        background: 'var(--neutral-50)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--space-3)'
                    }}>
                        <div className="flex items-center gap-3">
                            <div className="avatar" style={{
                                background: getRoleBadgeColor(user!.role).bg,
                                color: getRoleBadgeColor(user!.role).color
                            }}>
                                {getInitials(user!.name)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{user!.name}</div>
                                <div style={{
                                    fontSize: '0.7rem',
                                    padding: '2px 6px',
                                    borderRadius: 'var(--radius-sm)',
                                    display: 'inline-block',
                                    background: getRoleBadgeColor(user!.role).bg,
                                    color: getRoleBadgeColor(user!.role).color,
                                    fontWeight: 500
                                }}>
                                    {ROLE_LABELS[user!.role]}
                                </div>
                            </div>
                        </div>
                        {user!.centerName && (
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--foreground-muted)',
                                marginTop: 'var(--space-2)',
                                paddingLeft: 'calc(40px + var(--space-3))'
                            }}>
                                📍 {user!.centerName}
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={logout}
                        className="btn btn-ghost w-full"
                        style={{
                            justifyContent: 'flex-start',
                            padding: 'var(--space-3) var(--space-4)',
                            color: 'var(--error-600)'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {children}
            </main>
        </div>
    )
}
