const User = require('../model/user');
const Mail = require('../model/mail');
const nodemailer = require('nodemailer')
const { request, response } = require('express');

exports.userHomePage = (request,response,next) => {
  let user = new User();
  User.fetchAllFeatureProduct()
    .then((results) => {
      console.log(results);
      response.render("../Views/user-pages/user-home.ejs", {
        Feature: results
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.userProductsPage = (req, res) => {
//   res.render("../Views/user-pages/products.ejs");
// }

exports.sendMail = (req, res) => {

 let mail = new Mail();
 mail.email = req.body.email
 mail.name = req.body.firstname
 mail.message = req.body.subject
  

  console.log(mail.name + "  " + mail.message  + " " + mail.email)
mail.save().then((results)=>{

 
    console.log( results);
    console.log( req.body.email);
    console.log( req.body.subject);
    console.log( req.body.firstname);
 

    var mailOpts, smtpConfig;

       var email = req.body.email;
       var subjects =req.body.subject;


    smtpConfig = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "pathakpriyanshu44@gmail.com",
            pass: "pppppAa786@"
    }
        
    });
    mailOpts = {
        from:"pathakpriyanshu44@gmail.com",
        to: email,
        subject: subjects,
        text: "thank you for share your thought we will work on it"
    };
    smtpConfig.sendMail(mailOpts, function(error, response) {
        //Email not sent
        if (error) {
            console.log(error)
            res.end("Email send failed");
           
        }//Yay!! Email sent
        else {
            res.render(
              './user-pages/emailSucessfully.ejs'
            );
           
        }
    });
  }).catch((err)=>{
      console.log(err)
  })
     
   

           
           
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
        // response.send("Done")
        console.log("login success...");
      }
      else
        console.log("Login Failed...");
    }).catch(err => {
      console.log(err);
    });
};

// exports.newArrivalPage = (req, res) => {
//   res.render("../Views/user-pages/newArrival.ejs");
// }


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
    .then(results => {
 
       console.log(name + " " +email + " "+number+" "+password);


      var mailOpts, smtpConfig;

      console.log(results);
        //  var email = results[0].email;
        //  var subjects = results[0].subject;
 
 
      smtpConfig = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: "pathakpriyanshu44@gmail.com",
              pass: "pppppAa786@"
      }
          
      });
      mailOpts = {
          from:"pathakpriyanshu44@gmail.com",
          to: email,
          subject: "your login details",
          text: "hiii"
      };
      smtpConfig.sendMail(mailOpts, function(error, response) {
          //Email not sent
          if (error) {
              console.log(error)
              response.end("Email send failed");
             
          }//Yay!! Email sent
          else {
            console.log("come")

             
          }
      });
      response.redirect("/");

    })
    .catch(err => {
      console.log(err);
      response.send("registration failed..");
    });
};

exports.signout = (request,response,next)=>{
  request.session.current_user_id = null;
  request.session.destroy();
  response.redirect("/");
}

exports.MensProductsPage = (request, response, next) => {
  let user = new User();
  User.fatchAllMens()
    .then((results) => {
      response.render("../Views/user-pages/products.ejs", {
      MensProducts: results,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.WomenProductsPage=(request,response,next)=>{

  let user =new User();
  User.fetchAllWomens()
  .then(results=>{
    response.render("../Views/user-pages/products_Women.ejs",{
      WomensProducts:results,
    });
  })
  .catch(err=>{
    console.log(err);
    });
  }

  exports.KidsProductsPage=(request,response,next)=>{

    let user =new User();
    User.fetchAllKids()
    .then(results=>{
      response.render("../Views/user-pages/products_Kids.ejs",{
        KidsProducts:results,
      });
    })
    .catch(err=>{
      console.log(err);
      });
    }

    exports.NewProductsPage=(request,response,next)=>{

      let user =new User();
      User.fetchAllNew()
      .then(results=>{
        response.render("../Views/user-pages/newArrival.ejs",{
          NewProducts:results,
        });
      })
      .catch(err=>{
        console.log(err);
        });
      }

