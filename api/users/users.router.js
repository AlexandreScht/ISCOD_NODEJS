const express = require("express");
const usersController = require("./users.controller");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");

router.get("/", authMiddleware, usersController.getAll);
router.get("/me", authMiddleware, usersController.me);
router.get("/:id", authMiddleware, usersController.getById);
router.post("/", authMiddleware, usersController.create);
router.put("/:id", authMiddleware, usersController.update);
router.delete("/:id",authMiddleware,usersController.delete);
router.get("/:userId/articles", usersController.getUserArticles);
module.exports = router;
