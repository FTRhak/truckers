import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm, NgModel} from '@angular/forms';

import { AuthServer } from './../../server/auth';

class RegistrationModel {
    public login: string;
    public firstName: string;
    public secondName: string;
    public email: string;
    public password: string;
    public passwordConfirm: string;
}

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/register.html',
    providers: [AuthServer]
})
export class RegistrationPage {
    model: RegistrationModel = new RegistrationModel;
    constructor(private authServer: AuthServer, public router: Router) { }

    actionAccepted(res: any) {
        this.router.navigate(['/login']);
    }
    actionError(res: any) {

    }

    onSubmit(inputLogin: any, inputPassword: any) {
        this.authServer.logout(this.model, this.actionAccepted.bind(this), this.actionError.bind(this));
        return false;
    }
}