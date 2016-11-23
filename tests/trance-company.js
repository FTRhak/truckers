//mocha -R spec tests/trance-company.js

var request = require('supertest');
describe('loading express', function () {
    var server;
    beforeEach(function () {
        server = require('../server/index.js');
    });
    afterEach(function () {
        server.close();
    });
    it('/api/trance-company/item/:id  ::: get one item by id', function testSlash(done) {
        request(server)
            .get('/api/trance-company/item/1')
            .set('Access-For-Test', '1')
            .expect(function (res) {
                //res.body.data.id = 2;
            })
            .expect(200, {
                status: 200,
                data: {
                    id: 1,
                    name: "Company 1"
                }
            }, done);
    });
    /*it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });*/
});