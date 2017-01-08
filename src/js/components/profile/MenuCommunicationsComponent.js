//MenuCommunicationsComponent.js
/*global ng:true */

(function (ng, Component, app) {

    app.MenuCommunicationsComponent = Component({
        selector: '[menu-communications-view]',
        template: `
<ul class="list-data menu-list-items layout-row">
    <li class="menu-item flex-auto">
        <i class="material-icons">&#xE0BE;</i><span class="menu-item-label">Messages</span><span class="menu-item-value">(12)</span>
    </li>
    <li class="menu-item flex-auto">
        <i class="material-icons">&#xE7FB;</i><span class="menu-item-label">Friends</span><span class="menu-item-value">(5)</span>
    </li>
    <li class="menu-item flex-auto">
        <i class="material-icons">&#xE5CA;</i><span class="menu-item-label">Approvers</span><span class="menu-item-value">(6)</span>
    </li>
</ul>
        `
    }).Class({
        constructor: [function MenuCommunicationsComponentConstructor() {
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