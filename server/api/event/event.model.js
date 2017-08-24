'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './event.events';

var EventSchema = new mongoose.Schema({
  end_time: Date, // eslint-disable-line camelcase
  name: String,
  place: {
    name: String,
    location: {
      city: String,
      country: String,
      latitude: Number,
      longitude: Number,
      state: String
    },
    id: String
  },
  start_time: Date, // eslint-disable-line camelcase
  id: String
});

registerEvents(EventSchema);
export default mongoose.model('Event', EventSchema);
