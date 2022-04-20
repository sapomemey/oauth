require('dotenv').config();

module.exports = {
  authJWTSecret: process.env.JWT_SECRET,
  port: process.env.PORT
};
