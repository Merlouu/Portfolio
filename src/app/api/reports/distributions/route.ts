import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')
        const format = searchParams.get('format') || 'csv'

        const whereClause: { createdAt?: { gte?: Date; lte?: Date } } = {}
        if (startDate) {
            whereClause.createdAt = { ...whereClause.createdAt, gte: new Date(startDate) }
        }
        if (endDate) {
            whereClause.createdAt = { ...whereClause.createdAt, lte: new Date(endDate) }
        }

        const distributions = await prisma.distribution.findMany({
            where: whereClause,
            include: {
                beneficiary: true,
                user: true,
                center: true,
                items: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        if (format === 'json') {
            return NextResponse.json({ distributions })
        }

        // Generate CSV
        const csvRows = [
            ['Date', 'Heure', 'Centre', 'Bénéficiaire', 'Bénévole', 'Points utilisés', 'Produits', 'Quantités'].join(';')
        ]

        distributions.forEach(d => {
            const date = new Date(d.createdAt)
            const products = d.items.map(i => i.product.name).join(', ')
            const quantities = d.items.map(i => `${i.quantity} ${i.product.unit}`).join(', ')

            csvRows.push([
                date.toLocaleDateString('fr-FR'),
                date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                d.center.name,
                `${d.beneficiary.firstName} ${d.beneficiary.lastName}`,
                d.user.name,
                d.totalPoints.toString(),
                `"${products}"`,
                `"${quantities}"`
            ].join(';'))
        })

        const csv = csvRows.join('\n')

        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="distributions_${new Date().toISOString().split('T')[0]}.csv"`
            }
        })
    } catch (error) {
        console.error('Export distributions error:', error)
        return NextResponse.json({ error: 'Erreur lors de l\'export' }, { status: 500 })
    }
}
