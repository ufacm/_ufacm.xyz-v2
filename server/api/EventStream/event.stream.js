var request = require('request');
var eventStreamer = angular.module('eventStreamer')

eventStreamer.controller('eventStreamController', function($scope){
  eventStream = new eventStream();
  var events = null;
  eventStream.getEvents().then((res, rej) => {
    if(res){
      events = res.events;
    }
    if(rej){
      console.log("Unable to get events, rejected with reject = "  + rej);
    }

  }
  $scope.updateValue = function(){
    $scope.events = events
  };


})




class eventStream {
  constructor() {
    this.returnedEvents = null;
    getEvents().then((res, rej) => {
      if(res){
        this.returnedEvents=res;
      }
      else{
        console.log("eventStream->Error->trouble with returned events " + rej)
      }
    })
  }

  getEvents() {
    new Promise(function(resolve, reject) {
      request.get('https://graph.facebook.com/494011427297346/events', function(error, response, events) {
        if (error) {
          return reject("events retrieval failed: error: ", error);
        }
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', events); // Important stuff.
        return resolve({
          events: events
        })
      });
    });
  }
