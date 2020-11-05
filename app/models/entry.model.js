module.exports = (sequelize, Sequelize) => {
    const Entry = sequelize.define("entries", {
            entry_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            title: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            username: {
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
            cryptInitVector: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: true
        }
    );

    return Entry;
};
