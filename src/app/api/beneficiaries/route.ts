import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/beneficiaries - List all beneficiaries
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const search = searchParams.get('search') || ''
        const centerId = searchParams.get('centerId') || ''

        const where: Record<string, unknown> = {}

        if (search) {
            where.OR = [
                { firstName: { contains: search } },
                { lastName: { contains: search } },
                { email: { contains: search } },
                { phone: { contains: search } },
            ]
        }

        if (centerId) {
            where.centerId = centerId
        }

        const beneficiaries = await prisma.beneficiary.findMany({
            where,
            include: {
                center: true,
                registrations: {
                    include: {
                        campaign: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        })

        return NextResponse.json({ data: beneficiaries })
    } catch (error) {
        console.error('Error fetching beneficiaries:', error)
        return NextResponse.json({ error: 'Erreur lors de la récupération des bénéficiaires' }, { status: 500 })
    }
}

// POST /api/beneficiaries - Create a new beneficiary
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            postalCode,
            dateOfBirth,
            householdSize,
            adultsCount,
            childrenCount,
            monthlyIncome,
            socialStatus,
            centerId,
            campaignId
        } = body

        // Validate required fields
        if (!firstName || !lastName || !centerId) {
            return NextResponse.json({ error: 'Le prénom, nom et centre sont requis' }, { status: 400 })
        }

        // Calculate initial points based on household
        const initialPoints = 20 + (adultsCount || 1) * 10 + (childrenCount || 0) * 15

        // Create beneficiary
        const beneficiary = await prisma.beneficiary.create({
            data: {
                firstName,
                lastName,
                email: email || null,
                phone: phone || null,
                address: address || null,
                city: city || null,
                postalCode: postalCode || null,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                householdSize: householdSize || 1,
                adultsCount: adultsCount || 1,
                childrenCount: childrenCount || 0,
                monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : null,
                socialStatus: socialStatus || null,
                pointsBalance: initialPoints,
                centerId,
                // Create registration if campaign provided
                registrations: campaignId ? {
                    create: {
                        campaignId,
                        status: 'APPROVED'
                    }
                } : undefined
            },
            include: {
                center: true,
                registrations: {
                    include: {
                        campaign: true
                    }
                }
            }
        })

        return NextResponse.json({
            data: beneficiary,
            message: 'Bénéficiaire créé avec succès'
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating beneficiary:', error)
        return NextResponse.json({ error: 'Erreur lors de la création du bénéficiaire' }, { status: 500 })
    }
}
