
const express = require('express');

const router = express.Router();
const control = require('../controller/cart.ctrl')

router.get('/cartPage',control.cartPage);

module.exports = router;