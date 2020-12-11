// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var exphbs = require("express-handlebars");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  var db = require("../models")
  app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/profile", isAuthenticated, function (req, res) {   
    db.User.findAll({
      include: [db.saveSearch]
    }).then(function(results){
      let schools = [];
      for(i=0;i<results[0].saveSearches.length;i++){
        let school = { 
          id:   results[0].saveSearches[i].dataValues.id,
          site: results[0].saveSearches[i].dataValues.school,
          name: results[0].saveSearches[i].dataValues.school.search.split("%20").join(" ")  
        }
        schools.push(school);
      }
      console.log(schools);
      res.render("profile", { user: req.user, searches: schools });
    }) 

  });

  app.get("/results/:school", isAuthenticated, function (req, res){
    res.sendFile(path.join(__dirname, "../public/results.html"));
  });
}
