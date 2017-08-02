var React = require('react');
var http = require(`http`);

class eventStream {
  constructor() {
    this.events = new Set[];
  }

  getEvents() {
    var options = {
      host: 'www.nodejitsu.com',
      path: '/',
      port: '1337',
      method: 'Get'
    };

    callback = function(response) {
      var str = ''
      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function() {
        console.log(str);
      });
    }

    var req = http.request(options, callback);
  }

}
