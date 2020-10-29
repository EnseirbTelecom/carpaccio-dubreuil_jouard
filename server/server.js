const express = require("express")
const app = express()

const products = []

// =================================================
// Les Routes
// =================================================

// =================================================
// GET http://localhost:3000/
app.get('/',(req, res) => {
  res.send('Bienvenue sur l\'application Carpaccio \nPar Julien DUBREUIL & Maxime JOUARD\n');
});
// curl -X GET 'http://localhost:3000/'

// =================================================
// GET http://localhost:3000/id
app.get('/id',(req, res) => {
  res.send('{"id" : "carpaccio-dubreuil_jouard"}\n');
});



// =================================================
// Démarrage du serveur
// =================================================

app.listen(3000, () => {
  console.log("Serveur démarré")
})
