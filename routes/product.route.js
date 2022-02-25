const control = require('../controller/product.ctrl'); 
const express  = require('express');
const multer = require('multer');
const upload = multer({dest: 'public/images'});
const router = express.Router();
const auth = require('../middleware/auth');

router.get("/edit-product/:id",auth.isAuth,control.editProduct);
router.post("/edit-product/:id",auth.isAuth,control.editProductPost);
router.get("/delete-product/:id",auth.isAuth,control.deleteProduct);
router.get("/product-list",auth.isAuth,control.productListPage);
router.get("/add-product",auth.isAuth,control.addProductPage);
router.post("/add-product",auth.isAuth,upload.array('productImages'),control.saveProduct);
module.exports = router;