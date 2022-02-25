const Category = require("../model/category");
const path = require("path");

exports.addCategory = (request, response, next) => {
  let category = new Category();
  category.categoryName = request.body.categoryName;
  category.categoryImage = request.file.filename;
  category
    .save()
    .then((result) => {
      response.render("../Views/Admin-Pages/admin-home.ejs");
    })
    .catch((err) => {
      response.send("Error.......");
    });
};

exports.categoryList = (request, response, next) => {
  Category.fetchAll()
    .then((results) => {
      response.render("../Views/Admin-Pages/view-category.ejs", {
        categoryList: results,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
