# IT 340 - TP 3 - Carpaccio

Une API de calcul de prix.

## Groupe
- Julien DUBREUIL
- Maxime JOUARD

## Installation
- Lancer `npm install` avant de faire tourner le code. 
- Lancer le serveur avec la commande `npm start`.
- Lancer le test des fonctionnalités avec la commande `npm test`.

## Fonctionnalités
- La requête GET /id renvoie l'id de notre projet: {id: 'carpaciao-dubreuil_jouard'}.
- La requête POST /bill prend dans le body un tableau quantities, un tableau prices et une chaîne de caractère country et renvoie le prix total de quantities*prices en appliquant la taxe associée au pays country. En cas d'argument manquant, de tableaux de tailles différentes, ou de pays non existant, un status 400 est envoyé avec l'erreur associée.
