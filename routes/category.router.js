const express = require("express");
const router = express.Router();
const control = require("../controller/category.ctrl");
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "public/Images/categoryImage" });

router.post("/add", auth.isAuth,upload.single("categoryImage"),control.addCategory);
router.get("/view-category", auth.isAuth,control.categoryList);

module.exports = router;
