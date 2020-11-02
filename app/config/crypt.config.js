const dotenv = require('dotenv');
dotenv.config();
const env=process.env
module.exports = {
  PEPPER: env.PEPPER,
  ACCESS_TOKEN_SECRET: env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE:env.ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE:env.REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET: env.REFRESH_TOKEN_SECRET
};