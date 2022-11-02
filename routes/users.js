const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");
const router = express.Router()

router.post("/createUser",UserController.createUser)
router.get("/getUsers",UserController.getUsers)
router.delete("/deleteUserById/:id",UserController.deleteUserById)
router.post("/login",UserController.login)
router.delete("/logout",authentication, UserController.logout)

module.exports = router