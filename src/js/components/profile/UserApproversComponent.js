/*global ng:true */

(function (ng, Component, app) {

    app.UserApproversComponent = Component({
        selector: '[user-approvers-view]',
        template: `
<div class="user-approvers">
    <span>41</span>
</div>
        `
    }).Class({
        constructor: [app.Server, function UserApproversComponentConstructor(server) {
            let self = this;
        }],

        actionShowList() {
            console.log("actionShowList");

        }
    });

})(
    ng,
    ng.core.Component,
    window.app || (window.app = {}
    ));