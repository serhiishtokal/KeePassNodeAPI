module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    pass_SHA_HMAC: {
      type: Sequelize.STRING
    },
    salt_keyHMAC: {
      type: Sequelize.STRING
    },
    isPassKeptAsSHA: {
      type: Sequelize.STRING
    },
    refreshToken: {
      type: Sequelize.STRING
    }

  },
    {
      timestamps: true
    }
  );

  return User;
};
