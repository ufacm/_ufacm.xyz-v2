'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://172.17.0.2/ufacmxyzv2-dev'
  },

  // Seed database on startup
  seedDB: true

};
