import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('q')?.toLowerCase() || ''

        if (query.length < 2) {
            return NextResponse.json({ results: [] })
        }

        // Search beneficiaries
        const beneficiaries = await prisma.beneficiary.findMany({
            where: {
                OR: [
                    { firstName: { contains: query } },
                    { lastName: { contains: query } },
                    { email: { contains: query } }
                ],
                isActive: true
            },
            take: 5
        })

        // Search products
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { description: { contains: query } }
                ],
                isActive: true
            },
            include: { category: true },
            take: 5
        })

        // Format results
        const results = [
            ...beneficiaries.map(b => ({
                type: 'beneficiary' as const,
                id: b.id,
                title: `${b.firstName} ${b.lastName}`,
                subtitle: `Bénéficiaire • ${b.email || 'Pas d\'email'}`,
                icon: '👤',
                href: `/beneficiaries/${b.id}`
            })),
            ...products.map(p => ({
                type: 'product' as const,
                id: p.id,
                title: p.name,
                subtitle: `Produit • ${p.category.name}`,
                icon: '📦',
                href: `/stocks?product=${p.id}`
            }))
        ]

        return NextResponse.json({ results })
    } catch (error: unknown) {
        console.error('Search API error:', error)
        return NextResponse.json({ error: 'Erreur lors de la recherche' }, { status: 500 })
    }
}
