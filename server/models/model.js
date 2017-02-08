/*global app:true, db:true, DEBUD:true, __dirname:true */

'use strict';

module.exports = function(modelsList) {
    function initUrlControllers(modelClassName) {
        DEBUD && console.log('\x1b[33m%s\x1b[0m: ', "Init model ", modelClassName);
        let classElement = require(__dirname + '/'+modelClassName+'Model');
        modelsList[modelClassName] = classElement;
    }

    initUrlControllers('TranceCompany');
    initUrlControllers('Truck');
    initUrlControllers('MapObject');
    initUrlControllers('InfoObject');
    initUrlControllers('DeliveryOrder');
    initUrlControllers('User');
    initUrlControllers('ChatMessage');
    initUrlControllers('MObjectComment');
    initUrlControllers('UserSkills');
};
