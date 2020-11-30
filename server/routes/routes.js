const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js')
router.get('/', controller.getId);
router.post('/bill', controller.postBill);
module.exports = router;
