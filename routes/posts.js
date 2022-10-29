const express = require("express");
const PostController = require("../controllers/PostController");
const router = express.Router()

router.post("/createPost",PostController.createPost)
router.get("/getPosts",PostController.getPosts)
router.get("/getPostById/:id",PostController.getPostById)
router.get("/getPostByName/:title",PostController.getOnePostByName)
router.delete("/destroyPostById/:id",PostController.destroyPostById)
router.put("/updatePostById/:id",PostController.updatePostById)

module.exports = router