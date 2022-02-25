const Category = require('../model/category');
const path = require("path");
const { render } = require('express/lib/response');
const { request } = require('http');
const Product = require('../model/product')
exports.saveProduct  = (request,response,next)=>{
    let product = new Product();
    product.frontViewImage = "";
    product.backViewImage = "";
    product.leftViewImage = "";
    product.rightViewImage = "";
    if(request.files.length>0){
       product.frontViewImage = request.files[0].filename;
       if(request.files.length>1){
           product.backViewImage = request.files[1].filename;
           if(request.files.length>2){
               product.leftViewImage = request.files[2].filename;
               if(request.files.length>3){
                   product.rightViewImage = request.files[3].filename;
               }
           }
       }
    }
    product.category_id  = request.body.category_id;
    product.name = request.body.name;
    product.quantity = request.body.quantity;
    product.description = request.body.description;
    product.price = request.body.price;
  
    product.save()
    .then(()=>{
        return response.render("../Views/Admin-Pages/admin-home.ejs");
    })
    .catch(err=>{
        console.log(err);
        return response.send("Error....");
    });
}
exports.editProduct = (request,response)=>{
    let product= new Product();
    const id = request.params.id;
    product.getproductById(id).then(
        (result) => {
   console.log(result);
          console.log(result);
           return response.render("../Views/Admin-Pages/edit-product.ejs",{
                ProductId:result
            });    

        }
    ).catch();

}

exports.editProductPost=(request,response)=>{
    let product = new Product();
    const id = request.params.id;
    console.log(id);
    console.log( "req body "+ request.body);
    product.name = request.body.name;
    product.quantity = request.body.quantity;
    product.price = request.body.price;
    product.description=request.body.description;
    product.update(id).then(result=>{
     response.redirect("/product/product-list");
    }).catch();
}


exports.addProductPage = (request, response, next) => {
    Category.fetchAll()
        .then(results => {
            console.log(results);
            return response.render("../Views/Admin-Pages/add-product.ejs", {
                categories: results
            });

        })
        .catch(err => {
            console.log(err);
            return response.send("Erro.....");
        });
};
exports.productListPage=(request,response,next)=>{
    let product=new Product();
    Product.fatchAll()
    .then(results => {
       
      response.render("../Views/Admin-Pages/product-list.ejs", {
             productList: results
         });
    })
    .catch(err => {
        console.log(err);
    });

}
exports.deleteProduct=(request,response,next)=>{
  let product = new Product();
    const id = request.params.id;
    Product.delete(id).then(
        () => {
            response.send("Product Deleted...");
        }
    ).catch();


}