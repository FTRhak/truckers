//mocha -R spec tests/trance-company.js

var request = require('supertest');
describe('loading express', function () {
    var server;
    let itemId = null;
    let newItem = {
        logo: '/images/' + Math.random() + ".jpeg",
        name: "CN_" + Math.floor(Math.random() * 10000),
        location: [Math.random() * 100, Math.random() * 100],
        email: "test@gmail.com",
        phone: "+456453575"
    };
    server = require('../server/index.js');
    beforeEach(function () {

    });
    afterEach(function () {
        server.close();
    });
    it('/api/trance-company/create ::: create item ', function (done) {
        request(server)
            .post('/api/trance-company/create')
            .send({ model: newItem })
            .set('Access-For-Test', '1')
            .expect(function (res) {
                itemId = res.body.item_id;
                res.body.item_id = 1;
            })
            .expect(200, {
                status: true,
                item_id: 1,
                error: null
            }, done);
    });

    it('/api/trance-company/item/:id  ::: get one item by id', function (done) {
        let expectData = JSON.parse(JSON.stringify(newItem));
        expectData.uid = "1001";
        expectData.is_deleted = false;
        expectData.__v = 0;
        expectData._id = "temp_id";

        request(server)
            .get('/api/trance-company/item/' + itemId)
            .set('Access-For-Test', '1')
            .expect(function (res) {
                res.body.data._id = "temp_id";
            })
            .expect(200, {
                status: true,
                data: expectData,
                error: null
            }, done);
    });

    it('/api/trance-company/uitems/  ::: get users item', function (done) {
        request(server)
            .get('/api/trance-company/uitems/')
            .set('Access-For-Test', '1')
            .expect(function (res) {
                res.body.data = res.body.data.length > 0;
            })
            .expect(200, {
                status: true,
                data: true,
                error: null
            }, done);
    });

    it('/api/trance-company/uitems/ ::: get users item (params:: limit=2, offset=0)', function (done) {
        request(server)
            .get('/api/trance-company/uitems/')
            .query({ limit: 2, offset: 0 })
            .set('Access-For-Test', '1')
            .expect(function (res) {
                res.body.data = res.body.data.length >= 1 && res.body.data.length <= 2;
            })
            .expect(200, {
                status: true,
                data: true,
                error: null
            }, done);
    });

    it('/api/trance-company/edit/:id ::: edit item', function (done) {
        request(server)
            .post('/api/trance-company/edit/' + itemId)
            .send({
                model: {
                    phone: "+111000444"
                }
            })
            .set('Access-For-Test', '1')
            .expect(200, {
                status: true,
                data: {
                    modified: 1,
                    n: 1
                },
                error: null
            }, done);
    });

    it('/api/trance-company/list  ::: get list of items by ids', function (done) {
        request(server)
            .post('/api/trance-company/list')
            .send({
                ids: [itemId]
            })
            .set('Access-For-Test', '1')
            .expect(function (res) {
                res.body.data = res.body.data.length == 1;
            })
            .expect(200, {
                status: true,
                data: true,
                error: null
            }, done);
    });

    it('/api/trance-company/search ::: search items by location', function (done) {
        request(server)
            .get('/api/trance-company/search')
            .query({ lng: newItem.location[0], lat: newItem.location[1] })
            .set('Access-For-Test', '1')
            .expect(function (res) {
                res.body.data = res.body.data.length > 0;
            })
            .expect(200, {
                status: true,
                data: true,
                error: null
            }, done);
    });

    it('/api/trance-company/delete/:id  ::: delete one item by id', function (done) {
        request(server)
            .delete('/api/trance-company/delete/' + itemId)
            .set('Access-For-Test', '1')
            .expect(200, {
                status: true,
                data: {
                    ok: 1,
                    nModified: 1,
                    n: 1
                },
                error: null
            }, done);
    });

    it('/api/trance-company/undelete/list  ::: undelete list of items by ids', function (done) {
        request(server)
            .delete('/api/trance-company/undelete/list')
            .send({
                ids: [itemId]
            })
            .set('Access-For-Test', '1')
            .expect(200, {
                status: true,
                data: {
                    ok: 1,
                    nModified: 1,
                    n: 1
                },
                error: null
            }, done);
    });

    it('/api/trance-company/delete/list  ::: delete list of items by ids', function (done) {
        request(server)
            .delete('/api/trance-company/delete/list')
            .send({
                ids: [itemId]
            })
            .set('Access-For-Test', '1')
            .expect(200, {
                status: true,
                data: {
                    ok: 1,
                    nModified: 1,
                    n: 1
                },
                error: null
            }, done);
    });


    /*it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });*/
});