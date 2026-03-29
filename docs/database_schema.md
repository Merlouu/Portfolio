# Modélisation de la Base de Données - CoeurSolidaire

Voici le diagramme Entité-Relation (ERD) généré à partir de votre fichier `prisma/schema.prisma`. Il montre les tables, les clés primaires (PK), les clés étrangères (FK) et les relations entre les tables.

```mermaid
erDiagram
    User {
        String id PK
        String email UK
        String name
        String passwordHash
        String role "VOLUNTEER"
        String phone
        DateTime createdAt
        DateTime updatedAt
        Boolean isActive
        String centerId FK
    }

    Center {
        String id PK
        String name
        String address
        String city
        String postalCode
        String phone
        String email
        Boolean isActive
        DateTime createdAt
        DateTime updatedAt
    }

    Campaign {
        String id PK
        String name
        String description
        DateTime startDate
        DateTime endDate
        Boolean isActive
        DateTime createdAt
        DateTime updatedAt
        String centerId FK
    }

    Beneficiary {
        String id PK
        String firstName
        String lastName
        DateTime dateOfBirth
        String phone
        String email
        String address
        String city
        String postalCode
        Int householdSize
        Int adultsCount
        Int childrenCount
        Float monthlyIncome
        String socialStatus
        Int pointsBalance
        Boolean isActive
        DateTime createdAt
        DateTime updatedAt
        String centerId FK
        String userId FK "UK"
    }

    Registration {
        String id PK
        String status "PENDING"
        String notes
        DateTime createdAt
        DateTime updatedAt
        DateTime approvedAt
        String beneficiaryId FK
        String campaignId FK
    }

    ProductCategory {
        String id PK
        String name UK
        String description
        Int pointsCost
        DateTime createdAt
    }

    Product {
        String id PK
        String name
        String description
        String unit "unité"
        Int pointsCost
        Boolean isActive
        DateTime createdAt
        DateTime updatedAt
        String categoryId FK
    }

    Stock {
        String id PK
        Float quantity
        Float minQuantity
        DateTime updatedAt
        String centerId FK
        String productId FK
    }

    Lot {
        String id PK
        String batchNumber
        Float quantity
        DateTime expiryDate
        DateTime receivedDate
        String source
        String notes
        String productId FK
        String stockId FK
    }

    StockMovement {
        String id PK
        String type
        Float quantity
        String reason
        DateTime createdAt
        String lotId FK
        String stockId FK
        String userId FK
        String distributionId FK
    }

    Distribution {
        String id PK
        Int totalPoints
        String notes
        DateTime createdAt
        String beneficiaryId FK
        String userId FK
        String centerId FK
    }

    DistributionItem {
        String id PK
        Float quantity
        Int pointsCost
        String distributionId FK
        String productId FK
    }

    OvenLog {
        String id PK
        String ovenName
        DateTime turnOnTime
        DateTime turnOffTime
        Int temperature
        String notes
        DateTime createdAt
        String centerId FK
        String userId FK
    }

    TemperatureLog {
        String id PK
        String dishName
        Float temperature
        String checkType
        Boolean isCompliant
        DateTime measuredAt
        String notes
        String centerId FK
        String userId FK
    }

    %% Relations
    User }|--|| Center : "appartient à"
    User ||--o| Beneficiary : "est lié à"
    
    Campaign }|--|| Center : "organisée par"
    
    Beneficiary }|--|| Center : "inscrit à"
    
    Registration }|--|| Beneficiary : "concerne"
    Registration }|--|| Campaign : "pour"

    Product }|--|| ProductCategory : "catégorie"

    Stock }|--|| Center : "localisé au"
    Stock }|--|| Product : "contient"

    Lot }|--|| Product : "de type"
    Lot }|--|| Stock : "stocké dans"

    StockMovement }|--o| Lot : "concerne"
    StockMovement }|--|| Stock : "affecte"
    StockMovement }|--|| User : "enregistré par"
    StockMovement }|--o| Distribution : "lié à"

    Distribution }|--|| Beneficiary : "pour"
    Distribution }|--|| User : "distribué par"
    Distribution }|--|| Center : "au centre"

    DistributionItem }|--|| Distribution : "article de"
    DistributionItem }|--|| Product : "produit"

    OvenLog }|--|| Center : "au centre"
    OvenLog }|--|| User : "enregistré par"

    TemperatureLog }|--|| Center : "au centre"
    TemperatureLog }|--|| User : "enregistré par"
```
