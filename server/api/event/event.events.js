/**
 * Event model events
 */

'use strict';

import {EventEmitter} from 'events';
var Event = require('../../sqldb').Event;
var EventEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EventEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Event) {
  for(var e in events) {
    let event = events[e];
    Event.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    EventEvents.emit(event + ':' + doc._id, doc);
    EventEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Event);
export default EventEvents;
