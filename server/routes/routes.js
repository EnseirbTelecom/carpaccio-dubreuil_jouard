const express = require('express');
const router = express.Router();


const Id = require('../controller/id.js')
const Bill = require('../controller/bill.js')
const bill = new Bill()
const id = new Id()

router.get('/', 
    (req, res, next) => {
        return res.send('Welcome on the Carpaccio app\nBy Julien DUBREUIL & Maxime JOUARD\n');
    }
);
router.get('/id', id.getId);
router.post('/bill', bill.postBill);


module.exports = router;
