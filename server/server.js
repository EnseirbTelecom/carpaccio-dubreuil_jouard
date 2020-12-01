const express = require("express")
const app = express()
const routes = require('./routes/routes.js')


// Express middleware to parse requests' body
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// Routes
app.use('/', routes);


// Launching server
var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log("Server launched on the %s port", port);
});

module.exports = server;
