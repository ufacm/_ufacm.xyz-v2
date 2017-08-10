var React = require('react');
var request = require('request');

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
        console.log('body:', body); // Important stuff.
        return resolve({
          events: events
        })
      });
    });
  }


  var eventBox = React.createClass({
    render: function() {
      if (this.props.events) {
        var place = this.props.events.place;
        var startTime = this.props.events.start_time;
        var endTime = this.proprs.events.end_time;
        var title = this.props.events.name;
        var description = this.props.events.description;
        var coverPhoto = this.props.events.photos;
        var all_events = {
          place: place,
          startTime: startTime,
          endTime: endTime,
          title: title,
          description: description,
          coverPhoto: coverPhoto,
        }
      }
      return <div > all_events</div>
    }
  }); <
  eventBox >
}

    

