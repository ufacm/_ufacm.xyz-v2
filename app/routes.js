const register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
          reply.view('index');
        }
    });

    server.route({
        method: 'GET',
        path: '/sigs',
        handler: (request, reply) => {
          reply.view('sigs');
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

    return next();
};

register.attributes = {
    name: 'UFACM routes',
    version: '1.0.0'
};

module.exports = register;
