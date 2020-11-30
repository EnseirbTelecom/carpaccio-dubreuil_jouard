const express = require("express")
const app = express()
const routes = require('./routes/routes.js')
// Express middleware to parse requests' body
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))




// =================================================
// GET http://localhost:3000/
app.use('/', routes);

// curl -X GET 'http://localhost:3000/'



// =================================================
// POST http://localhost:3000/bill/

// curl -H "Content-Type:application/json" -X POST -d '{"prices":[10,20], "quantities":[1,2]}' http://localhost:3000/bill


// =================================================
// Démarrage du serveur
// =================================================

var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log("Server launched on the %s port", port);
});

module.exports = server;
