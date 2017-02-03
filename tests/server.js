//https://www.npmjs.com/package/supertest
//https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/

//mocha -R spec tests/server.js

var request = require('supertest');


var registration = require('./authentication/registration');
var restore = require('./authentication/restore');
var login = require('./authentication/login');

var randPrefix = Math.round(Math.random()*10000);

var server = require('../server/index.js');

describe('----first test----', function () {
    beforeEach(function () {
    });
    afterEach(function () {
    });
    it('logout', function (done) {
        request(server)
            .get('/api/logout')
            .set('Access-For-Test', '1')
            .expect(200, {
                status: true,
                data: null,
                user: null
            }, done);
    });
});

describe('-registration-', registration(server, request, randPrefix));
describe('-restore------', restore(server, request, randPrefix));
describe('-login--------', login(server, request, randPrefix));

describe('----close test server----', function () {
    afterEach(function () {
        server.close();
    });
    it('logout', function (done) {
        request(server)
            .get('/api/logout')
            .set('Access-For-Test', '1')
            .expect(200, {
                status: true,
                data: null,
                user: null
            }, done);
    });
});

/**/