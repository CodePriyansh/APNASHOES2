const pool = require("../Database/dbconfig");
module.exports = class Category {
  constructor(categoryName, categoryImage) {
    this.categoryName = categoryName;
    this.categoryImage = categoryImage;
  }
  save() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, con) => {
        console.log("come");

        if (!err) {
          let sql = "insert into category(name,imagename) values(?,?)";
          con.query(
            sql,
            [this.categoryName, this.categoryImage],
            (err, queryResult) => {
              con.release();
              err ? reject(err) : resolve(queryResult);
            }
          );
        } else reject(err);
      });
    });
  }

  static fetchAll(){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,con)=>{
        if(!err){
          let sql = "select name,imagename from category";
          con.query(sql,(err,results)=>{
            err ? reject(err) : resolve(results);
            con.release();
          });            
        }
        else
          reject(err);
      });        
    });
 }
};


