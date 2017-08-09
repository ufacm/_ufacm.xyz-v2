module.exports = (db, DataTypes) => {
    return db.define('ufidSalt', {
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}
