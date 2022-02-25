const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const control = require("../controller/admin.ctrl");

// router.get('/home',control.adminHomePage);
// router.get('/',control.adminLoginPage);
// router.get('/view-category',control.viewCategory);



router.get("/", control.adminLoginPage);
router.post("/login", control.adminLoginPost);
router.get("/add-product", control.addProduct);
router.get("/product-list", control.viewProductList);
router.get("/edit-product", control.editProduct);

// router.get("/dashboard", auth.isAuth, control.adminDashBoard);
router.get("/signout", auth.isAuth, control.signout);
module.exports = router;
