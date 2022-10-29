const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router()

router.post("/createUser",UserController.createUser)
router.get("/getUsers",UserController.getUsers)
router.delete("/deleteUserById/:id",UserController.deleteUserById)

module.exports = router