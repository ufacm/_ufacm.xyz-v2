const register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            return reply('ok');
        }
    });

    return next();
};

register.attributes = {
    name: 'UFACM routes',
    version: '1.0.0'
};

module.exports = register;
