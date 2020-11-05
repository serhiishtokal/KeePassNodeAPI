const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    define: {
      timestamps: false
    },

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.entry = require("../models/entry.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id"
});

db.user.hasMany(db.entry, {
    foreignKey: "user_id",
    as: "entries"
});
db.entry.belongsTo(db.user,{
    foreignKey: "user_id",
    as: "user"
});



db.ROLES = ["user", "admin", "moderator"];

module.exports = db;


//todo DB normalization