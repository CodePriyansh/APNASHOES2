const pool = require('../Database/dbconfig');

module.exports = class product{
    constructor(name,price,imageURL,quantity,category_id,description,frontViewImage,backViewImage,leftViewImage,rightViewImage){
        this.name=name;
        this.price=price;
        this.quantity=quantity;
        this.category_id=category_id;
        this.description=description;
        this.frontViewImage = frontViewImage;
        this.backViewImage = backViewImage;
        this.leftViewImage = leftViewImage;
        this.rightViewImage = rightViewImage;


    }
     save(){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
              if(!err){
                 let sql = "insert into product(name,price,quantity,description,category_id,frontViewImage,backViewImage,leftViewImage,rightViewImage) values(?,?,?,?,?,?,?,?,?)";
                  con.query(sql,[
                      this.name,
                      this.price*1,
                      this.quantity*1,
                      this.description,
                      this.category_id*1,
                      this.frontViewImage,
                      this.backViewImage,
                      this.leftViewImage,
                      this.rightViewImage
                  ],(err,queryResult)=>{
                   con.release();   
                   err ? reject(err) : resolve(queryResult); 
                  });
              }
              else
               reject(err);
          });                
        });
    }



    getproductById(id){
      return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
          if(!err){
            let sql = "select * from product where id=?";
            con.query(sql,[id*1],(err,result)=>{
              con.release();
              err ? reject(err) : resolve(result);
            });            
          }
          else
            reject(err);
        });        
      });

    }

    update(id){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
                let sql = "update product set name=?,price=?,quantity=?,description=? where id=?";
              con.query(sql,[this.name,this.price*1,this.quantity*1,this.description,id],(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release();
              });
            }
            else
              reject(err);
          }); 
        });
      }

      static fatchAll(){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
              let sql = "select * from product where isDeleted='false'";
              con.query(sql,(err,results)=>{
                con.release();
                err ? reject(err) : resolve(results);
              });            
            }
            else
              reject(err);
          });        
        });
     }

     static fatchAllById(id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
              if(!err){
                let sql = "select * from product where isDeleted='false' and category_id=?";
                con.query(sql,[id*1],(err,results)=>{
                  con.release();
                  err ? reject(err) : resolve(results);
                });            
              }
              else
                reject(err);
            });        
          });
     }
    
 static delete(id){
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,con)=>{
      if(!err){
        let sql = "update product set isDeleted='true' where id= ?";
        con.query(sql,[parseInt(id)],(err,result)=>{

          con.release();
          err ? reject(err) : resolve(result);
        });            
      }
      else
        reject(err);
    });        
  });
 }
 

 

}