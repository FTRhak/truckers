//mocha -R spec tests/trance-company.js

var request = require('supertest');
describe('loading express', function () {
    var server;
    let itemId = null;
    const carModels = ["BMW", "RENO", "IVECO"];
    let newItem = {
        logo: '/images/' + Math.random() + ".jpeg",
        name: carModels[Math.floor(Math.random() * carModels.length)],
        cid: 3
    };
    server = require('../server/index.js');
    beforeEach(function () {

    });
    afterEach(function () {
        server.close();
    });
    it('/api/truck/create ::: create item ', function (done) {
        request(server)
            .post('/api/truck/create')
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

    it('/api/truck/item/:id  ::: get one item by id', function (done) {
        let expectData = JSON.parse(JSON.stringify(newItem));
        expectData.uid = "1001";
        expectData.is_deleted = false;
        expectData.__v = 0;
        expectData._id = "temp_id";

        request(server)
            .get('/api/truck/item/' + itemId)
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

    it('/api/truck/uitems/  ::: get users item', function (done) {
        request(server)
            .get('/api/truck/uitems/')
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

    it('/api/truck/uitems/ ::: get users item (params:: limit=2, offset=0)', function (done) {
        request(server)
            .get('/api/truck/uitems/')
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

    it('/api/truck/edit/:id ::: edit item', function (done) {
        request(server)
            .post('/api/truck/edit/' + itemId)
            .send({
                model: {
                    name: "No Name"
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

    it('/api/truck/list  ::: get list of items by ids', function (done) {
        request(server)
            .post('/api/truck/list')
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

    it('/api/truck/search ::: search items by name', function (done) {
        request(server)
            .get('/api/truck/search')
            .query({ name: 'No Name' })
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

    it('/api/truck/delete/:id  ::: delete one item by id', function (done) {
        request(server)
            .delete('/api/truck/delete/' + itemId)
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

    it('/api/truck/undelete/list  ::: undelete list of items by ids', function (done) {
        request(server)
            .delete('/api/truck/undelete/list')
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

    it('/api/truck/delete/list  ::: delete list of items by ids', function (done) {
        request(server)
            .delete('/api/truck/delete/list')
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

});