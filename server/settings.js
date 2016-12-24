module.exports = {
    db: {
        host: '127.0.0.1',
        port: 27017,
        database: 'trucker_db',
        user: 'root',
        password: '',
        charset: 'utf8'
    },
    server: {
        host: 'http://localhost:3000/',
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