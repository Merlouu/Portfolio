'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'ADMIN' | 'MANAGER' | 'VOLUNTEER' | 'BENEFICIARY'

export interface User {
    id: string
    email: string
    name: string
    role: UserRole
    centerId?: string
    centerName?: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: UserRole }>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for existing session in localStorage
        const savedUser = localStorage.getItem('coeursolidaire_user')
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser) as User)
            } catch {
                localStorage.removeItem('coeursolidaire_user')
            }
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; role?: UserRole }> => {
        try {
            // Call the real API for authentication
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                return { success: false, error: data.error || 'Email ou mot de passe incorrect' }
            }

            // Map API response to User object
            const userObj: User = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                role: data.user.role as UserRole,
                centerId: data.user.centerId,
                centerName: data.user.centerName
            }

            setUser(userObj)
            localStorage.setItem('coeursolidaire_user', JSON.stringify(userObj))
            return { success: true, role: userObj.role }
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, error: 'Erreur de connexion au serveur' }
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('coeursolidaire_user')
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

// Role-based access helper
export function hasPermission(userRole: UserRole | undefined, requiredRoles: UserRole[]): boolean {
    if (!userRole) return false
    return requiredRoles.includes(userRole)
}

// Role labels in French
export const ROLE_LABELS: Record<UserRole, string> = {
    ADMIN: 'Administrateur',
    MANAGER: 'Responsable de centre',
    VOLUNTEER: 'Bénévole',
    BENEFICIARY: 'Bénéficiaire'
}

// Role colors
export const ROLE_COLORS: Record<UserRole, string> = {
    ADMIN: 'var(--primary-500)',
    MANAGER: 'var(--secondary-500)',
    VOLUNTEER: 'var(--success-500)',
    BENEFICIARY: 'var(--accent-500)'
}
