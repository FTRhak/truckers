import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { AuthServer } from './../../server/auth';

import { Header } from './../../components/navigation/header';

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/login.html',
    providers: [AuthServer]
})
export class LoginPage extends Locale implements OnInit {
    constructor(
        private authServer: AuthServer,
        public snackBar: MdSnackBar,
        public router: Router,
        private title: Title,
        public locale: LocaleService,
        public localization: LocalizationService) {
        super(locale, localization);
    }

    ngOnInit() {
        const pageTitle = this.localization.translate('login.title');
        this.title.setTitle(pageTitle);
        if (this.authServer.isLogin()) {
            this.router.navigate(['/user']);
        }
    }

    actionAccepted(res: any) {
        if (res.status) {
            this.authServer.setUser(res.user);
            this.router.navigate(['/user']);
        } else {
            const dbError = res.error && res.error.message;
            const errorCode = res.data;
            const errorMessage = this.localization.translate('general.errors.' + errorCode);
            const error = errorCode && errorMessage ? errorMessage : res.error;
            this.snackBar.open(dbError || error, '', {
                duration: 2000
            });
        }
    }
    actionError(res: any) {
        let error = '';
        error = this.localization.translate('general.errors.SR-' + res.status);
        this.snackBar.open(error, '', {
            duration: 2000,
        });
    }

    onSubmit(inputLogin: any, inputPassword: any) {
        const model = {
            login: inputLogin.value,
            password: inputPassword.value
        };
        this.authServer.login(model, this.actionAccepted.bind(this), this.actionError.bind(this));
    }
}