
const express = require('express');

const router = express.Router();
const control = require('../controller/cart.ctrl')
const userAuth = require('../middleware/userAuth');



router.get("/add-to-cart/:pid",userAuth.isAuth,control.addToCart);
router.get("/remove-from-cart/:pid",userAuth.isAuth,control.removeFromCart);
router.get("/view-cart",userAuth.isAuth,control.viewCart);
router.get("/get-cart-item-local",userAuth.isAuth,control.getCartItemLocal);

module.exports = router;