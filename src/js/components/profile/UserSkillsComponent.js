/*global ng:true */

(function (ng, Component, app) {

    app.UserSkillsComponent = Component({
        selector: '[user-skills-view]',
        template: `
<div class="user-skills">
    <ul>
        <li>
            111
        </li>
    </ul>
    <a *ngIf="!userSkills"></a>
</div>
        `
    }).Class({
        constructor: [app.Server, function UserSkillsComponentConstructor(server) {
            let self = this;
            this.userSkills = [];
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