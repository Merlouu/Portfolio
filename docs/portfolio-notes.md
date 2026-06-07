# Portfolio Notes

## Repo et deploiement

- Repo GitHub: `https://github.com/Merlouu/Portefolio.git`
- Remote Git local: `origin`
- Branche de travail/deploiement: `main`
- URL Vercel actuelle: `https://portfoliomdebrais-git-main-merlouus-projects.vercel.app/`
- Le projet a ete prepare comme vitrine statique pour Vercel
- `next.config.ts` utilise `output: "export"` et `images.unoptimized: true`
- Les anciennes routes app/API ont ete sorties de `src/app` pour ne garder que la vitrine

## Positionnement

- Nom: `Merlin Debrais`
- Titre principal: `Business Analyst | Supply Chain | Forecasting | Digitalisation`
- Positionnement editorial:
  - profil hybride business + data + operations
  - entre terrain, pilotage et digitalisation
  - transformer des besoins metiers en solutions concretes

## Infos perso a garder

- LinkedIn: `https://www.linkedin.com/in/merlin-debrais-141b03226/`
- Zones: `Valenciennes - Lille - Paris`
- Formation: `INSA`
- Master: `Gestion de la production, logistique, achats`
- Mention a afficher: `Ingenierie de la chaine logistique`
- Contexte pro: `Business Analyst & Forecaster Supply Chain en alternance chez CBA Meubles`

## Structure actuelle du site

- Accueil: `src/app/page.tsx`
- CSS pages projet: `src/app/portfolio.css`
- Route projet: `src/app/projects/[slug]/page.tsx`
- Composant projet: `src/components/project-page.tsx`
- Contenu projets: `src/lib/portfolio-content.ts`

## Projets et angle

### Finance

- Nom affiche: `Finance`
- Angle:
  - socle initial Google Sheets
  - evolution vers un systeme de trading structure
  - stockage, analytique, execution, supervision
- A ne plus appeler `V0`
- Formulation retenue:
  - `socle initial Google Sheets`
  - `projet finance actuel`
- Points forts a conserver:
  - BDD
  - analytique et scoring IA
  - execution automatique sous parametres
  - maintenance assistee
  - detection d'anomalies / erreurs
  - Operator connecte a Telegram
  - bot Telegram de telecommande
- Le projet finance a ete allege visuellement:
  - resume court + detail repliable
  - approche repliable
  - architecture repliable
  - boucle de decision repliable
  - cartes `Projet finance actuel` plus courtes avec `Voir le detail`

### CBA Meubles

- CBA = alternance
- Deux grands axes a raconter:
  - analyses supply chain / pilotage decisionnel
  - automatisation du reporting VBA
- Impacts a garder:
  - `500+` references pilotees en prevision mensuelle
  - `1 300+` references suivies pour la fiabilisation MRP
  - `-65%` sur la maintenance du reporting VBA
- Elements metier a garder:
  - stocks morts
  - archivage et suivi automatise des stocks
  - scraping des prix clients avec alertes promotions sauvages
  - analyse clients / CA N-1 pour cadrer les demandes de prevision
  - process elargi a `5 utilisateurs`

### Van De Walle x Safran Seats

- Projet de stage
- Angle: suivi des encours
- Mots cles:
  - visibilite
  - tracabilite
  - creation / modification / traitement des demandes

### Restaurants

- Projet universitaire
- A presenter comme universitaire, pas comme projet client
- Elements a garder:
  - hierarchie de comptes `Admin / Manager / Volunteer / Beneficiary`
  - `Dashboard et prevision`
  - beneficiaires / distributions / stocks

## Choix design et UX

- L'accueil a ete simplifie pour etre plus premium
- Header accueil:
  - bloc identite a gauche
  - bulles de navigation et actions sur la ligne dessous
- Mobile accueil:
  - header non sticky sur telephone
  - texte et boxes resserres
- Mobile pages projet:
  - header non sticky sur telephone
  - nav de section non collee
  - textes et cartes resserres
- Les images de projets:
  - zoom au survol
  - ouverture en grand au clic
- Pour les modules multi-images:
  - une image visible a la fois
  - fleches gauche/droite
  - la box suit l'image active

## Points encore a ameliorer

- Continuer a simplifier la finance si besoin
- Uniformiser encore le francais/les accents si des coquilles reapparaissent
- Eventuellement mettre une URL Vercel de production plus propre
- Faire une derniere passe mobile si certains blocs paraissent encore trop longs

## Commandes utiles

### Push vers GitHub

```powershell
cd "C:\Users\utilisateur\.gemini\antigravity\scratch\portfolio-vitrine"
git status
git add -A
git commit -m "Update portfolio"
git push origin main
```

### Redeploiement Vercel

- Le projet est connecte a GitHub
- Un `git push origin main` doit declencher le redeploiement

