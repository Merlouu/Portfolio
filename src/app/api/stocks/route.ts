import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/stocks - List all stock items
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const centerId = searchParams.get('centerId') || ''
        const status = searchParams.get('status') || '' // 'low', 'critical', 'ok'

        const where: Record<string, unknown> = {}

        if (centerId) {
            where.centerId = centerId
        }

        const stocks = await prisma.stock.findMany({
            where,
            include: {
                product: {
                    include: { category: true }
                },
                center: true,
                lots: {
                    orderBy: { expiryDate: 'asc' }
                }
            },
            orderBy: { updatedAt: 'desc' }
        })

        // Filter by status if specified
        let filteredStocks = stocks
        if (status) {
            filteredStocks = stocks.filter(stock => {
                const minQty = stock.minQuantity || 10
                const ratio = stock.quantity / minQty

                if (status === 'critical') return ratio < 0.5
                if (status === 'low') return ratio >= 0.5 && ratio < 1
                if (status === 'ok') return ratio >= 1
                return true
            })
        }

        return NextResponse.json({ data: filteredStocks })
    } catch (error: unknown) {
        console.error('Error fetching stocks:', error)
        return NextResponse.json({ error: 'Erreur lors de la récupération des stocks' }, { status: 500 })
    }
}

// POST /api/stocks - Add stock entry
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            productId,
            centerId,
            quantity,
            batchNumber,
            expiryDate,
            source,
            notes,
            userId
        } = body

        // Validate required fields
        if (!productId || !centerId || !quantity || !userId) {
            return NextResponse.json({
                error: 'Produit, centre, quantité et utilisateur sont requis'
            }, { status: 400 })
        }

        // Find or create stock record
        let stock = await prisma.stock.findFirst({
            where: { productId, centerId }
        })

        if (!stock) {
            stock = await prisma.stock.create({
                data: {
                    productId,
                    centerId,
                    quantity: 0,
                    minQuantity: 10
                }
            })
        }

        // Update stock quantity
        stock = await prisma.stock.update({
            where: { id: stock.id },
            data: {
                quantity: { increment: parseFloat(quantity) }
            }
        })

        // Create lot
        const lot = await prisma.lot.create({
            data: {
                productId,
                stockId: stock.id,
                batchNumber: batchNumber || null,
                quantity: parseFloat(quantity),
                expiryDate: expiryDate ? new Date(expiryDate) : null,
                source: source || 'Donation',
                notes: notes || null
            }
        })

        // Create stock movement
        await prisma.stockMovement.create({
            data: {
                stockId: stock.id,
                lotId: lot.id,
                type: 'ENTRY',
                quantity: parseFloat(quantity),
                reason: source || 'Entrée de stock',
                userId
            }
        })

        // Return updated stock with includes
        const updatedStock = await prisma.stock.findUnique({
            where: { id: stock.id },
            include: {
                product: { include: { category: true } },
                center: true,
                lots: true
            }
        })

        return NextResponse.json({
            data: updatedStock,
            message: 'Entrée de stock enregistrée avec succès'
        }, { status: 201 })

    } catch (error: unknown) {
        console.error('Error creating stock entry:', error)
        return NextResponse.json({ error: 'Erreur lors de l\'entrée de stock' }, { status: 500 })
    }
}
