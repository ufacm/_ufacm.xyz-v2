const rp = require('request-promise');

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
          reply.view('sigsTemp');
        }
    });

    server.route({
        method: 'POST',
        path: '/contactus',
        handler: (request, reply) => {

            const form = request.payload;

            const postData = {
                method: 'POST',
                uri: process.env.SLACK_CONTACT_US_WEBHOOK,
                body: {
                    text: `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.body}`
                },
                json: true
            }
            rp.post(postData)
                .then((responseBody) => {
                    console.log(responseBody);
                })
                .catch((err) => {
                    reply.response(err);
                })
            
            reply.response('yea');
        }
    })

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
