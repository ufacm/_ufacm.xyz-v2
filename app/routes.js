var express = require("express");
const register = (server, options, next) => {

  // Events
  //  Contact us
  //  Our Staff
  //  SIGs
  //  Login
  //  Sign Up
  //  User dashboard
  //  User profile
  //  Resume repo

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.view('index');
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'views'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/events',
    handler: function(request, reply) {
      reply("hi")
      console.log("events");
    }
  });

  server.route({
    method: 'GET',
    path: '/contactus',
    handler: function(request, reply) {
      console.log("contactus");
    }
  });

  server.route({
    method: 'GET',
    path: '/ourstaff',
    handler: function(request, reply) {
      console.log("contactus");
    }
  });

  server.route({
    method: 'GET',
    path: '/sigs',
    handler: function(request, reply) {
      console.log("sigs");
    }
  });

  server.route({
    method: 'GET',
    path: '/login',
    handler: function(request, reply) {
      console.log("login");
    }
  });

  server.route({
    method: 'GET',
    path: '/signup',
    handler: function(request, reply) {
      console.log("signup");
    }
  });

  server.route({
    method: 'GET',
    path: '/user/',
    handler: function(request, reply) {
      console.log("user");
    }
  });

  server.route({
    method: 'GET',
    path: '/resumerepo',
    handler: function(request, reply) {
      console.log("resumerepo");
    }
  });

  server.route({
    method: 'GET',
    path: '/user/profile',
    handler: function(request, reply) {
      console.log("contactus");
    }
  });

  return next();
};

register.attributes = {
  name: 'UFACM routes',
  version: '1.0.0'
};

module.exports = register;
