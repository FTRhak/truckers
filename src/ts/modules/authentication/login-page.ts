import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';
import { Response } from '@angular/http';

import { AuthServer } from './../../server/auth';
import { ShowingErrorMessages } from './../../services/showing-error-messages';
import { SuccessResponse, UserLoginModel } from './../../interfaces';

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/login.html',
    providers: [AuthServer]
})
export class LoginPage extends Locale implements OnInit {
    constructor(
        private authServer: AuthServer,
        public showingErrorMessages: ShowingErrorMessages,
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

    actionAccepted(res: SuccessResponse): void {
        if (res.status) {
            this.authServer.setUser(res.user);
            this.router.navigate(['/user']);
        } else {
            this.showingErrorMessages.showError(res);
        }
    }
    actionError(res: Response): void {
        this.showingErrorMessages.showServerError(res);
    }

    onSubmit(inputLogin: HTMLInputElement, inputPassword: HTMLInputElement): void {
        const model = {
            login: inputLogin.value,
            password: inputPassword.value
        };
        this.authServer.login(model, this.actionAccepted.bind(this), this.actionError.bind(this));
    }
}