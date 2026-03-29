import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Connecting...')
        const beneficiaries = await prisma.beneficiary.findMany({ take: 5 })
        fs.writeFileSync('success.txt', JSON.stringify(beneficiaries, null, 2))
        console.log('Success')
    } catch (e: any) {
        console.error('Error:', e)
        fs.writeFileSync('error.log', JSON.stringify(e, null, 2) + '\n' + e.toString())
    } finally {
        await prisma.$disconnect()
    }
}

main()
