'use strict';

const Config = require('getconfig');
const Hapi = require('hapi');
const fs = require('fs');
const Sequelize = require('sequelize');

// Creating the server with a host and port
const server = new Hapi.Server();
server.connection({
  host: Config.server.host || 'localhost',
  port: Config.server.port || '8080'
});

// Creating array of plugins
const plugins = [
    require('inert'), // static files
    require('vision'), // template rendering
    require('./app/routes.js'), // routes
    {
        register: require('good'), // logging
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        },
    },
    {
        register: require('hapi-sequelize'), // database
        options: [
            {
                name: 'acm', // identifier
                models: ['./common/models/**/*.js'],  // paths/globs to model files
                sequelize: new Sequelize({
                    dialect: 'sqlite',
                    storage: `${Config.db.path}.db`
                }), // sequelize instance
                sync: true, // sync models - default false
                forceSync: false, // force sync (drops tables) - default false
                // onConnect: function (database) { // Optional
                // // migrations, seeders, etc.
                // }
            }
        ]
    }
];

// Plugin registration
server.register(plugins, (err) => {

    if (err) {
        throw err;
    }

    // Set up template rendering
    server.views({
        engines: {
            pug: require('pug')
        },
        relativeTo: __dirname,
        path: 'views',
        compileOptions: {
            pretty: true
        },
        isCached: Config.getconfig.env === 'production'
    });

    // Start server
    server.start((err) => {

        if(err){
            throw err;
        }
        console.log('Server running at', server.info.uri);

    });
});

