'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Good = require('good');
const fs = require('fs');
const mongoose = require('mongoose');

// setting environment variables
const config = process.env.NODE_ENV ? require(`${__dirname}/config/${process.env.NODE_ENV}-globals`) : require(`${__dirname}/config/local-globals`);

// creating the server with a host and port
const server = new Hapi.Server();
server.connection({
  host: config.server.host || 'localhost',
  port: config.server.port || '8080'
});

// connect to database
mongoose.connect(config.mongo.uri, { useMongoClient: true });

// inert for static files
server.register({
    register: require('inert')
});

//routes
server.register({
  register: require('./app/routes.js')
});

//registering good, good-squeeze, and good-console for server monitoring
server.register([
  {
    register: Good,
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
  require('vision')
], (err) => {

  if(err){
    throw err; //throw errors
  }

  server.views({
    engines: {
      pug: require('pug')
    },
    relativeTo: __dirname,
    path: 'views',
    compileOptions: {
        pretty: true
    }
  });

});

//start server
server.start((err) => {

  if(err){
    throw err;
  }
  console.log('Server running at', server.info.uri);

});
