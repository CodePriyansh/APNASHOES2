const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const control = require("../controller/admin.ctrl");
router.get("/", control.adminLoginPage);
router.get("/home", control.adminHomePage);
router.post("/login", control.adminLoginPost);
router.get("/add-product", control.addProduct);
router.get("/product-list", control.viewProductList);
router.get("/edit-product", control.editProduct);
router.get("/registeredUsers", control.seeUsers);
router.get("/user-queries", control.seeQueries);
router.get("/mailProcess/:id", control.mailProcess);
router.post("/sendMail/:id", control.sendMail);

router.get("/signout", auth.isAuth, control.signout);
module.exports = router;
