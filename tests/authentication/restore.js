module.exports = function (server, request, randPrefix) {
    return function () {
        var email = randPrefix + 'test@test.com';
        beforeEach(function () {

        });
        afterEach(function () {
            
        });
        it('/api/restore ::: send email ', function (done) {
            request(server)
                .post('/api/restore')
                .send({email: email})
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: true,
                    error: null
                }, done);
        });
        it('/api/restore ::: send invalid email ', function (done) {
            request(server)
                .post('/api/restore')
                .send({email: "12345"})
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "VL-0"
                }, done);
        });

        it('/api/restore ::: send empty data ', function (done) {
            request(server)
                .post('/api/restore')
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "VL-0"
                }, done);
        });
    };
};