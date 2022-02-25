const { required } = require("nodemon/lib/config");

exports.adminLoginPage = (req, res) => {
  res.render("../Views/Admin-Pages/admin_login.ejs");
};

exports.adminHomePage=(req,res)=>{
    res.render("./Admin-Pages/admin-home.ejs");
}

exports.viewCategory=(req,res)=>{
    res.render("./Admin-Pages/view-category.ejs");
}


exports.addProduct=(req,res)=>{
  res.render("./Admin-Pages/add-product.ejs");
}

exports.viewProductList=(req,res)=>{
  res.render("./Admin-Pages/product-list.ejs");
}

exports.editProduct=(req,res)=>{
  res.render("./Admin-Pages/edit-product.ejs");
}

