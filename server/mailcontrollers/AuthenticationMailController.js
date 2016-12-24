
module.exports = function (ControllerBaseClass) {
    'use strict';

    return (class AuthenticationMailController extends ControllerBaseClass {
        sendNotification(user, callback) {
            var mailOptions = {
                from: settings.mail_server.from,
                to: user.contacts.email,
                subject: 'Registration notification',
                text: 'You registered. Please notify ' + settings.server.host + '/user-confirmation/' + user.access_data.confirmation_key,
                html: '<p>You registered. Please notify ' + settings.server.host + '/user-confirmation/' + user.access_data.confirmation_key + '</p>'
            };
            this.mailer.sendMail(mailOptions, callback || this.callbackFunction);
        }
        sendNewPassword (email, password, callback){
            var mailOptions = {
                from: settings.mail_server.from,
                to: email,
                subject: 'New password',
                text: 'New password ' + password,
                html: '<p>New password ' + password + '</p>'
            };
            this.mailer.sendMail(mailOptions, callback || this.callbackFunction);
        }
    });
};