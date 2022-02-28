const pool = require('../Database/dbconfig');

module.exports = class Cart{
    constructor(product_id,user_id){
        this.product_id = product_id;
        this.user_id =user_id;
    }
    static fetchAllCartItem(user_id){
       return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
          if(!err){
            let sql = "select product.id,product.name,product.quantity,product.price,product.description,product.frontViewImage,cart.id as cartId from product inner join cart on product.id = cart.product_id where cart.user_id =?";
            con.query(sql,[user_id*1],(err,queryResults)=>{
              con.release();
              err ? reject(err) : resolve(queryResults);
            });    
          }
          else
            reject(err);
        });
       });
    }
    removeFromCart(){
        return new Promise((resolve,reject)=>{
             pool.getConnection((err,con)=>{
               if(!err){
                 let sql = "delete from cart where product_id=? and user_id=?";
                 con.query(sql,[this.product_id,this.user_id],(err,queryResult)=>{
                    con.release();
                    err ? reject(err) : resolve(queryResult);
                 });
               }
               else
                 reject(err);
             });
        });   
     }
    addItemInCart(){
       return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
              if(!err){
                let sql = "insert into cart(product_id,user_id) values(?,?)";
                con.query(sql,[this.product_id,this.user_id],(err,queryResult)=>{
                   con.release();
                   err ? reject(err) : resolve(queryResult);
                });
              }
              else
                reject(err);
            });
       });   
    }
}