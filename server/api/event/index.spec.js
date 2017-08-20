'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var eventCtrlStub = {
  index: 'eventCtrl.index',
  show: 'eventCtrl.show',
  create: 'eventCtrl.create',
  upsert: 'eventCtrl.upsert',
  patch: 'eventCtrl.patch',
  destroy: 'eventCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var eventIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './event.controller': eventCtrlStub
});

describe('Event API Router:', function() {
  it('should return an express router instance', function() {
    eventIndex.should.equal(routerStub);
  });

  describe('GET /api/events', function() {
    it('should route to event.controller.index', function() {
      routerStub.get
        .withArgs('/', 'eventCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/events/:id', function() {
    it('should route to event.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'eventCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/events', function() {
    it('should route to event.controller.create', function() {
      routerStub.post
        .withArgs('/', 'eventCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/events/:id', function() {
    it('should route to event.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'eventCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/events/:id', function() {
    it('should route to event.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'eventCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/events/:id', function() {
    it('should route to event.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'eventCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
