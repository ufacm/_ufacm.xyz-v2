const Sequelize = require('sequelize');

module.exports = {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sendNewsletter: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    ufid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}
