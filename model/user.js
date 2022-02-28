const pool = require('../Database/dbconfig');
module.exports = class User {
  constructor(name, email, number, password) {
    this.name = name;
    this.email = email;
    this.number = number;
    this.password = password;
    
  }
  checkUser() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, databaseConnection) => {
        if (err)
          reject(err);
        else {
          let sql = "select * from user where email=? and password=?";
          databaseConnection.query(sql, [this.email, this.password], (err, queryResult) => {
            console.log(queryResult)
            databaseConnection.release();

            err ? reject(err) : resolve(queryResult);

          });
        }
      });
    });
  }
  
  registerSave() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        if (err) reject(err);
        else {
          let sql = "insert into user(name,email,number,password,date) values(?,?,?,curdate())";
          con.query(sql, [this.name, this.email, this.number, this.password], (err, result) => {
            con.release();
            if (err) reject(err);
            else
              resolve(result);
          });
        }
      });
    });
  }


static fatchAllMens(){
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,con)=>{
      if(!err){
        let sql = "select name,price,frontViewImage from product where category_id=30";
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

static fetchAllWomens(){
return new Promise((resolve,reject)=>{
  pool.getConnection((err,con)=>{
    if(!err){
      let sql = "select name,price,frontViewImage from product where category_id=31";
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

static fetchAllKids(){
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,con)=>{
      if(!err){
        let sql = "select name,price,frontViewImage from product where category_id=32";
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

  static fetchAllNew(){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,con)=>{
        if(!err){
          let sql = "select name,price,frontViewImage from product where category_id=33";
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
    static fetchAllFeatureProduct(){
      return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
          if(!err){
            let sql = "select name,price,frontViewImage from product  where category_id=35";
            con.query(sql,(err,results)=>{
              con.release();
              err ? reject(err) : resolve(results);
            })
          }
          else
          reject(err);
        })
      })
    }
}

