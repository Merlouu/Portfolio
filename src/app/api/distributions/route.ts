import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/distributions - List distributions
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const centerId = searchParams.get('centerId') || ''
        const date = searchParams.get('date') || ''

        const where: Record<string, unknown> = {}

        if (centerId) {
            where.centerId = centerId
        }

        if (date) {
            const startOfDay = new Date(date)
            startOfDay.setHours(0, 0, 0, 0)
            const endOfDay = new Date(date)
            endOfDay.setHours(23, 59, 59, 999)

            where.createdAt = {
                gte: startOfDay,
                lte: endOfDay
            }
        }

        const distributions = await prisma.distribution.findMany({
            where,
            include: {
                beneficiary: true,
                center: true,
                user: true,
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        })

        return NextResponse.json({ data: distributions })
    } catch (error) {
        console.error('Error fetching distributions:', error)
        return NextResponse.json({ error: 'Erreur lors de la récupération des distributions' }, { status: 500 })
    }
}

// POST /api/distributions - Create a new distribution
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            beneficiaryId,
            centerId,
            userId,
            items, // Array of { productId, quantity, pointsCost }
            notes
        } = body

        // Validate required fields
        if (!beneficiaryId || !centerId || !items || items.length === 0) {
            return NextResponse.json({
                error: 'Bénéficiaire, centre et produits sont requis'
            }, { status: 400 })
        }

        // Calculate total points
        const totalPoints = items.reduce((sum: number, item: { pointsCost: number, quantity: number }) =>
            sum + (item.pointsCost * item.quantity), 0)

        // Get beneficiary to check points
        const beneficiary = await prisma.beneficiary.findUnique({
            where: { id: beneficiaryId }
        })

        if (!beneficiary) {
            return NextResponse.json({ error: 'Bénéficiaire non trouvé' }, { status: 404 })
        }

        // Create distribution
        const distribution = await prisma.distribution.create({
            data: {
                beneficiaryId,
                centerId,
                userId: userId || null,
                totalPoints,
                notes: notes || null,
                items: {
                    create: items.map((item: { productId: string, quantity: number, pointsCost: number }) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        pointsCost: item.pointsCost
                    }))
                }
            },
            include: {
                beneficiary: true,
                center: true,
                items: {
                    include: { product: true }
                }
            }
        })

        // Update stock quantities for each item
        for (const item of items) {
            const stock = await prisma.stock.findFirst({
                where: { productId: item.productId, centerId }
            })

            if (stock) {
                await prisma.stock.update({
                    where: { id: stock.id },
                    data: { quantity: { decrement: item.quantity } }
                })

                // Create stock movement
                await prisma.stockMovement.create({
                    data: {
                        stockId: stock.id,
                        type: 'EXIT',
                        quantity: item.quantity,
                        reason: `DISTRIBUTION - Distribution #${distribution.id}`,
                        userId: userId || null
                    }
                })
            }
        }

        return NextResponse.json({
            data: distribution,
            message: 'Distribution enregistrée avec succès'
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating distribution:', error)
        return NextResponse.json({ error: 'Erreur lors de la création de la distribution' }, { status: 500 })
    }
}
