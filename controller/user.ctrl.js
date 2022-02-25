
exports.userHomePage=(req,res)=>{
    res.render("../Views/user-pages/user-home.ejs");
}

exports.userProductsPage=(req,res)=>{
    res.render("../Views/user-pages/products.ejs");
  }

  exports.userLoginPage=(req,res)=>{
    res.render("../Views/user-pages/user-login.ejs");
  }


  exports.newArrivalPage=(req,res)=>{
    res.render("../Views/user-pages/newArrival.ejs");
  }


  exports.userRegisterPage=(req,res)=>{
    res.render("../Views/user-pages/user-register.ejs");
  }

 