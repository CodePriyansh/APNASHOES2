 const express = require("express");
 const session = require('express-session');
 const app = express();
 
 const adminRoute = require('./routes/admin.route')
 const categoryRoute = require("./routes/category.router");
 const userRoute = require('./routes/user.route')
 const cartRoute = require('./routes/cart.route')
 const productRoute= require('./routes/product.route')
 const bodyParser = require('body-parser'); 

 const path = require('path');

  app.set('view Engine','ejs');
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname,'public')));
  app.use(
      session({
      secret : "abcde",
      saveUninitialized :true,
      resave:false
  }));
  app.use('/admin',adminRoute);

  app.use('/product',productRoute);
 
 

  app.use("/category", categoryRoute);

  app.use('/',userRoute);
  app.use('/cart',cartRoute);


 app.listen(3000,()=>{
     console.log("server Started");
 })


