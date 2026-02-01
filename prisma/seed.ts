import Database from 'better-sqlite3'
import path from 'path'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'

// Use correct path: prisma/dev.db
const dbPath = path.join(process.cwd(), 'dev.db')
const db = new Database(dbPath)

console.log('🌱 Seeding database via raw SQL...')
console.log('📁 Database path:', dbPath)

// Helper to generate IDs
const id = () => randomUUID()

// Password hashing
const hash = (pwd: string) => bcrypt.hashSync(pwd, 10)

try {
    // Clean existing data
    const tables = [
        'StockMovement', 'DistributionItem', 'Distribution', 'Lot', 'Stock',
        'Registration', 'Beneficiary', 'Campaign', 'Product', 'ProductCategory',
        'User', 'Center'
    ]

    // Disable FK constraints for cleanup
    db.exec('PRAGMA foreign_keys = OFF;')
    for (const table of tables) {
        try {
            db.exec(`DELETE FROM "${table}";`)
        } catch (e) {
            console.log(`Table ${table} might not exist or empty`)
        }
    }
    db.exec('PRAGMA foreign_keys = ON;')

    // 1. Centers
    const parisId = id()
    const nordId = id()

    const insertCenter = db.prepare(`INSERT INTO "Center" (id, name, address, city, postalCode, phone, email, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)

    insertCenter.run(parisId, 'Centre Principal - Paris 11ème', '45 Rue de la Roquette', 'Paris', '75011', '01 43 55 12 34', 'paris11@coeursolidaire.org', new Date().toISOString(), new Date().toISOString())
    insertCenter.run(nordId, 'Antenne Nord - Paris 18ème', '12 Rue Marcadet', 'Paris', '75018', '01 42 64 78 90', 'paris18@coeursolidaire.org', new Date().toISOString(), new Date().toISOString())

    console.log('📍 Centers created')

    // 2. Users
    const insertUser = db.prepare(`INSERT INTO "User" (id, email, name, passwordHash, role, centerId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)

    insertUser.run(id(), 'admin@coeursolidaire.org', 'Sophie Martin', hash('admin123'), 'ADMIN', parisId, new Date().toISOString(), new Date().toISOString())
    insertUser.run(id(), 'manager@coeursolidaire.org', 'Pierre Dubois', hash('manager123'), 'MANAGER', parisId, new Date().toISOString(), new Date().toISOString())
    insertUser.run(id(), 'benevole@coeursolidaire.org', 'Marie Lambert', hash('benevole123'), 'VOLUNTEER', parisId, new Date().toISOString(), new Date().toISOString())

    console.log('👤 Users created')

    // 3. Categories (updatedAt removed)
    const insertCat = db.prepare(`INSERT INTO "ProductCategory" (id, name, description, pointsCost, createdAt) VALUES (?, ?, ?, ?, ?)`)

    const catEpicerie = id()
    const catLaitiers = id()
    const catConserves = id()
    const catFrais = id()
    const catHygiene = id()

    insertCat.run(catEpicerie, 'Épicerie', 'Produits alimentaires secs', 2, new Date().toISOString())
    insertCat.run(catLaitiers, 'Produits laitiers', 'Lait, fromage, yaourts', 3, new Date().toISOString())
    insertCat.run(catConserves, 'Conserves', 'Conserves de légumes et viandes', 2, new Date().toISOString())
    insertCat.run(catFrais, 'Produits frais', 'Fruits et légumes', 4, new Date().toISOString())
    insertCat.run(catHygiene, 'Hygiène', 'Produits d\'hygiène et entretien', 3, new Date().toISOString())

    console.log('📦 Categories created')

    // 4. Products
    const insertProd = db.prepare(`INSERT INTO "Product" (id, name, unit, categoryId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`)
    const products = [
        { id: id(), name: 'Pâtes (500g)', unit: 'paquet', cat: catEpicerie },
        { id: id(), name: 'Riz (1kg)', unit: 'paquet', cat: catEpicerie },
        { id: id(), name: 'Huile de tournesol (1L)', unit: 'bouteille', cat: catEpicerie },
        { id: id(), name: 'Sucre (1kg)', unit: 'paquet', cat: catEpicerie },
        { id: id(), name: 'Farine (1kg)', unit: 'paquet', cat: catEpicerie },
        { id: id(), name: 'Café moulu (250g)', unit: 'paquet', cat: catEpicerie },
        { id: id(), name: 'Lait UHT (1L)', unit: 'bouteille', cat: catLaitiers },
        { id: id(), name: 'Beurre (250g)', unit: 'plaquette', cat: catLaitiers },
        { id: id(), name: 'Yaourts nature (x4)', unit: 'lot', cat: catLaitiers },
        { id: id(), name: 'Conserve de légumes (400g)', unit: 'boîte', cat: catConserves },
        { id: id(), name: 'Conserve de thon (200g)', unit: 'boîte', cat: catConserves },
        { id: id(), name: 'Savon (200g)', unit: 'pain', cat: catHygiene },
        { id: id(), name: 'Dentifrice', unit: 'tube', cat: catHygiene },
    ]

    for (const p of products) {
        insertProd.run(p.id, p.name, p.unit, p.cat, new Date().toISOString(), new Date().toISOString())
    }

    console.log('🛒 Products created')

    // 5. Stocks & Lots
    // Stock: removed createdAt, kept updatedAt
    const insertStock = db.prepare(`INSERT INTO "Stock" (id, productId, centerId, quantity, minQuantity, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`)

    // Lot: removed createdAt/updatedAt, using receivedDate
    const insertLot = db.prepare(`INSERT INTO "Lot" (id, productId, stockId, batchNumber, quantity, expiryDate, source, receivedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)

    for (const p of products) {
        const stockId = id()
        const qty = Math.floor(Math.random() * 100) + 20

        insertStock.run(stockId, p.id, parisId, qty, 20, new Date().toISOString())

        // 90 days expiry
        const expiry = new Date()
        expiry.setDate(expiry.getDate() + 90)

        insertLot.run(id(), p.id, stockId, `LOT-${Date.now()}-${Math.floor(Math.random() * 1000)}`, qty, expiry.toISOString(), 'Donation SQL', new Date().toISOString())
    }

    console.log('📊 Stocks created')

    // 6. Campaign
    const campId = id()
    const insertCamp = db.prepare(`INSERT INTO "Campaign" (id, name, description, startDate, endDate, centerId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    insertCamp.run(campId, 'Campagne Hiver 2026', 'Aide alimentaire', '2026-01-01T00:00:00Z', '2026-03-31T00:00:00Z', parisId, new Date().toISOString(), new Date().toISOString())

    // 7. Beneficiaries
    const insertBen = db.prepare(`INSERT INTO "Beneficiary" (id, firstName, lastName, email, phone, address, city, postalCode, householdSize, adultsCount, childrenCount, pointsBalance, centerId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    const insertReg = db.prepare(`INSERT INTO "Registration" (id, beneficiaryId, campaignId, status, approvedAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`)

    const bens = [
        { fn: 'Ahmed', ln: 'Rahmani', email: 'ahmed@email.com', hh: 4, a: 2, c: 2, pts: 45 },
        { fn: 'Marie', ln: 'Dupont', email: 'marie@email.com', hh: 2, a: 2, c: 0, pts: 30 },
        { fn: 'Fatima', ln: 'Ben Ali', email: 'fatima@email.com', hh: 5, a: 2, c: 3, pts: 55 },
        { fn: 'Jean', ln: 'Martin', email: 'jean@email.com', hh: 1, a: 1, c: 0, pts: 20 },
    ]

    for (const b of bens) {
        const benId = id()
        insertBen.run(benId, b.fn, b.ln, b.email, '0123456789', '45 Rue de la Roquette', 'Paris', '75011', b.hh, b.a, b.c, b.pts, parisId, new Date().toISOString(), new Date().toISOString())
        insertReg.run(id(), benId, campId, 'APPROVED', new Date().toISOString(), new Date().toISOString(), new Date().toISOString())
    }

    console.log('✅ SQL Seeding completed!')

} catch (e) {
    console.error('❌ SQL Seeding failed:', e)
    process.exit(1)
}
