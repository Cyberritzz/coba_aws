const { authJwt } = require("../middlewares");
const controllerAdmin = require("../controllers/adminController");
const upload = require("../middlewares/multer");

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get(
    "/admin/dashboard",
    [authJwt.verifyToken, authJwt.isAdmin],
    controllerAdmin.adminDashboard
  );

  app.get(
    "/admin/dashboard/product",
    [authJwt.verifyToken, authJwt.isAdmin],
    controllerAdmin.getProduk
  );

  app.get(
    '/admin/dashboard/get-users',
    [authJwt.verifyToken, authJwt.isAdmin],
    controllerAdmin.getUsers
  );

  app.post(
    "/admin/dashboard/upload-product",
    [authJwt.verifyToken, authJwt.isAdmin],
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "source_file", maxCount: 1 },
    ]),
    controllerAdmin.uploadProduk
  );

  // update data Produk
  app.put(
    "/admin/dashboard/update-product/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controllerAdmin.updateProduk
  );

  // update gambar produk
  app.put(
    "/admin/dashboard/update-foto/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    upload.fields([{ name: "thumbnail", maxCount: 1 }]),
    controllerAdmin.updateFoto
  );

  // update file produk
  app.put(
    "/admin/dashboard/update-file/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    upload.fields([{ name: "source_file", maxCount: 1 }]),
    controllerAdmin.updateRar
  );

  app.put(
    '/admin/dashboard/edit-membership/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controllerAdmin.putMembership
  )

};
