const Joi = require('joi');
const Boom = require('boom');
const rp = require('request-promise');
const bcrypt = require('bcrypt');
const uuidGen = require('uuid/v4');

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

    server.route({
        method: 'POST',
        path: '/signup',
        handler: (request, reply) => {
            console.log(request.payload);
            let {
                firstName,
                lastName,
                email
            } = request.payload;

            let ufid = request.payload.UFID;
            let sendNewsletter = request.payload.listServe;
            let plainPassword = request.payload.password;
            let passwordHash;

            // TODO: hash ufid

            bcrypt.hash(plainPassword, 10, (err, hash) => {
                passwordHash = hash;
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    ufid,
                    sendNewsletter,
                    password: passwordHash
                }

                request.getDb('acm').models.users.findOrCreate({where: newUser})
                .spread((user, created) => {
                    console.log('user:', user.get({
                        plain: true
                    }));
                    console.log('created:', created);
                })
            });

            reply.response('cool');
        }
    });

    server.route({
        method: 'POST',
        path: '/login',
        config: {
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().min(2).max(200).required(),
                    sub: Joi.string()
                }
            },
            auth: false,
            handler: (request, reply) => {
                if (request.auth.isAuthenticated) {
                    return reply.redirect('/profile');
                }

                const reqUser = request.payload;
                const uuid = uuidGen();

                if (!reqUser.username || !reqUser.password) {
                    return reply('Missing username or password');
                }

                getUser(request, reqUser.email)
                    .then((user) => {
                        if (user && bcrypt.compareSync(reqUser.password, user.dataValues.password)) {
                            request.cookieAuth.set(user);
                            console.log(request.cookieAuth.reply());
                            return reply('Login Successful!');
                        } else {
                            return reply(Boom.unauthorized('Incorrect email or password'));
                        }
                    })
                    .catch ((err) => {
                        console.log(err);
                        return reply(Boom.badImplementation());
                    });

                // const reqUser = request.payload;
                // getUser(request, reqUser.email)
                    // .then((user) => {
                        // if (user && bcrypt.compareSync(reqUser.password, user.dataValues.password)) {
                            // request.cookieAuth.set(user);
                            // console.log(request.cookieAuth.reply());
                            // return reply('Login Successful!');
                        // } else {
                            // return reply(Boom.unauthorized('Incorrect email or password'));
                        // }
                    // })
                    // .catch ((err) => {
                        // console.log(err);
                        // return reply(Boom.badImplementation());
                    // });
            }
        },
    })

    return next();
};

register.attributes = {
    name: 'UFACM routes',
    version: '1.0.0'
};

module.exports = register;

function getUser (request, email) {
    return request.getDb('acm').models.users.findOne({
        where: {
            email
        }
    });
}
