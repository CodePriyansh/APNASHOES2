const pool = require('../Database/dbconfig');

 module.exports = class Mailing{
     constructor(name,email,message){
         this.name = name;
         this.email = email;
         this.message = message;
     }


    save(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                reject(err);
                else{
                    let sql = "insert into user_query (name,email,subject,date) values (?,?,?,curdate())"
                    con.query(sql,[this.name,this.email,this.message],(err,results)=>{
                         con.release();
                        if(err)reject(err);
                        else{
                            resolve(results);
                        }
                    })
                }
            })
        })
    }
 
    getQuerybyId(id){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
              let sql = "select * from user_query where id=?";
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
     
    


 }