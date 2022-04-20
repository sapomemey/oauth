const express = require('express');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const { authJWTSecret, port } = require('./config');

const app = express();

app.use(bodyParser.json());

app.post('/api/auth/token', (req, res) => {
  const { name, email } = req.body;
  const accessToken = jsonwebtoken.sign({ sub: email, name, email }, authJWTSecret);

  res.send({ accessToken });
});

app.get('/api/auth/verify', (req, res, next) => {
  const { accessToken } = req.query;

  try {
   const { name } = jsonwebtoken.verify(accessToken, authJWTSecret);

   res.send({ message: `the accessToken is valid`, name });
  } catch (error) {
    next(error);
  }
});

const server = app.listen(port, () => {
  console.log(`listening: ${server.address().port}`);
});
