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

router.get('/MensSection',control.userProductsPage);
router.get('/WomenSection',control.userProductsPage);
router.get('/KidsSection',control.userProductsPage);
router.get('/NewArrival',control.newArrivalPage);


module.exports = router;






module.exports = router;