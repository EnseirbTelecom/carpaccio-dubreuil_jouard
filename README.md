# IT 340 - TP 3 - Carpaccio

Une API de calcul de prix.

## Groupe
- Julien DUBREUIL
- Maxime JOUARD

## Installation
- Lancer `npm install` avant de faire tourner le code. 
- Lancer le serveur avec la commande `npm start`.
- Lancer le test des fonctionnalités avec la commande `npm test`.

## Fonctionnement lors du developpement
Semantic Versioning Specification : 
- Patch version Z (x.y.Z | x > 0) : commencer le message du commit avec `fix:`
- Minor version Y (x.Y.z | x > 0) : commencer le message du commit avec `feat:`
- Major version X (X.y.z | X > 0) : commencer le message du commit avec `BREAKING CHANGE:`

Pour fermer l'issue X, écrire dans le message du commit  `close #X`.

## Fonctionnalités
- La requête GET /id renvoie l'id de notre projet: {id: 'carpaciao-dubreuil_jouard'}.
- La requête POST /bill prend dans le body un tableau quantities, un tableau prices et une chaîne de caractère country et renvoie le prix total en appliquant la taxe associée au pays country. En cas d'argument manquant, de tableaux de tailles différentes, ou de pays non existant, un status 400 est envoyé avec l'erreur associée.
