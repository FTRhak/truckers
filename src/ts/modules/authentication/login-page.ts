import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Router } from '@angular/router';

import { AuthServer } from './../../server/auth';

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/login.html',
    providers: [AuthServer]
})
export class LoginPage {

    constructor(private authServer: AuthServer, public snackBar: MdSnackBar, public router: Router) { }

    actionAccepted(res: any) {
        if (res.status && !res.error) {
            this.authServer.setUser(res.user);
            this.router.navigate(['/about']);
        } else {
            this.snackBar.open(res.error || "Error access", '', {
                duration: 2000,
            });
        }
    }
    actionError(res: any) {
        this.snackBar.open("error", '', {
            duration: 2000,
        });
        console.warn('actionError: ', arguments[0]);
    }

    onSubmit(inputLogin: any, inputPassword: any) {
        const model = {
            login: inputLogin.value,
            password: inputPassword.value
        };
        this.authServer.login(model, this.actionAccepted.bind(this), this.actionError.bind(this));
    }
}