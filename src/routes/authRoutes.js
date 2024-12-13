const express = require('express');
const router = express.Router();
const registerController = require("../controllers/registerContoller");
const signInController = require("../controllers/signInController");
const { authRequired } = require("../middlewares/validateToken");

router.post("/login", signInController.signInUser );
router.post("/register", registerController.registerNewUser);
router.get("/verify/:token", registerController.verifyAccount);
router.post("/logout", authRequired, signInController.logoutUser);

module.exports = router;