const express = require('express');

const router = express.Router();
const control = require('../controller/user.ctrl')

router.get('/',control.userHomePage);
router.get('/userLogin',control.userLoginPage);
router.post('/userLogin',control.userLoginPost);

router.get('/user-register',control.userRegisterPage);
router.post('/user-register',control.userRegisterPost);
router.get("/signout",control.signout);
router.post("/sendQuery",control.sendMail);

router.get('/MensSection',control.MensProductsPage);
router.get('/WomenSection',control.WomenProductsPage);
router.get('/KidsSection',control.KidsProductsPage);
router.get('/NewArrival',control.NewProductsPage);

module.exports = router;