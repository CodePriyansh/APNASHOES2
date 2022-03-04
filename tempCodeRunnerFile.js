
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

 app.listen(3000,()=>{
     console.log("server Started");
 })


