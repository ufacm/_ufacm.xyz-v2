const register = (server, options, next) => {

    //  Events
    //  Contact us
    //  Our Staff
    //  SIGs
    //  Login
    //  Sign Up
    //  User dashboard
    //  User profile
    //  Resume repo

    server.route.push({
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply.view('index');
      }
    });

    server.route.push({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'views'
        }
      }
    });

    server.route.push({
        method: 'GET',
        path: '/events',
        handler: function(request, reply) {
          console.log("events");
          return reply.view('events');
        }
      };

      server.route.push({
        method: 'GET',
        path: '/contactus',
        handler: function(request, reply) {
          console.log("contactus");
          return reply.view('contactus');
        }
      });

      server.route.push({
        method: 'GET',
        path: '/ourstaff',
        handler: function(request, reply) {
          console.log("ourstaff");
          return reply.view('ourstaff');
        }
      });

      server.route.push({
        method: 'GET',
        path: '/sigs',
        handler: function(request, reply) {
          console.log("sigs");
          return reply.view('sigs');
        }
      });

      server.route.push({
        method: 'GET',
        path: '/login',
        handler: function(request, reply) {
          console.log("login");
          return reply.view('login');
        }
      });

      server.route.push({
        method: 'GET',
        path: '/signup',
        handler: function(request, reply) {
          console.log("signup");
          return reply.view('signup');
        }
      });

      server.route.push({
        method: 'GET',
        path: '/user/',
        handler: function(request, reply) {
          console.log("user");
          return reply.view('user');
        }
      });

      server.route.push({
        method: 'GET',
        path: '/resumerepo',
        handler: function(request, reply) {
          console.log("resumerepo");
          return reply.view('resumerepo');
        }
      });

      server.route.push({
        method: 'GET',
        path: '/user/profile',
        handler: function(request, reply) {
          console.log("profile");
          return reply.view('profile');
        }
      });

      return next();
    };

    register.attributes = {
      name: 'UFACM routes',
      version: '1.0.0'
    };

    module.exports = register;
