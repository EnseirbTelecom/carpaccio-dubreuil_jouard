const express = require('express');
const router = express.Router();

// Express middleware to parse requests' body
const bodyParser = require("body-parser")
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const Id = require('../controller/id.js')
const Bill = require('../controller/bill.js')
const bill = new Bill()
const id = new Id()

router.get('/',
  (req, res, next) => {
    return res.send('Welcome on the Carpaccio app\nBy Julien DUBREUIL & Maxime JOUARD\n');
  }
);

router.get('/id',
  (req, res, next) => {
    return res.send(id.getId());
  }
);

router.post('/bill',
  async (req, res, next) => {
    const billArguments = {
      prices: req.body.prices,
      quantities: req.body.quantities,
      country: req.body.country
    }
    const result = await bill.postBill(billArguments)
    if (result.error){
      return res.status(400).send(result);
    } else {
      return res.status(200).send(result);
    }
  }
);

module.exports = router;
