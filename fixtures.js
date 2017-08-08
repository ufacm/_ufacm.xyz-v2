const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Async = require('async');

const ufidSaltModel = require(`${__dirname}/common/models/UfidSalt.js`);
const userModel = require(`${__dirname}/common/models/User.js`);
const eventModel = require(`${__dirname}/common/models/Event.js`);
const saltRounds = 10;

let User;
let Event;
let currSalt = bcrypt.genSaltSync(saltRounds);

const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: bcrypt.hashSync('test123', saltRounds),
    sendNewsletter: false,
    ufid: bcrypt.hashSync('24687531', currSalt)
};
const testEvent = {
    description: "test event",
    endTime: "2015-03-25T12:00:00Z",
    name: "test",
    placeName: "The Fishbowl",
    startTime: "2014-03-25T12:00:00Z",
    id: "1098081746962508"
};

// setting environment variables
const config = process.env.NODE_ENV ? require(`${__dirname}/config/${process.env.NODE_ENV}-globals`) : require(`${__dirname}/config/local-globals`);

// instantiate the db
const db = new Sequelize({
    dialect: 'sqlite',
    storage: `${config.db.path}.db`
});

Async.series([
    (cb) => {
        // test connection
        console.log('Verifying setup...');
        db.authenticate()
        .then(() => {
            console.log('All ready to go!');
            cb();
        })
        .catch((err) => {
            console.log('Oops! Something went wrong. Logging error: ', err);
            process.exit(1);
        });
    },

    (cb) => {
        // create salt table
        const Salt = db.define('ufidSalt', ufidSaltModel);
        Salt.sync({force: false})
            .then(() => {
                return Salt.create({
                    salt: currSalt
                }).then(() => {
                    cb();
                });
            })
            .catch((err) => {
                console.log(err);
                cb()
            });
    },

    (cb) => {
        // create user table
        User = db.define('users', userModel);
        User.sync({force: false})
            .then(() => {
                return User.findOrCreate({
                    where: testUser
                }).then(() => {
                    cb();
                })
            })
            .catch((err) => {
                console.log(err);
                cb();
            });
    },

    (cb) => {
        // create the events table
        Event = db.define('events', eventModel);
        Event.sync({force: false})
            .then(() => {
                return Event.findOrCreate({
                    where: testEvent
                }).then(() => {
                    cb();
                });
            })
            .catch((err) => {
                console.log(err);
                cb();
            });
    },

    (cb) => {
        // create user-event relation table
        const UserEvent = db.define('users_events');
        User.belongsToMany(Event, { through: UserEvent });
        Event.belongsToMany(User, { through: UserEvent });

        UserEvent.sync({force: false}).then(() => {
            return UserEvent.findOrCreate({
                where: {
                    userUfid: bcrypt.hashSync('24687531', currSalt),
                    eventId: "1098081746962508"
                }
            });
        });
    }
])

