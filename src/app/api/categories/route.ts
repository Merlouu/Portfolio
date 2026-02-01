import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/categories - List all product categories
export async function GET() {
    try {
        const categories = await prisma.productCategory.findMany({
            include: {
                products: true
            },
            orderBy: { name: 'asc' }
        })

        return NextResponse.json({ data: categories })
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({ error: 'Erreur lors de la récupération des catégories' }, { status: 500 })
    }
}

// POST /api/categories - Create a new category
export async function POST(request: Request) {
    try {
        const body = await request.json()

        const { name, description, pointsCost } = body

        if (!name) {
            return NextResponse.json({ error: 'Le nom de la catégorie est requis' }, { status: 400 })
        }

        const category = await prisma.productCategory.create({
            data: {
                name,
                description: description || null,
                pointsCost: pointsCost || 1
            }
        })

        return NextResponse.json({
            data: category,
            message: 'Catégorie créée avec succès'
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating category:', error)
        return NextResponse.json({ error: 'Erreur lors de la création de la catégorie' }, { status: 500 })
    }
}
