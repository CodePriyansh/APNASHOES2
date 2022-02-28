 const express = require("express");
 const app = express();
 const session = require("express-session");
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
      secret : "abcde"
  })
  );
  app.use('/admin',adminRoute);

  app.use('/product',productRoute);
 
 

  app.use("/category", categoryRoute);

  app.use('/',userRoute);
  app.use('/cart',cartRoute);
  //app.use('/order',orderRoute);

 app.listen(3000,()=>{
     console.log("server Started");
 })


