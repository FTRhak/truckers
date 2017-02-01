import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm, NgModel} from '@angular/forms';

import { AuthServer } from './../../server/auth';

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/restore.html',
    providers: [AuthServer]
})
export class RestorePage {
    model: Object;
    restoreCompleted:boolean = false;
    constructor(private authServer: AuthServer, public router: Router) { }

    actionAccepted(res: any) {
        this.restoreCompleted = true;
    }
    actionError(res: any) {

    }

    onSubmit(inputLogin: any, inputPassword: any) {
        this.authServer.logout(this.model, this.actionAccepted.bind(this), this.actionError.bind(this));
        return false;
    }
}