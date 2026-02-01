import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/centers - List all centers
export async function GET() {
    try {
        const centers = await prisma.center.findMany({
            include: {
                _count: {
                    select: {
                        users: true,
                        beneficiaries: true,
                        stocks: true
                    }
                }
            },
            orderBy: { name: 'asc' }
        })

        return NextResponse.json({ data: centers })
    } catch (error) {
        console.error('Error fetching centers:', error)
        return NextResponse.json({ error: 'Erreur lors de la récupération des centres' }, { status: 500 })
    }
}

// POST /api/centers - Create a new center
export async function POST(request: Request) {
    try {
        const body = await request.json()

        const { name, address, city, postalCode, phone, email } = body

        if (!name || !address || !city || !postalCode) {
            return NextResponse.json({
                error: 'Le nom, adresse, ville et code postal sont requis'
            }, { status: 400 })
        }

        const center = await prisma.center.create({
            data: {
                name,
                address,
                city,
                postalCode,
                phone: phone || null,
                email: email || null
            }
        })

        return NextResponse.json({
            data: center,
            message: 'Centre créé avec succès'
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating center:', error)
        return NextResponse.json({ error: 'Erreur lors de la création du centre' }, { status: 500 })
    }
}
