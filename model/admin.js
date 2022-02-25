const pool = require("../Database/dbconfig");
module.exports = class Admin {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  checkAdmin() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, databaseConnection) => {
        if (err) {
          reject(err);
        } else {
          let sql = "select * from admin where email=? and password=?";
          databaseConnection.query(
            sql,
            [this.email, this.password],
            (err, queryResult) => {
              //   console.log(err);
              err ? reject(err) : resolve(queryResult);
            }
          );
          databaseConnection.release();
        }
      });
    });
  }
};
