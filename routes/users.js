const usersRouter = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', getUserById);

usersRouter.post('/users', createUser);

usersRouter.patch('/users/me', updateUser);

usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
