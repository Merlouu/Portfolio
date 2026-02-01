import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/hygiene/oven-logs - List oven logs
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

        const logs = await prisma.ovenLog.findMany({
            where,
            include: {
                center: true,
                user: {
                    select: { id: true, name: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        })

        return NextResponse.json({ data: logs })
    } catch (error) {
        console.error('Error fetching oven logs:', error)
        return NextResponse.json({ error: 'Erreur lors de la récupération des logs four' }, { status: 500 })
    }
}

// POST /api/hygiene/oven-logs - Create oven log
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            ovenName,
            turnOnTime,
            turnOffTime,
            temperature,
            notes,
            centerId,
            userId
        } = body

        // Validate required fields
        if (!ovenName || !turnOnTime) {
            return NextResponse.json({
                error: 'Nom du four et heure d\'allumage sont requis'
            }, { status: 400 })
        }

        // Auto-resolve center ID - verify it exists or get first available
        let resolvedCenterId = centerId
        let centerExists = false
        if (centerId) {
            const foundCenter = await prisma.center.findUnique({ where: { id: centerId } })
            centerExists = !!foundCenter
        }
        if (!centerExists) {
            const firstCenter = await prisma.center.findFirst()
            if (!firstCenter) {
                return NextResponse.json({ error: 'Aucun centre disponible' }, { status: 400 })
            }
            resolvedCenterId = firstCenter.id
        }

        // Auto-resolve user ID - verify it exists or get first available
        let resolvedUserId = userId
        let userExists = false
        if (userId) {
            const foundUser = await prisma.user.findUnique({ where: { id: userId } })
            userExists = !!foundUser
        }
        if (!userExists) {
            const firstUser = await prisma.user.findFirst({
                where: { centerId: resolvedCenterId }
            })
            if (!firstUser) {
                const anyUser = await prisma.user.findFirst()
                if (!anyUser) {
                    return NextResponse.json({ error: 'Aucun utilisateur disponible' }, { status: 400 })
                }
                resolvedUserId = anyUser.id
            } else {
                resolvedUserId = firstUser.id
            }
        }

        const log = await prisma.ovenLog.create({
            data: {
                ovenName,
                turnOnTime: new Date(turnOnTime),
                turnOffTime: turnOffTime ? new Date(turnOffTime) : null,
                temperature: temperature ? parseInt(temperature) : null,
                notes: notes || null,
                centerId: resolvedCenterId,
                userId: resolvedUserId
            },
            include: {
                center: true,
                user: { select: { id: true, name: true } }
            }
        })

        return NextResponse.json({
            data: log,
            message: 'Log four enregistré avec succès'
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating oven log:', error)
        return NextResponse.json({ error: 'Erreur lors de l\'enregistrement' }, { status: 500 })
    }
}

// PATCH /api/hygiene/oven-logs - Update oven log (to set turn off time)
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json()
        const { id, turnOffTime } = body

        if (!id) {
            return NextResponse.json({ error: 'ID requis' }, { status: 400 })
        }

        const log = await prisma.ovenLog.update({
            where: { id },
            data: {
                turnOffTime: turnOffTime ? new Date(turnOffTime) : new Date()
            },
            include: {
                center: true,
                user: { select: { id: true, name: true } }
            }
        })

        return NextResponse.json({
            data: log,
            message: 'Four éteint'
        })

    } catch (error) {
        console.error('Error updating oven log:', error)
        return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
    }
}
