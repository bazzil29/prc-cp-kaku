module.exports = {
  loggedIn: function(req, res, next) {
    if (req.session.user) {
      console.log(req.session);
      // req.session.passport._id

      next();
    } else {
      res.redirect("/login");
    }
  }
};
