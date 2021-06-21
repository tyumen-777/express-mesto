const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '60ceeaecafbbe73f83e65934',
  };
  next();
});

app.use(express.static(`${__dirname}/public`));

app.use('/', usersRoutes);
app.use('/', cardRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});