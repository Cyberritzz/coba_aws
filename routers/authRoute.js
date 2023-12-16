const express = require("express");
const routerAuth = express.Router();
const controllerAuth = require("../controllers/authController");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post('/login', controllerAuth.login);
    app.post('/register', controllerAuth.register);
    app.post('/logout', controllerAuth.logout);
    app.post('/admin/login', controllerAuth.adminLogin);
    app.post('/admin/register', controllerAuth.registerAdmin);
    app.post('/admin/logout', controllerAuth.adminLogout);
  app.post("/forget-password", controllerAuth.forget);
  app.post("/reset-password", controllerAuth.resetPassword);
};

