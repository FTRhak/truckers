module.exports = function (server, request, randPrefix) {
    return function () {
        var user = {
            email: randPrefix + 'test@test.com',
            login: 'testuser' + randPrefix,
            password: '123456',
            firstName: "Testerer",
            secondName: "Tester"
        };
        beforeEach(function () {

        });
        afterEach(function () {
            
        });
        it('/api/register ::: create user ', function (done) {
            request(server)
                .post('/api/register')
                .send(user)
                .set('Access-For-Test', '1')
                .expect(function (res) {
                    var data = res.body.data;
                    res.body.data = {
                        email: data.contacts.email,
                        firstname: data.personal_data.firstname,
                        surname: data.personal_data.surname,
                    };
                })
                .expect(200, {
                    status: true,
                    data: {
                        email: user.email,
                        firstname: user.firstName,
                        surname: user.secondName,
                    },
                    error: null
                }, done);
        });
        it('/api/register ::: new user with same email ', function (done) {
            let newUser = JSON.parse(JSON.stringify(user));
            newUser.login = newUser.login + 111;
            request(server)
                .post('/api/register')
                .send(newUser)
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "AC-103",
                    error: "user exist"
                }, done);
        });
        it('/api/register ::: new user with same login ', function (done) {
            let newUser = JSON.parse(JSON.stringify(user));
            newUser.login = newUser.login + 111;
            request(server)
                .post('/api/register')
                .send(newUser)
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "AC-103",
                    error: "user exist"
                }, done);
        });

        it('/api/register ::: invalid email ', function (done) {
            let newUser = JSON.parse(JSON.stringify(user));
            newUser.email = "123456";
            request(server)
                .post('/api/register')
                .send(newUser)
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "VL-0"
                }, done);
        });

        it('/api/register ::: invalid login ', function (done) {
            let newUser = JSON.parse(JSON.stringify(user));
            newUser.login = "123";
            request(server)
                .post('/api/register')
                .send(newUser)
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "VL-2"
                }, done);
        });

        it('/api/register ::: invalid password ', function (done) {
            let newUser = JSON.parse(JSON.stringify(user));
            newUser.login = "123";
            request(server)
                .post('/api/register')
                .send(newUser)
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "VL-2"
                }, done);
        });

        it('/api/register ::: invalid firstName ', function (done) {
            let newUser = JSON.parse(JSON.stringify(user));
            newUser.firstName = "";
            request(server)
                .post('/api/register')
                .send(newUser)
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "VL-3"
                }, done);
        });

        it('/api/register ::: invalid secondName ', function (done) {
            let newUser = JSON.parse(JSON.stringify(user));
            newUser.secondName = "";
            request(server)
                .post('/api/register')
                .send(newUser)
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "VL-3"
                }, done);
        });

        it('/api/register ::: empty data ', function (done) {
            request(server)
                .post('/api/register')
                .set('Access-For-Test', '1')
                .expect(200, {
                    status: false,
                    data: "VL-0"
                }, done);
        });
    };
    
};