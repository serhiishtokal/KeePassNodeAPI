module.exports = (sequelize, Sequelize) => {
    const Entry = sequelize.define("entries", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        user_name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    });

    return Entry;
};
