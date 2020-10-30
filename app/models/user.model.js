module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
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

  },
    {
      timestamps: true
    }
  );

  return User;
};
