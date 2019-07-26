var userController = require("../app/controllers/user.controller");
const session = require("../app/middlewares/session.middleware");

//you can include all your controllers

module.exports = function(app, passport) {
  app.get("/login", userController.login);
  app.get("/signup", userController.signup);

  app.get("/", session.loggedIn, userController.home); //home
  app.get("/home", session.loggedIn, userController.home); //home

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/home", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );
  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/home", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );
};
