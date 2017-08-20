'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newEvent;

describe('Event API:', function() {
  describe('GET /api/events', function() {
    var events;

    beforeEach(function(done) {
      request(app)
        .get('/api/events')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          events = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      events.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/events', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/events')
        .send({
          name: 'New Event',
          info: 'This is the brand new event!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEvent = res.body;
          done();
        });
    });

    it('should respond with the newly created event', function() {
      newEvent.name.should.equal('New Event');
      newEvent.info.should.equal('This is the brand new event!!!');
    });
  });

  describe('GET /api/events/:id', function() {
    var event;

    beforeEach(function(done) {
      request(app)
        .get(`/api/events/${newEvent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          event = res.body;
          done();
        });
    });

    afterEach(function() {
      event = {};
    });

    it('should respond with the requested event', function() {
      event.name.should.equal('New Event');
      event.info.should.equal('This is the brand new event!!!');
    });
  });

  describe('PUT /api/events/:id', function() {
    var updatedEvent;

    beforeEach(function(done) {
      request(app)
        .put(`/api/events/${newEvent._id}`)
        .send({
          name: 'Updated Event',
          info: 'This is the updated event!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEvent = {};
    });

    it('should respond with the updated event', function() {
      updatedEvent.name.should.equal('Updated Event');
      updatedEvent.info.should.equal('This is the updated event!!!');
    });

    it('should respond with the updated event on a subsequent GET', function(done) {
      request(app)
        .get(`/api/events/${newEvent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let event = res.body;

          event.name.should.equal('Updated Event');
          event.info.should.equal('This is the updated event!!!');

          done();
        });
    });
  });

  describe('PATCH /api/events/:id', function() {
    var patchedEvent;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/events/${newEvent._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Event' },
          { op: 'replace', path: '/info', value: 'This is the patched event!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEvent = {};
    });

    it('should respond with the patched event', function() {
      patchedEvent.name.should.equal('Patched Event');
      patchedEvent.info.should.equal('This is the patched event!!!');
    });
  });

  describe('DELETE /api/events/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/events/${newEvent._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when event does not exist', function(done) {
      request(app)
        .delete(`/api/events/${newEvent._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
