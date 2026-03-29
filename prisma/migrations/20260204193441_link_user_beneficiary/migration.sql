/*
  Warnings:

  - Added the required column `centerId` to the `Distribution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `DistributionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockId` to the `StockMovement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "OvenLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ovenName" TEXT NOT NULL,
    "turnOnTime" DATETIME NOT NULL,
    "turnOffTime" DATETIME,
    "temperature" INTEGER,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "centerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "OvenLog_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OvenLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TemperatureLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dishName" TEXT NOT NULL,
    "temperature" REAL NOT NULL,
    "checkType" TEXT NOT NULL,
    "isCompliant" BOOLEAN NOT NULL DEFAULT true,
    "measuredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "centerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TemperatureLog_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TemperatureLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Beneficiary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" DATETIME,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "householdSize" INTEGER NOT NULL DEFAULT 1,
    "adultsCount" INTEGER NOT NULL DEFAULT 1,
    "childrenCount" INTEGER NOT NULL DEFAULT 0,
    "monthlyIncome" REAL,
    "socialStatus" TEXT,
    "pointsBalance" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "centerId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Beneficiary_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Beneficiary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Beneficiary" ("address", "adultsCount", "centerId", "childrenCount", "city", "createdAt", "dateOfBirth", "email", "firstName", "householdSize", "id", "isActive", "lastName", "monthlyIncome", "phone", "pointsBalance", "postalCode", "socialStatus", "updatedAt") SELECT "address", "adultsCount", "centerId", "childrenCount", "city", "createdAt", "dateOfBirth", "email", "firstName", "householdSize", "id", "isActive", "lastName", "monthlyIncome", "phone", "pointsBalance", "postalCode", "socialStatus", "updatedAt" FROM "Beneficiary";
DROP TABLE "Beneficiary";
ALTER TABLE "new_Beneficiary" RENAME TO "Beneficiary";
CREATE UNIQUE INDEX "Beneficiary_userId_key" ON "Beneficiary"("userId");
CREATE TABLE "new_Distribution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "beneficiaryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    CONSTRAINT "Distribution_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "Beneficiary" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Distribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Distribution_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Distribution" ("beneficiaryId", "createdAt", "id", "notes", "totalPoints", "userId") SELECT "beneficiaryId", "createdAt", "id", "notes", "totalPoints", "userId" FROM "Distribution";
DROP TABLE "Distribution";
ALTER TABLE "new_Distribution" RENAME TO "Distribution";
CREATE TABLE "new_DistributionItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" REAL NOT NULL,
    "pointsCost" INTEGER NOT NULL,
    "distributionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "DistributionItem_distributionId_fkey" FOREIGN KEY ("distributionId") REFERENCES "Distribution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DistributionItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DistributionItem" ("distributionId", "id", "pointsCost", "quantity") SELECT "distributionId", "id", "pointsCost", "quantity" FROM "DistributionItem";
DROP TABLE "DistributionItem";
ALTER TABLE "new_DistributionItem" RENAME TO "DistributionItem";
CREATE TABLE "new_StockMovement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lotId" TEXT,
    "stockId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "distributionId" TEXT,
    CONSTRAINT "StockMovement_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "StockMovement_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StockMovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StockMovement_distributionId_fkey" FOREIGN KEY ("distributionId") REFERENCES "Distribution" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_StockMovement" ("createdAt", "distributionId", "id", "lotId", "quantity", "reason", "type", "userId") SELECT "createdAt", "distributionId", "id", "lotId", "quantity", "reason", "type", "userId" FROM "StockMovement";
DROP TABLE "StockMovement";
ALTER TABLE "new_StockMovement" RENAME TO "StockMovement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
