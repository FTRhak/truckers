/*global app:true, db:true, DEBUD:true, __dirname:true */

'use strict';

class MailControllerBase {
    constructor(mailer) {
        //this.mailer = mailer;
        this.mailer = {
            sendMail: function (mailOptions, callback) {

            }
        };
    }
    callbackFunction(error, info) {
        if (error) {
            DEBUD && console.log('\x1b[41m%s %s\x1b[0m', "Send meil error: ", error);
        } else {
            DEBUD && console.log('\x1b[44m%s %s\x1b[0m', 'Message sent: ', info);
        }
    }
}


module.exports = function (mailsList) {
    var transporter = nodemailer.createTransport(settings.mail_server.smtps);

    function initUrlMailControllers(controllerClassName) {
        let classElement = require(__dirname + '/' + controllerClassName + 'MailController');
        let controllerClass = classElement(MailControllerBase);
        let obj = new controllerClass(transporter);
        DEBUD && console.log('\x1b[33m%s\x1b[0m: ', "Init mail controller ", controllerClass.name);
        mailsList[controllerClassName] = obj;
    }

    initUrlMailControllers('Authentication');
};
