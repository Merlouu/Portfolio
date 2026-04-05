<h1 align="center">Fiche de Révision - Architecture de la Base de Données</h1>
<br/>

**Objectif de la BDD :** Modéliser et stocker les flux d'informations d'un centre de distribution (Gestion des Bénéficiaires, des Mouvements de Stock, des Distributions et de la Traçabilité Sanitaire).

<br/>

## 1. Vue d'Ensemble du Schéma Relationnel
- **Moteur SGBD :** Système Relationnel (SQLite).
- **Taille :** 14 tables connectées par clés primaires et clés étrangères.
- **Types d'ID :** Utilisation d'identifiants uniques CUID (Crash-safe Unique Identifiers) pour les clés primaires (PK) afin d'éviter les collisions.

---

## 2. Les Entités Principales et Leurs Cardinalités
Ici, nous expliquons comment les tables communiquent entre elles (les relations 1:N).

> **A. Les Acteurs (Bénévoles / Centres)**
> - `Center` (1) possède (N) `User`. (Relation : 1:N).
> - La clé étrangère (FK) `centerId` est présente dans la table `User`.

> **B. Le Parcours du Bénéficiaire**
> - `Beneficiary` (1) participe à (N) `Registration` pour s'inscrire à une `Campaign`.
> - Un bénéficiaire possède un **solde de points (`pointsBalance`)** qu'il va dépenser lors des distributions.
> - Contrainte : Un bénéficiaire ne peut s'inscrire qu'**une seule fois** par campagne (Contrainte `UNIQUE` sur `beneficiaryId` + `campaignId`).

> **C. La Gestion Logistique et la Traçabilité (Le plus important)**
> - `Product` (1) est répertorié physiquement dans (N) `Stock`.
> - `Stock` (1) est sous-divisé en (N) `Lot`. C'est l'exigence de traçabilité HACCP qui l'oblige, pour suivre précisément les "Dates Limites de Consommation (DLC)" d'un lot spécifique.
> - `StockMovement` est une **table d'historisation**. Elle enregistre CHAQUE mouvement (Type : ENTRY, EXIT, LOSS).

> **D. La Distribution (Le cycle de vie du "Panier")**
> - `Distribution` (1) contient (N) `DistributionItem` (Relation 1:N).
> - Une distribution lie à la fois un `Beneficiary` (qui le reçoit), un `User` (qui la donne) et un `Center` (le lieu).

---

## 3. Les Requêtes SQL Essentiels (Fonctionnement Interne)

Pour comprendre comment le code manipule la base, voici les logiques en langage SQL :

**A. Obtenir le stock actuel d'un centre (Jointure)**
```sql
SELECT p.name, s.quantity, s.minQuantity 
FROM Stock s
JOIN Product p ON s.productId = p.id
WHERE s.centerId = 'ID_DU_CENTRE';
```

**B. Lister l'historique de distribution d'un bénéficiaire**
```sql
SELECT d.createdAt, d.totalPoints, di.quantity, p.name
FROM Distribution d
JOIN DistributionItem di ON d.id = di.distributionId
JOIN Product p ON di.productId = p.id
WHERE d.beneficiaryId = 'ID_DU_BENEFICIAIRE';
```

**C. Effectuer une distribution en base de données (La notion de Transaction)**
Une distribution est une action complexe qui nécessite plusieurs requêtes liées. C'est ce qu'on appelle une **Transaction Atomique** (soit tout passe, soit tout annule avec un `ROLLBACK`) :
1. `INSERT INTO Distribution ...` *(On crée le panier global)*
2. `INSERT INTO DistributionItem ...` *(On ajoute les articles au panier)*
3. `INSERT INTO StockMovement (type: 'EXIT')` *(On trace la sortie légale du stock)*
4. `UPDATE Stock SET quantity = quantity - X` *(On diminue le vrai stock global)*
5. `UPDATE Beneficiary SET pointsBalance = pointsBalance - X` *(On diminue les points du bénéficiaire)*

---

## 4. Règles de Gestion et Contraintes Imposées à la BDD
- **Intégrité Référentielle strictes :** Si on supprime un bénéficiaire de la BDD, les distributions liées pourraient poser problème. La BDD applique donc des relations strictes pour empêcher de supprimer un produit s'il est utilisé dans un `Stock`.
- **Règles Temporelles :** Utilisation massive de colonnes `createdAt` et `updatedAt` gérées nativement par la BDD pour prouver "qui a fait quoi et quand" (crucial pour l'hygiène).
- **Logique Métier interne :** Tous les chiffres critiques (Quantité de stock, Coût en points, Température) sont stockés sous forme stricte (`Int` ou `Float`) et gérés dynamiquement plutôt que codés en dur.
