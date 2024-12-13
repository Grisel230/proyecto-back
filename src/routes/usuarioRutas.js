const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioControlador');
const { authRequired } = require('../middlewares/validateToken');
const { verifyRole } = require('../middlewares/verifyRole');

router.use(authRequired);
router.get("/:id", verifyRole([1, 2]), userController.getUserById);
router.get("/", verifyRole([1, 2]), userController.getAllUsers);
router.post("/", verifyRole([1]), userController.createUser);
router.put("/changepassword", userController.changePassword);
router.put("/update/:id", verifyRole([1, 2, 3]), userController.updateUser);
router.delete("/:id", verifyRole([1]), userController.deleteUser);
router.post("/suspend/:id", verifyRole([1]), userController.suspendUser);

module.exports = router;