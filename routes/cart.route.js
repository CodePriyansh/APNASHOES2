
const express = require('express');
const userAuth = require('../middleware/userAuth');
const router = express.Router();
const control = require('../controller/cart.ctrl')

//router.get('/cartPage',control.cartPage);

router.get("/add-to-cart/:pid",userAuth.isAuth,control.addToCart);
router.get("/remove-from-cart/:pid",userAuth.isAuth,control.removeFromCart);
router.get("/view-cart",userAuth.isAuth,control.viewCart);
router.get("/get-cart-item-local",userAuth.isAuth,control.getCartItemLocal);
module.exports = router;

module.exports = router;