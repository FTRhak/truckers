module.exports = function (server, request, randPrefix) {
    return function () {
        var user = {
            login: 'testuser' + randPrefix,
            password: '123456'
        };
        beforeEach(function () {

        });
        afterEach(function () {
            
        });
        it('/api/login ::: simple login ', function (done) {
            request(server)
                .post('/api/login')
                .send(user)
                .set('Access-For-Test', '1')
                .expect(function(res){
                    var usr = res.body.user;
                    res.body.user = !!usr;
                })
                .expect(200, {
                    status: true,
                    data: "accept",
                    user: true,
                    error: null
                }, done);
        });
        it('/api/login ::: send invalid login ', function (done) {
            request(server)
                .post('/api/login')
                .send({login: "12345", password: "123456"})
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "AC-101",
                    error: null,
                    user: null
                }, done);
        });

        it('/api/login ::: send empty data ', function (done) {
            request(server)
                .post('/api/login')
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "VL-2"
                }, done);
        });
    };
};