const Sequelize = require('sequelize');

module.exports = {
    description: {
        type: Sequelize.STRING,
    },
    endTime: {
        type: Sequelize.DATE
    },
    name: {
        type: Sequelize.STRING
    },
    placeName: {
        type: Sequelize.STRING
    },
    placeCity: {
        type: Sequelize.STRING
    },
    placeCountry: {
        type: Sequelize.STRING
    },
    placeLatitude: {
        type: Sequelize.FLOAT
    },
    placeLongitude: {
        type: Sequelize.FLOAT
    },
    placeState: {
        type: Sequelize.STRING
    },
    placeStreet: {
        type: Sequelize.STRING
    },
    placeZip: {
        type: Sequelize.INTEGER
    },
    placeId: {
        type: Sequelize.INTEGER
    },
    startTime: {
        type: Sequelize.DATE
    }
}
