const { required } = require("nodemon/lib/config");

const Mail = require('../model/mail');

const nodemailer = require('nodemailer')

const Admin = require("../model/admin.js");
const { response } = require("express");

exports.adminHomePage = (req,res) =>{
  res.render("../Views/Admin-Page/admin_log.ejs")
}

exports.adminLoginPage = (req, res) => {
  res.render("../Views/Admin-Pages/admin_login.ejs");
};

exports.adminDashBoard = (request, response, next) => {
  response.render("../Views/Admin-page/admin-home.ejs", {});
};

exports.adminLoginPost = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let admin = new Admin(email, password);
  admin
    .checkAdmin()
    .then((results) => {
      console.log(results);
      if (results.length > 0) {
        req.session.current_user = email;
        res.render("../Views/Admin-Pages/admin-home.ejs");
      } else console.log("Login Failed...");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewCategory = (req, res) => {
  res.render("../Views/Admin-Pages/view-category.ejs");
};

exports.addProduct = (req, res) => {
  res.render("../Views/Admin-Pages/add-product.ejs");
};

exports.viewProductList = (req, res) => {
  res.render("../Views/Admin-Pages/product-list.ejs");
};

exports.editProduct = (req, res) => {
  res.render("../Views/Admin-Pages/edit-product.ejs");
};

exports.adminHomePage = (req, res) => {
  res.render("./Admin-Pages/admin-home.ejs");
};


exports.mailProcess = (req, res) => {
  let mail = new Mail();

  const id = req.params.id;
   mail.getQuerybyId(id).then((results)=>{
     console.log(results)
    res.render("./Admin-Pages/mailprocess.ejs",{
      queries : results
    });
   }).catch(()=>{
        res.send()
   })
       
 
};



exports.sendMail = (req, res) => {
  let mail = new Mail();

  const id = req.params.id;
   mail.getQuerybyId(id).then((results)=>{
     console.log( results);
     console.log( req.body.reply);
  

     var mailOpts, smtpConfig;

     console.log(results[0].email + " jhv" + results[0].subject);
        var email = results[0].email;
        var subjects = results[0].subject;


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
         text: req.body.reply
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
   }).catch(()=>{
        res.send()
   })
       
 
};

exports.seeUsers = (req, res) => {
 
     let admin = new Admin();

     admin.seeUsers().then((results)=>{
        console.log(results);
      res.render("./Admin-Pages/seeUsers.ejs",{
        Users:results
      })
     })

};

exports.seeQueries = (req, res) => {
 
  let admin = new Admin();

  admin.seeQuery().then((results)=>{
     console.log(results);
   res.render("./Admin-Pages/seeQueries.ejs",{
     Users:results
   })
  })
};
exports.signout = (request, response, next) => {
  request.session.current_user = null;
  request.session.destroy();
  response.redirect("/admin");
};
