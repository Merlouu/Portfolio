import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// HACCP temperature thresholds
const HACCP_THRESHOLDS = {
    RECEPTION_COLD: 4,      // Produits frais: ≤ 4°C
    RECEPTION_FROZEN: -18,  // Surgelés: ≤ -18°C
    STORAGE: 4,             // Stockage: ≤ 4°C
    SERVICE: 63,            // Service chaud: ≥ 63°C
    COOLING_START: 63,      // Refroidissement: de 63°C
    COOLING_END: 10         // à 10°C en < 2h
}

function checkCompliance(temperature: number, checkType: string): boolean {
    switch (checkType) {
        case 'RECEPTION':
            return temperature <= HACCP_THRESHOLDS.RECEPTION_COLD
        case 'STOCKAGE':
            return temperature <= HACCP_THRESHOLDS.STORAGE
        case 'SERVICE':
            return temperature >= HACCP_THRESHOLDS.SERVICE
        case 'REFROIDISSEMENT':
            return temperature <= HACCP_THRESHOLDS.COOLING_END
        default:
            return true
    }
}

// GET /api/hygiene/temperature-logs - List temperature logs
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const centerId = searchParams.get('centerId') || ''
        const date = searchParams.get('date') || ''
        const checkType = searchParams.get('checkType') || ''
        const onlyNonCompliant = searchParams.get('nonCompliant') === 'true'

        const where: Record<string, unknown> = {}

        if (centerId) {
            where.centerId = centerId
        }

        if (checkType) {
            where.checkType = checkType
        }

        if (onlyNonCompliant) {
            where.isCompliant = false
        }

        if (date) {
            const startOfDay = new Date(date)
            startOfDay.setHours(0, 0, 0, 0)
            const endOfDay = new Date(date)
            endOfDay.setHours(23, 59, 59, 999)

            where.measuredAt = {
                gte: startOfDay,
                lte: endOfDay
            }
        }

        const logs = await prisma.temperatureLog.findMany({
            where,
            include: {
                center: true,
                user: {
                    select: { id: true, name: true }
                }
            },
            orderBy: { measuredAt: 'desc' },
            take: 100
        })

        return NextResponse.json({ data: logs })
    } catch (error) {
        console.error('Error fetching temperature logs:', error)
        return NextResponse.json({ error: 'Erreur lors de la récupération des relevés' }, { status: 500 })
    }
}

// POST /api/hygiene/temperature-logs - Create temperature log
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            dishName,
            temperature,
            checkType,
            notes,
            centerId,
            userId
        } = body

        // Validate required fields
        if (!dishName || temperature === undefined || !checkType) {
            return NextResponse.json({
                error: 'Nom du plat, température et type de contrôle sont requis'
            }, { status: 400 })
        }

        // Validate check type
        const validTypes = ['RECEPTION', 'STOCKAGE', 'SERVICE', 'REFROIDISSEMENT']
        if (!validTypes.includes(checkType)) {
            return NextResponse.json({
                error: 'Type de contrôle invalide'
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

        // Auto-check HACCP compliance
        const temp = parseFloat(temperature)
        const isCompliant = checkCompliance(temp, checkType)

        const log = await prisma.temperatureLog.create({
            data: {
                dishName,
                temperature: temp,
                checkType,
                isCompliant,
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
            message: isCompliant
                ? 'Relevé enregistré - Conforme HACCP'
                : '⚠️ Relevé enregistré - NON CONFORME HACCP'
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating temperature log:', error)
        return NextResponse.json({ error: 'Erreur lors de l\'enregistrement' }, { status: 500 })
    }
}
