



const Cart = require('../model/cart');

exports.addToCart = (request,response,next)=>{
   let cart = new Cart(); 
   cart.product_id = request.params.pid;
   cart.user_id = request.session.current_user_id; 
   cart.addItemInCart()
   .then(result=>{
     return response.json({
         message: "success"
     });
   })
   .catch(err=>{
     return response.json({
         message: "error"
     })
   });
}
exports.removeFromCart = (request,response,next)=>{
    let cart = new Cart(); 
    cart.product_id = request.params.pid;
    cart.user_id = request.session.current_user_id; 
    cart.removeFromCart()
    .then(result=>{
      return response.json({
          message: "success"
      });
    })
    .catch(err=>{
      return response.json({
          message: "error"
      })
    });
}

exports.viewCart  = (request,response,next)=>{
    let userId = request.session.current_user_id;
    Cart.fetchAllCartItem(userId)
    .then(results=>{
        console.log(results);
        response.render("../Views/user-pages/user-cart.ejs",{
            title: "Cart",
            cartItemList: results,
            isLoggedIn: request.session.current_user_id
        });
    })
    .catch(err=>{
        reject(err);
    });
}


exports.getCartItemLocal=(request,response,next)=>{
    let userId = request.session.current_user_id;
    Cart.fetchAllCartItem(userId)
    .then(results=>{
        return response.json(results);
    })
    .catch(err=>{
        reject(err);
    });
}