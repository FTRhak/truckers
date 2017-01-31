import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthServer } from './../../server/auth';

import { Header } from './../../components/navigation/header';

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/login.html',
    providers: [AuthServer]
})
export class LoginPage implements OnInit {
    name: string = "Login";
    constructor(
        private authServer: AuthServer,
        public snackBar: MdSnackBar,
        public router: Router,
        private title: Title) { }

    ngOnInit() {
        this.title.setTitle(this.name);
        if (this.authServer.isLogin()) {
            this.router.navigate(['/user']);
        }
    }

    actionAccepted(res: any) {
        if (res.status && !res.error) {
            this.authServer.setUser(res.user);
            this.router.navigate(['/user']);
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