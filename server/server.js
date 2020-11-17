const express = require("express")
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
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
app.use(cors())
app.use(bodyParser.json());
// =================================================
// POST http://localhost:3000/bill/
app.post('/bill', (req, res) => {
  console.log(req.body);
  res.send('{"res":"ok"}')
  // const bill = {
  //   price: req.body.price,
  //   quantities: req.body.quantities,
  // }
  //     .then(res => res.json(bill));
  //     console.log(res);
  // return {}
})
/*
curl -i -H "Content-Type:application/json" -X POST -d '{"price":"1", "quantities":"1"}' http://localhost:3000/bill
*/

// =================================================
// Démarrage du serveur
// =================================================

app.listen(3000, () => {
  console.log("Serveur démarré")
})
