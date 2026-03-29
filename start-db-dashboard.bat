@echo off
echo ==========================================
echo    Lancement du Dashboard CoeurSolidaire
echo ==========================================

echo 1. Generation du diagramme SVG...
call npx prisma generate

echo 2. Lancement de Prisma Studio (Donnees)...
start /min cmd /c "npx prisma studio"

echo 3. Attente du demarrage du serveur...
timeout /t 5 >nul

echo 4. Ouverture du Dashboard...
start docs\dashboard.html

echo ==========================================
echo    Tout est pret !
echo    - Onglet 'Donnees' : Voir/Editer les tables
echo    - Onglet 'Modelisation' : Voir le diagramme
echo ==========================================
pause
