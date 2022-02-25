const express = require("express");

const router = express.Router();
const control = require("../controller/admin.ctrl");

router.get('/home',control.adminHomePage);
router.get('/',control.adminLoginPage);
router.get('/view-category',control.viewCategory);
router.get('/add-product',control.addProduct);
router.get('/product-list',control.viewProductList);
router.get('/edit-product',control.editProduct);

// router.get("/dashboard",auth.isAuth,adminController.adminDashBoard);

module.exports = router;
