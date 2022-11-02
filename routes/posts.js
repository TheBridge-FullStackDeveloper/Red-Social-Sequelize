const express = require("express");
const PostController = require("../controllers/PostController");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router()

router.post("/createPost",authentication, PostController.createPost)
router.get("/getPosts",PostController.getPosts)
router.get("/getPostById/:id",PostController.getPostById)
router.get("/getPostByName/:title",PostController.getOnePostByName)
router.delete("/destroyPostById/:id",authentication, isAdmin, PostController.destroyPostById)
router.put("/updatePostById/:id",PostController.updatePostById)

module.exports = router