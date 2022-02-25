 const express = require("express");
 const app = express();
 const adminRoute = require('./routes/admin.route')
 const userRoute = require('./routes/user.route')
 const cartRoute = require('./routes/cart.route')
 const bodyParser = require('body-parser'); 
 const path = require('path');

  app.set('view Engine','ejs');
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname,'public')));

  app.use('/admin',adminRoute);
  app.use('/',userRoute);
  app.use('/cart',cartRoute);
 app.listen(3000,()=>{
     console.log("server Started");
 })

//jaya