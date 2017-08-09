module.exports = (db, DataTypes) => {
    return db.define('events', {
        description: {
            type: DataTypes.STRING,
        },
        endTime: {
            type: DataTypes.DATE
        },
        name: {
            type: DataTypes.STRING
        },
        placeName: {
            type: DataTypes.STRING
        },
        placeCity: {
            type: DataTypes.STRING
        },
        placeCountry: {
            type: DataTypes.STRING
        },
        placeLatitude: {
            type: DataTypes.FLOAT
        },
        placeLongitude: {
            type: DataTypes.FLOAT
        },
        placeState: {
            type: DataTypes.STRING
        },
        placeStreet: {
            type: DataTypes.STRING
        },
        placeZip: {
            type: DataTypes.INTEGER
        },
        placeId: {
            type: DataTypes.INTEGER
        },
        startTime: {
            type: DataTypes.DATE
        }
    });
}

