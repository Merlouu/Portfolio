import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')
        const format = searchParams.get('format') || 'csv'

        const whereClause: { measuredAt?: { gte?: Date; lte?: Date } } = {}
        if (startDate) {
            whereClause.measuredAt = { ...whereClause.measuredAt, gte: new Date(startDate) }
        }
        if (endDate) {
            whereClause.measuredAt = { ...whereClause.measuredAt, lte: new Date(endDate) }
        }

        // Get temperature logs
        const temperatureLogs = await prisma.temperatureLog.findMany({
            where: whereClause,
            include: {
                center: true,
                user: true
            },
            orderBy: { measuredAt: 'desc' }
        })

        // Get oven logs
        const ovenWhereClause: { turnOnTime?: { gte?: Date; lte?: Date } } = {}
        if (startDate) {
            ovenWhereClause.turnOnTime = { ...ovenWhereClause.turnOnTime, gte: new Date(startDate) }
        }
        if (endDate) {
            ovenWhereClause.turnOnTime = { ...ovenWhereClause.turnOnTime, lte: new Date(endDate) }
        }

        const ovenLogs = await prisma.ovenLog.findMany({
            where: ovenWhereClause,
            include: {
                center: true,
                user: true
            },
            orderBy: { turnOnTime: 'desc' }
        })

        if (format === 'json') {
            return NextResponse.json({ temperatureLogs, ovenLogs })
        }

        // Generate CSV with HACCP compliance report
        const csvRows = [
            '=== RAPPORT HACCP ===',
            `Date du rapport: ${new Date().toLocaleDateString('fr-FR')}`,
            `Période: ${startDate || 'Début'} - ${endDate || 'Fin'}`,
            '',
            '=== RELEVÉS DE TEMPÉRATURE ===',
            ['Date', 'Heure', 'Centre', 'Plat', 'Type contrôle', 'Température (°C)', 'Conforme', 'Opérateur', 'Notes'].join(';')
        ]

        temperatureLogs.forEach(log => {
            const date = new Date(log.measuredAt)
            csvRows.push([
                date.toLocaleDateString('fr-FR'),
                date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                log.center.name,
                log.dishName,
                log.checkType,
                log.temperature.toString(),
                log.isCompliant ? 'OUI' : 'NON',
                log.user.name,
                `"${log.notes || ''}"`
            ].join(';'))
        })

        csvRows.push('')
        csvRows.push('=== REGISTRE DES FOURS ===')
        csvRows.push(['Date', 'Four', 'Heure allumage', 'Heure extinction', 'Durée (h)', 'Temp. cible (°C)', 'Opérateur'].join(';'))

        ovenLogs.forEach(log => {
            const turnOn = new Date(log.turnOnTime)
            const turnOff = log.turnOffTime ? new Date(log.turnOffTime) : null
            const duration = turnOff
                ? ((turnOff.getTime() - turnOn.getTime()) / 3600000).toFixed(1)
                : 'En cours'

            csvRows.push([
                turnOn.toLocaleDateString('fr-FR'),
                log.ovenName,
                turnOn.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                turnOff ? turnOff.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '-',
                duration,
                log.temperature?.toString() || '-',
                log.user.name
            ].join(';'))
        })

        // Summary
        const nonCompliantCount = temperatureLogs.filter(l => !l.isCompliant).length
        csvRows.push('')
        csvRows.push('=== RÉSUMÉ ===')
        csvRows.push(`Total relevés température: ${temperatureLogs.length}`)
        csvRows.push(`Non conformes: ${nonCompliantCount}`)
        csvRows.push(`Taux de conformité: ${temperatureLogs.length > 0 ? ((temperatureLogs.length - nonCompliantCount) / temperatureLogs.length * 100).toFixed(1) : 0}%`)
        csvRows.push(`Total enregistrements fours: ${ovenLogs.length}`)

        const csv = csvRows.join('\n')

        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="rapport_haccp_${new Date().toISOString().split('T')[0]}.csv"`
            }
        })
    } catch (error) {
        console.error('Export HACCP error:', error)
        return NextResponse.json({ error: 'Erreur lors de l\'export' }, { status: 500 })
    }
}
