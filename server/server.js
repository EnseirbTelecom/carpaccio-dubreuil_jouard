const express = require("express")
const app = express()

// Express middleware to parse requests' body
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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
  res.send({"id" : "carpaccio-dubreuil_jouard"});
});
// curl -X GET 'http://localhost:3000/id'


// =================================================
// POST http://localhost:3000/bill/
app.post('/bill', (req, res) => {
  const bill = {
    prices: req.body.prices,
    quantities: req.body.quantities,
  }
  let result = 0;
  for (let i = 0; i < bill.prices.length; i++){
    result += bill.prices[i] * bill.quantities[i];
  }
  res.send({"total":result});
})
// curl -H "Content-Type:application/json" -X POST -d '{"prices":[10,20], "quantities":[1,2]}' http://localhost:3000/bill


// =================================================
// Démarrage du serveur
// =================================================

app.listen(3000, () => {
  console.log("Serveur démarré")
})
