module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    role_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Role;
};
