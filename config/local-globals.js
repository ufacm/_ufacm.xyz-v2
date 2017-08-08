const config = {
    server: {
        host: process.env.SERVER_HOST || 'localhost',
        port: process.env.SERVER_PORT || '8080'
    },
    db: {
        path: process.env.DB_PATH || 'acm'
    }
};

module.exports = config;
