import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products - List all products
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const categoryId = searchParams.get('categoryId') || ''

        const where: Record<string, unknown> = {}

        if (categoryId) {
            where.categoryId = categoryId
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                category: true,
                stocks: true
            },
            orderBy: { name: 'asc' }
        })

        return NextResponse.json({ data: products })
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json({ error: 'Erreur lors de la récupération des produits' }, { status: 500 })
    }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            name,
            description,
            categoryId,
            unit,
            pointsCost
        } = body

        // Validate required fields
        if (!name || !categoryId) {
            return NextResponse.json({ error: 'Le nom et la catégorie du produit sont requis' }, { status: 400 })
        }

        // Create product
        const product = await prisma.product.create({
            data: {
                name,
                description: description || null,
                categoryId,
                unit: unit || 'unité',
                pointsCost: pointsCost || null
            },
            include: {
                category: true
            }
        })

        return NextResponse.json({
            data: product,
            message: 'Produit créé avec succès'
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json({ error: 'Erreur lors de la création du produit' }, { status: 500 })
    }
}
