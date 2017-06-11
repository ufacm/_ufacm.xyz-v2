'use strict';

const Path = require('path');
const Hapi = require('hapi');
const habitat = require('habitat');
const Good = require('good');

//setting environment variables
habitat.load(`${__dirname}/process.env`); //process.env must be in root directory
const env = new habitat('server', {host: 'localhost', port: 8080});
const SERVER_HOST = env.get('host');
const SERVER_PORT = env.get('port');

//creating the server with a host and port
const server = new Hapi.Server();
server.connection({
  host: SERVER_HOST || 'localhost',
  port: SERVER_PORT || '8080'
});

//routes
server.register({
  register: require('./app/routes.js')
})


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
    path: 'views'
  });

});

//start server
server.start((err) => {

  if(err){
    throw err;
  }
  console.log('Server running at', server.info.uri);
});
