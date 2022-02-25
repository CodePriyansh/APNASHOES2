const User = require('../model/user');

exports.userHomePage = (req, res) => {
  res.render("../Views/user-pages/user-home.ejs");
}

exports.userProductsPage = (req, res) => {
  res.render("../Views/user-pages/products.ejs");
}

exports.userLoginPage = (req, res) => {
  res.render("../Views/user-pages/user-login.ejs",
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
        response.render("../Views/user-pages/user-home.ejs");
        response.send("Done")
        console.log("login success...");
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
  const name = request.body.name;
  const email = request.body.email;
  const number = request.body.number;
  const password = request.body.password;
  let user = new User(name, email, number, password);
  user.registerSave()
    .then(result => {
      response.redirect("/");
    }).catch(err => {
      console.log(err);
      response.send("registration failed..");
    });
};

exports.signout = (request,response,next)=>{
  request.session.current_user_id = null;
  request.session.destroy();
  response.redirect("/");
}