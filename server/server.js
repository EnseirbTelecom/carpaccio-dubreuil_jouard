const express = require("express")
const app = express()

// Express middleware to parse requests' body
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



// ==================================
// ======      FONCTIONS      =======
// ==================================

// vérifie que tous les paramètres sont ok pour la requete POST
const paramChecker = (req, res, next) => {
	const bill = {
    prices: req.body.prices,
    quantities: req.body.quantities,
  }
	for (let attr in bill) {
		if (bill[attr] === undefined)
			return res.status(400).json({ "error" : "please check input arguments for /bill" })
  }
  if (bill.prices.length != bill.quantities.length) {
    return res.status(400).json({ "error" : "prices and quantities have not the same length for /bill" })
  }
	next()
}



// =================================================
// Les Routes
// =================================================


// =================================================
// GET http://localhost:3000/
app.get('/',(req, res) => {
  res.send('Welcome on the Carpaccio app\nBy Julien DUBREUIL & Maxime JOUARD\n');
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
app.post('/bill', paramChecker, (req, res) => {
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

var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log("Server launched on the %s port", port);
});

module.exports = server;