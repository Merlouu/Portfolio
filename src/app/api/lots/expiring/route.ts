import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const days = parseInt(searchParams.get('days') || '7')

        const now = new Date()
        const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

        const expiringLots = await prisma.lot.findMany({
            where: {
                expiryDate: {
                    gte: now,
                    lte: futureDate
                },
                quantity: { gt: 0 }
            },
            include: {
                product: {
                    include: { category: true }
                },
                stock: {
                    include: { center: true }
                }
            },
            orderBy: { expiryDate: 'asc' }
        })

        // Also get already expired items
        const expiredLots = await prisma.lot.findMany({
            where: {
                expiryDate: { lt: now },
                quantity: { gt: 0 }
            },
            include: {
                product: {
                    include: { category: true }
                },
                stock: {
                    include: { center: true }
                }
            },
            orderBy: { expiryDate: 'desc' },
            take: 20
        })

        const formatLot = (lot: typeof expiringLots[0], isExpired: boolean) => {
            const daysUntil = lot.expiryDate
                ? Math.ceil((lot.expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                : null

            return {
                id: lot.id,
                batchNumber: lot.batchNumber,
                quantity: lot.quantity,
                expiryDate: lot.expiryDate,
                daysUntilExpiry: daysUntil,
                isExpired,
                urgency: isExpired ? 'expired' : (daysUntil !== null && daysUntil <= 3 ? 'critical' : daysUntil !== null && daysUntil <= 7 ? 'warning' : 'normal'),
                product: {
                    id: lot.product.id,
                    name: lot.product.name,
                    category: lot.product.category.name,
                    unit: lot.product.unit
                },
                center: {
                    id: lot.stock.center.id,
                    name: lot.stock.center.name
                },
                source: lot.source,
                receivedDate: lot.receivedDate
            }
        }

        return NextResponse.json({
            expiring: expiringLots.map(l => formatLot(l, false)),
            expired: expiredLots.map(l => formatLot(l, true)),
            summary: {
                expiringCount: expiringLots.length,
                expiredCount: expiredLots.length,
                criticalCount: expiringLots.filter(l =>
                    l.expiryDate && (l.expiryDate.getTime() - now.getTime()) <= 3 * 24 * 60 * 60 * 1000
                ).length
            }
        })
    } catch (error) {
        console.error('Expiring lots API error:', error)
        return NextResponse.json({ error: 'Erreur lors du chargement' }, { status: 500 })
    }
}
