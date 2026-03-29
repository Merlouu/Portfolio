import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// POST - Register new user (creates both User and Beneficiary)
export async function POST(request: Request) {
    try {
        const body = await request.json()

        const {
            firstName, lastName, email, phone,
            address, city, postalCode,
            adultsCount, childrenCount,
            password
        } = body

        // Validation
        if (!firstName || !lastName) {
            return NextResponse.json({ error: 'Prénom et nom requis' }, { status: 400 })
        }

        if (!password || password.length < 6) {
            return NextResponse.json({ error: 'Mot de passe requis (min 6 caractères)' }, { status: 400 })
        }

        // Check if email already exists
        if (email) {
            const existingUser = await prisma.user.findUnique({
                where: { email: email.toLowerCase() }
            })

            if (existingUser) {
                return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 })
            }
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // Generate email if not provided
        const userEmail = email?.toLowerCase() || `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${Date.now()}@temp.local`

        // Calculate points based on household
        const pointsBalance = 20 + (adultsCount || 1) * 10 + (childrenCount || 0) * 15

        // Get a default center (first active one)
        const defaultCenter = await prisma.center.findFirst({
            where: { isActive: true }
        })

        if (!defaultCenter) {
            return NextResponse.json({ error: 'Aucun centre disponible' }, { status: 500 })
        }

        // Create user in database
        const user = await prisma.user.create({
            data: {
                email: userEmail,
                name: `${firstName} ${lastName}`,
                passwordHash,
                role: 'VOLUNTEER', // Default role for self-registration
                phone: phone || null,
                centerId: defaultCenter.id
            }
        })

        // Create beneficiary record linked to the center
        const beneficiary = await prisma.beneficiary.create({
            data: {
                firstName,
                lastName,
                email: email?.toLowerCase() || null,
                phone: phone || null,
                address: address || null,
                city: city || null,
                postalCode: postalCode || null,
                adultsCount: adultsCount || 1,
                childrenCount: childrenCount || 0,
                householdSize: (adultsCount || 1) + (childrenCount || 0),
                pointsBalance,
                centerId: defaultCenter.id,
                userId: user.id
            }
        })

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                firstName,
                lastName,
                role: user.role,
                pointsBalance,
                beneficiaryId: beneficiary.id
            },
            message: 'Compte créé avec succès'
        }, { status: 201 })

    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json({ error: 'Erreur lors de l\'inscription' }, { status: 500 })
    }
}

// GET - Check if email exists
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
        return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
    })

    return NextResponse.json({ exists: !!existingUser })
}
