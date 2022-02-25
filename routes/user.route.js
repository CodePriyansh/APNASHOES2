const express = require('express');

const router = express.Router();
const control = require('../controller/user.ctrl')

router.get('/',control.userHomePage);
router.get('/userLogin',control.userLoginPage);
router.get('/user-register',control.userRegisterPage);

router.get('/MensSection',control.userProductsPage);
router.get('/WomenSection',control.userProductsPage);
router.get('/KidsSection',control.userProductsPage);
router.get('/NewArrival',control.newArrivalPage);

module.exports = router;