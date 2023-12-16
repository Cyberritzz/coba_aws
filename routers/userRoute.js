const { authJwt } = require("../middlewares");
const controllerUser = require("../controllers/userController");
const { checkLimit } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/user/products", 
  // [authJwt.verifyToken],
  controllerUser.getProduct);

  app.get('/user/products/:id',
  // [authJwt.verifyToken ,authJwt.isUser, authJwt.isNotMembership],
  controllerUser.getProductById),

  app.get('/user/download/:id/:id_user',
  [authJwt.verifyToken ,authJwt.isUser, authJwt.isNotMembership],
  checkLimit,
  controllerUser.downloadFile);

  app.post('/user/update-data/:id',
  [authJwt.verifyToken, authJwt.isUser],
  controllerUser.updateUserMail);

  app.post('/user/update-password/:id',
  [authJwt.verifyToken, authJwt.isUser],
  controllerUser.updatePassword);

  app.get('/user/history/:id',
  [authJwt.verifyToken, authJwt.isUser],
  controllerUser.getHistory);
};
