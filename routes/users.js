const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar, login,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', getUserById);

// usersRouter.post('/users', createUser);

usersRouter.patch('/users/me', updateUser);

usersRouter.patch('/users/me/avatar', updateUserAvatar);

usersRouter.post('/signin', login);

module.exports = usersRouter;
