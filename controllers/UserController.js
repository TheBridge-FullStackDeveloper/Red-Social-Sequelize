const { User,Post } = require("../models/index");

const UserController = {
  createUser(req, res) {
    req.body.role = "user";
    User.create(req.body)
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
    const users = await User.findAll({ include: [Post] })
     res.send(users)
    } catch (error) {
      console.error(err);
      res.status(500).send(err);
    }
  },
  async deleteUserById(req, res) {
    await User.destroy({
        where: {
            id: req.params.id
        }
    })
    await Post.destroy({
        where: {
            UserId: req.params.id
        }
    })
    res.send(
        'El usuario ha sido eliminado con éxito'
    )
},

};

module.exports = UserController;
