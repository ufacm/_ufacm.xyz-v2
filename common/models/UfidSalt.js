const Sequelize = require('sequelize');

module.exports = {
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
