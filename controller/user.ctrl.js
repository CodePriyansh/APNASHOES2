const User = require('../model/user');
const Mail = require('../model/mail');
const nodemailer = require('nodemailer')
const Category = require('../model/category');
const Product = require('../model/product');
const { request, response } = require('express');

exports.userHomePage = (request,response,next) => {
  let current_user_id = request.session.current_user_id;
  Promise.all([Category.fetchAll(),Product.fatchAll(current_user_id)])
  .then(results=>{
      return response.render("../Views/user-pages/user-home.ejs",{
          title: "Home",
          categoryList: results[0],
          productList: results[1],
          isLoggedIn: request.session.current_user_id,
      });
  })
  .catch(err=>{
      console.log(err);
      return response.send("Error.....");
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
            res.end("Email send successfully");
           
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

exports.userLoginPost = (request,response,next)=>{
  let user = new User();
  user.email = request.body.email;
  user.password = request.body.password;
  user.checkUser().
  then(result=>{
     if(result.length!=0){
         request.session.current_user_id = result[0].id;
        return response.redirect("/"); 
     }
   })
  .catch(err=>{
      console.log(err);
      return response.send("Erro.....");
  });
}
// exports.newArrivalPage = (req, res) => {
//   res.render("../Views/user-pages/newArrival.ejs");
// }


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

