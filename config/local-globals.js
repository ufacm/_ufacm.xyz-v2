const config = {
    server: {
        host: process.env.SERVER_HOST || 'localhost',
        port: process.env.SERVER_PORT || '8080'
    },
    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017'
    }
};

module.exports = config;
