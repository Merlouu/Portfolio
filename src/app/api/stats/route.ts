import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - now.getDay() + 1) // Monday
        startOfWeek.setHours(0, 0, 0, 0)

        // Basic counts
        const [
            totalBeneficiaries,
            newBeneficiariesThisMonth,
            totalDistributionsThisMonth,
            distributionsThisWeek,
            activeVolunteers,
            weeklyDistributions,
            allDistributionItems,
            recentDistributions,
            recentBeneficiaries,
            expiringLots,
            allStocks
        ] = await Promise.all([
            prisma.beneficiary.count({ where: { isActive: true } }),
            prisma.beneficiary.count({
                where: { createdAt: { gte: startOfMonth }, isActive: true }
            }),
            prisma.distribution.count({
                where: { createdAt: { gte: startOfMonth } }
            }),
            prisma.distribution.count({
                where: { createdAt: { gte: startOfWeek } }
            }),
            prisma.user.count({
                where: { isActive: true, role: { in: ['VOLUNTEER', 'MANAGER'] } }
            }),
            prisma.distribution.findMany({
                where: { createdAt: { gte: startOfWeek } },
                select: { createdAt: true }
            }),
            prisma.$queryRaw<Array<{ productId: string, total: number }>>`
                SELECT productId, COUNT(*) as total 
                FROM DistributionItem 
                GROUP BY productId 
                ORDER BY total DESC 
                LIMIT 5
            `,
            prisma.distribution.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { beneficiary: true }
            }),
            prisma.beneficiary.findMany({
                take: 3,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.lot.findMany({
                where: {
                    expiryDate: {
                        gte: now,
                        lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
                    },
                    quantity: { gt: 0 }
                },
                include: { product: true },
                orderBy: { expiryDate: 'asc' },
                take: 5
            }),
            prisma.stock.findMany({
                where: { minQuantity: { gt: 0 } },
                include: { product: true }
            })
        ])

        // Calculate stock alerts
        const lowStocks = allStocks.filter(s => s.quantity <= s.minQuantity * 1.5 && s.quantity > s.minQuantity).length
        const criticalStocks = allStocks.filter(s => s.quantity <= s.minQuantity).length

        // Process weekly distributions by day
        const distributionsByDay = [0, 0, 0, 0, 0, 0, 0]
        weeklyDistributions.forEach(d => {
            const day = d.createdAt.getDay()
            distributionsByDay[day]++
        })
        const weeklyDistributionsFormatted = [
            { day: 'Lun', count: distributionsByDay[1] },
            { day: 'Mar', count: distributionsByDay[2] },
            { day: 'Mer', count: distributionsByDay[3] },
            { day: 'Jeu', count: distributionsByDay[4] },
            { day: 'Ven', count: distributionsByDay[5] },
            { day: 'Sam', count: distributionsByDay[6] },
            { day: 'Dim', count: distributionsByDay[0] },
        ]

        // Get product names for top products
        const productIds = allDistributionItems.map(p => p.productId)
        const products = productIds.length > 0
            ? await prisma.product.findMany({ where: { id: { in: productIds } } })
            : []
        const productMap = new Map(products.map(p => [p.id, p.name]))

        const maxCount = Number(allDistributionItems[0]?.total) || 1
        const topProductsFormatted = allDistributionItems.map(p => ({
            name: productMap.get(p.productId) || 'Inconnu',
            count: Number(p.total),
            percentage: Math.round((Number(p.total) / maxCount) * 100)
        }))

        // Format recent activities
        const activities: Array<{ type: string, message: string, time: Date, icon: string }> = []

        recentDistributions.forEach(d => {
            activities.push({
                type: 'distribution',
                message: `Distribution pour ${d.beneficiary.firstName} ${d.beneficiary.lastName}`,
                time: d.createdAt,
                icon: '🛒'
            })
        })

        recentBeneficiaries.forEach(b => {
            activities.push({
                type: 'beneficiary',
                message: `Nouveau bénéficiaire: ${b.firstName} ${b.lastName}`,
                time: b.createdAt,
                icon: '👤'
            })
        })

        activities.sort((a, b) => b.time.getTime() - a.time.getTime())
        const recentActivitiesFormatted = activities.slice(0, 5).map(a => ({
            ...a,
            time: formatTimeAgo(a.time)
        }))

        // Calculate trends
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

        const [lastMonthBeneficiaries, lastMonthDistributions] = await Promise.all([
            prisma.beneficiary.count({ where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } } }),
            prisma.distribution.count({ where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } } })
        ])

        const beneficiaryTrend = lastMonthBeneficiaries > 0
            ? Math.round(((newBeneficiariesThisMonth - lastMonthBeneficiaries) / lastMonthBeneficiaries) * 100)
            : newBeneficiariesThisMonth > 0 ? 100 : 0

        const distributionTrend = lastMonthDistributions > 0
            ? Math.round(((totalDistributionsThisMonth - lastMonthDistributions) / lastMonthDistributions) * 100)
            : totalDistributionsThisMonth > 0 ? 100 : 0

        // Stocks to order
        const stocksToOrderFormatted = allStocks
            .filter(s => s.quantity < s.minQuantity * 2)
            .sort((a, b) => a.quantity - b.quantity)
            .slice(0, 3)
            .map(s => ({
                name: s.product.name,
                current: Math.round(s.quantity),
                needed: Math.round(s.minQuantity * 2),
                urgency: s.quantity <= s.minQuantity ? 'critical' : 'warning'
            }))

        return NextResponse.json({
            stats: {
                beneficiaries: {
                    total: totalBeneficiaries,
                    newThisMonth: newBeneficiariesThisMonth,
                    trend: `${beneficiaryTrend >= 0 ? '+' : ''}${beneficiaryTrend}%`
                },
                distributions: {
                    total: totalDistributionsThisMonth,
                    thisWeek: distributionsThisWeek,
                    trend: `${distributionTrend >= 0 ? '+' : ''}${distributionTrend}%`
                },
                stocks: {
                    lowItems: lowStocks,
                    criticalItems: criticalStocks,
                    totalProducts: await prisma.product.count()
                },
                volunteers: {
                    active: activeVolunteers,
                    thisMonth: await prisma.user.count({
                        where: { createdAt: { gte: startOfMonth }, role: { in: ['VOLUNTEER', 'MANAGER'] } }
                    })
                }
            },
            weeklyDistributions: weeklyDistributionsFormatted,
            topProducts: topProductsFormatted,
            recentActivities: recentActivitiesFormatted,
            forecasts: {
                nextWeekDistributions: Math.round(distributionsThisWeek * 1.1) || 5,
                nextWeekBeneficiaries: Math.round(newBeneficiariesThisMonth / 4) || 2,
                stocksToOrder: stocksToOrderFormatted
            },
            expiringLots: expiringLots.map(l => ({
                id: l.id,
                productName: l.product.name,
                quantity: l.quantity,
                expiryDate: l.expiryDate,
                daysUntilExpiry: l.expiryDate ? Math.ceil((l.expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 0
            }))
        })
    } catch (error) {
        console.error('Stats API error:', error)
        return NextResponse.json({ error: 'Erreur lors du chargement des statistiques' }, { status: 500 })
    }
}

function formatTimeAgo(date: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "À l'instant"
    if (diffMins < 60) return `Il y a ${diffMins} min`
    if (diffHours < 24) return `Il y a ${diffHours}h`
    if (diffDays < 7) return `Il y a ${diffDays}j`
    return date.toLocaleDateString('fr-FR')
}
