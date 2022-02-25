
exports.userHomePage=(req,res)=>{
    res.render("./user-pages/user-home.ejs");
}

exports.userProductsPage=(req,res)=>{
    res.render("./user-pages/products.ejs");
  }

  exports.userLoginPage=(req,res)=>{
    res.render("./user-pages/user-login.ejs");
  }


  exports.newArrivalPage=(req,res)=>{
    res.render("./user-pages/newArrival.ejs");
  }


  exports.userRegisterPage=(req,res)=>{
    res.render("./user-pages/user-register.ejs");
  }

 