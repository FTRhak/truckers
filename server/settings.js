module.exports = {
    db: {
        host: '127.0.0.1',
        port: 27017,
        database: 'trucker_db',
        user: 'root',
        password: '',
        charset: 'utf8',
        options: {
            //db: {native_parser: true},
            replset: {
                auto_reconnect:false,
                poolSize: 10,
                socketOptions: {
                    keepAlive: 1000,
                    connectTimeoutMS: 30000
                }
            },
            server: {
                poolSize: 5,
                socketOptions: {
                    keepAlive: 1000,
                    connectTimeoutMS: 30000
                }
            }
        }
    },
    server: {
        host: 'http://localhost:3000/',
        host_display: 'http://localhost:3000/#',
        port: 3000,
        host_name: 'localhost'
    },
    mail_server: {
        smtps: 'smtps://test@funambol.com:pass@smtp.gmail.com',
        from: 'Admin <test@gmail.com>'
    },
    crypt: {
        salt_prefix: "trunk_pass",
        salt: "test",
        confirmation_key_salt: "hello"
    }
};