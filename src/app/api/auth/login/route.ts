import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })
        }

        const emailLower = email.toLowerCase()

        // Find user in database
        const user = await prisma.user.findUnique({
            where: { email: emailLower },
            include: {
                center: true
            }
        })

        if (!user) {
            return NextResponse.json({
                error: 'Email ou mot de passe incorrect'
            }, { status: 401 })
        }

        // Check if user is active
        if (!user.isActive) {
            return NextResponse.json({
                error: 'Ce compte a été désactivé'
            }, { status: 401 })
        }

        // Verify password
        const passwordValid = await bcrypt.compare(password, user.passwordHash)

        if (!passwordValid) {
            return NextResponse.json({
                error: 'Email ou mot de passe incorrect'
            }, { status: 401 })
        }

        // Get beneficiary info if exists (for point balance)
        const beneficiary = await prisma.beneficiary.findFirst({
            where: { email: emailLower }
        })

        // Extract first and last name from full name
        const nameParts = user.name.split(' ')
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                firstName,
                lastName,
                role: user.role,
                phone: user.phone,
                centerId: user.centerId,
                centerName: user.center?.name,
                pointsBalance: beneficiary?.pointsBalance || 0,
                beneficiaryId: beneficiary?.id || null
            }
        })

    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Erreur de connexion' }, { status: 500 })
    }
}
