module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "mypass123",
  DB: "keePass",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
