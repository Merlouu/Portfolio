import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  // Use absolute path for DB
  const dbPath = path.join(process.cwd(), 'dev.db')
  console.log('🔗 Connecting to database at:', dbPath)

  // Create adapter with URL config (Prisma 7 API)
  const adapter = new PrismaBetterSqlite3({
    url: dbPath
  })

  return new PrismaClient({ adapter } as unknown as ConstructorParameters<typeof PrismaClient>[0])
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
