const { Post, User, Sequelize } = require("../models/index");
const { Op } = Sequelize;
const PostController = {
  createPost(req, res) {
    Post.create({...req.body,UserId:req.user.id})
      .then((post) => {
        res.status(201).send({ msg: "Post creado", post });
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  },
  getPosts(req, res) {
    // Post.findAll({ include: [{ model: User, attributes: ["name"] }] })
    Post.findAll({ include: [User] })
      .then((posts) => res.send(posts))
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  },
  async getPostById(req, res) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [{ model: User, attributes: ["name"] }],
      });
      res.send(post);
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al crear la publicación", err });
    }
  },
  async getOnePostByName(req, res) {
    try {
      const post = await Post.findOne({
        where: {
          title: {
            [Op.like]: `%${req.params.title}%`,
          },
        },
        include: [User],
      });
      res.send(post);
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al buscar la publicación", err });
    }
  },
  async destroyPostById(req, res) {
    try {
      await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Publicación destruida con éxito" });
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al destruir la publicación", err });
    }
  },
  async updatePostById(req, res) {
    try {
      await Post.update({title:req.body.title,content:req.body.content}, {
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Actualizado con éxito" });
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al actualizar la publicación", err });
    }
  },
};

module.exports = PostController;
