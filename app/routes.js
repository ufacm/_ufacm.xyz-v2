const rp = require('request-promise');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const config = process.env.NODE_ENV ? require(`../config/${process.env.NODE_ENV}-globals`) : require(`${__dirname}/config/local-globals`);

// connect to database
// TODO: do this as a hapi plugin
const db = new Sequelize({
    dialect: 'sqlite',
    storage: `${config.db.path}.db`
});

db.authenticate()
    .then(() => {
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Unable to connect to database');
    });

const User = db.define('users', require('../common/models/User'));
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

            console.log(plainPassword);

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

                User.findOrCreate({where: newUser})
                .spread((user, created) => {
                    console.log('user:', user.get({
                        plain: true
                    }));
                    console.log('created:', created);
                })
            });

            reply.response('cool');
        }
    })

    return next();
};

register.attributes = {
    name: 'UFACM routes',
    version: '1.0.0'
};

module.exports = register;
