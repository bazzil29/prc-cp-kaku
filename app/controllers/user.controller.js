var numeral = require("numeral");
var bcrypt = require("bcrypt-nodejs");
var dateFormat = require("dateformat");

exports.home = function(req, res) {
  res.render("home.ejs", {
    error: req.flash("error"),
    success: req.flash("success"),
    session: req.session
  });
};

exports.signup = function(req, res) {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("signup", {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session
    });
  }
};

exports.login = function(req, res) {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("login", {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session
    });
  }
};
