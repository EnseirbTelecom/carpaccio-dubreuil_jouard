const express = require("express")
const app = express()

// Express middleware to parse requests' body
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const taxList = {"DE":20, "UK": 21, "FR": 20, "IT": 25, "ES": 19, "PL": 21, "RO": 20, "NL": 20, "BE": 24, "EL": 20, "CZ": 19, "PT": 23, "HU": 27, "SE": 23, "AT": 22, "BG": 21, "DK": 21, "FI": 17, "SK": 18,"IE": 21, "HR":23 ,"LT":23 ,"SI":24 ,"LV":20 ,"EE":22 ,"CY":21 ,"LU":25 ,"MT":20}


// ==================================
// ======      FONCTIONS      =======
// ==================================

// vérifie que tous les paramètres sont ok pour la requete POST
const paramChecker = (req, res, next) => {
	const bill = {
    prices: req.body.prices,
    quantities: req.body.quantities,
		country: req.body.country
  }
	for (let attr in bill) {
		if (bill[attr] === undefined)
			return res.status(400).json({ "error" : "please check input arguments for /bill" })
  }
  if (bill.prices.length != bill.quantities.length) {
    return res.status(400).json({ "error" : "prices and quantities have not the same length for /bill" })
  }
	if (!taxList[bill.country]){
		return res.status(400).json({ "error" : "this country does not exist" })
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
		country: req.body.country
  }
  let result = 0;
  for (let i = 0; i < bill.prices.length; i++){
    result += bill.prices[i] * bill.quantities[i];
  }
	result = result * (1 + taxList[bill.country]/100)
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
