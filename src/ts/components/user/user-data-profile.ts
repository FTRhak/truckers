import { Component, Input  } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'user-data-profile',
    template: `
        <div class="layout-xs layout-sm layout-gt-sm">
            <div class="flex-xs-40 flex-sm-30 flex-gt-sm-20 inset">
                <img class="tr-user-avatar" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
            </div>
            <div class="flex-auto inset">
                <h4>{{ user.personal_data.nickname }}</h4>
                <h3>{{ user.personal_data.firstname }} {{ user.personal_data.surname }}</h3>
            </div>
        </div>
    `,
})
export class UserDataProfile {
    @Input() user: any;
    constructor() { }
    ngOnInit(){
        //console.log("USER:",this.user);
    }
}