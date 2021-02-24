const express = require("express"),
  // 
  ServerController = require("../app/controller/ServerController"),
  userController = require("../app/controller/userController"),
  // databaseController = require("../app/controller/databaseController"),
  // nwswitchesController = require("../app/controller/nwswitchesController"),
  // sanController = require("../app/controller/sanController"),
  // tapeController = require("../app/controller/tapeController"),
  router = express.Router();
  const load = require("../app/middleware/upload");
  // const docUpload = require("../app/middleware/UploadDocs");
router.get("/api/v/get/getuserDetails", userController.getuserDetails);
router.post("/api/create/user", userController.register);

router.post("/api/login/user", userController.userLogin);
router.get("/api/get/user", userController.getUser);
router.put("/api/edit/user", userController.editUsers)





router.post("/api/create/newServer", ServerController.createNewServer);
router.get("/api/get/Server", ServerController.getServerList);
router.get("/api/get/ServerDetails", ServerController.getServerDetail);
router.put("/api/edit/Server", ServerController.editServer);
router.delete("/api/delete/Server", ServerController.deleteServer);



module.exports = router;
