const { User, Post, Token, Sequelize } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;
const UserController = {
  createUser(req, res) {
    req.body.role = "user";
    //la contraseña encriptada
    const password = bcrypt.hashSync(req.body.password, 10);
    console.log({ ...req.body });
    User.create({ ...req.body, password })
      .then((user) => {
        res.status(201).send({ msg: "usuario creado", user });
      })
      .catch((err) => console.error(err));
  },
  async getUsers(req, res) {
    // User.findAll({ include: [Post] })
    //   .then((users) => res.send(users))
    //   .catch((err) => {
    //     console.error(err);
    //     res.status(500).send(err);
    //   });
    try {
      const users = await User.findAll({ include: [Post] });
      res.send(users);
    } catch (error) {
      console.error(err);
      res.status(500).send(err);
    }
  },
  async deleteUserById(req, res) {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    await Post.destroy({
      where: {
        UserId: req.params.id,
      },
    });
    res.send("El usuario ha sido eliminado con éxito");
  },
  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Bienvenid@ " + user.name, user, token });
    });
  },
  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "hubo un problema al tratar de desconectarte" });
    }
  },
};

module.exports = UserController;
