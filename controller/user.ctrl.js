const User = require('../model/user');
const Category = require('../model/category');
const Product = require('../model/product');
const { request } = require('express');



exports.userProductsPage = (request, response) => {
  response.render("../Views/user-pages/products.ejs");
}

exports.userLoginPage = (request, response) => {
  response.render("../Views/user-pages/user-login.ejs",
    {
      title: "UserLogin"
    });
}

exports.userLoginPost = (request, response, next) => {
  let user = new User();

  user.email = request.body.email;
  user.password = request.body.password;
  user.checkUser()
    .then((results) => {
      console.log(results);
      console.log(results.length);
      if (results.length > 0) {
        request.session.current_user_id = results[0].id;
        Promise.all([Category.fetchAll(),Product.fatchAll(request.session.current_user_id)])
        .then(results=>{
            return response.render("../Views/user-pages/user-home.ejs",{
                title: "Home",
                categoryList: results[0],
                productList: results[1],
                isLoggedIn: request.session.current_user_id
            });
        })
        .catch(err=>{
            console.log(err);
            return response.send("Error.....");
        });
    
      }
      else
        console.log("Login Failed...");
    }).catch(err => {
      console.log(err);
    });
};

exports.newArrivalPage = (req, res) => {
  res.render("../Views/user-pages/newArrival.ejs");
}


exports.userRegisterPage = (req, res) => {
  res.render("../Views/user-pages/user-register.ejs", {
    tittle: "UserRegister"
  });
}

exports.userRegisterPost = (request, response, next) => {
  let user = new User();
  user.name = request.body.name;
  user.email = request.body.email;
  user.mobile = request.body.mobile;
  user.password = request.body.password;
  user.registerSave()
    .then(result => {
      User.getCurrentUser(user.email)
      .then(results=>{
      request.session.current_user_id=results[0].id;
      response.redirect("/");
    }).catch();
  })
  .catch(err=>{
    console.log(err);
    return response.send("Error....");    
  });
};

exports.signout = (request,response,next)=>{
  request.session.current_user_id = null;
  request.session.destroy();
  response.redirect("/");
}

exports.userHomePage = (request,response,next)=>{
  let current_user_id = request.session.current_user_id;
  Promise.all([Category.fetchAll(),Product.fatchAll(current_user_id)])
  .then(results=>{
      return response.render("../Views/user-pages/user-home.ejs",{
          title: "Home",
          categoryList: results[0],
          productList: results[1],
          isLoggedIn: request.session.current_user_id
      });
  })
  .catch(err=>{
      console.log(err);
      return response.send("Error.....");
  });
  
}


