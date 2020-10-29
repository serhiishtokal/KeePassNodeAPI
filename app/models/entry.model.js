module.exports = (sequelize, Sequelize) => {
    const Entry = sequelize.define("entries", {
            entry_id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            title: {
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
        },
        {
            timestamps: true
        }
    );

    return Entry;
};
