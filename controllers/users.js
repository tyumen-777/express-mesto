const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Передан некорректный id: ${err}` });
        return;
      }
      res.status(500).send({ message: `Внутреняя ошибка сервера ${err}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка при валидации: ${err}` });
        return;
      }
      res.status(500).send({ message: `Внутреняя ошибка сервера ${err}` });
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const owner = req.user._id;
  return User.findByIdAndUpdate(owner, { avatar }, { new: true }, { runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка при валидации ${err}` });
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const owner = req.user._id;
  return User.findOneAndUpdate(owner, { name, about }, { new: true }, { runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка при валидации ${err}` });
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserAvatar,
  updateUser,
};
