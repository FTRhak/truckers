import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';
import { Response } from '@angular/http';

import { AuthServer } from './../../server/auth';
import { ShowingErrorMessages } from './../../services/showing-error-messages';
import { SuccessResponse, RegistrationModel } from './../../interfaces';


@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/register.html',
    providers: [AuthServer]
})
export class RegistrationPage extends Locale implements OnInit {
    model: RegistrationModel = new RegistrationModel;
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
        const pageTitle = this.localization.translate('registration.title');
        this.title.setTitle(pageTitle);
        if (this.authServer.isLogin()) {
            this.router.navigate(['/user']);
        }
    }

    actionAccepted(res: SuccessResponse): void {
        if (res.status) {
            this.router.navigate(['/register/completed']);
        } else {
            this.showingErrorMessages.showError(res);
        }
    }
    actionError(res: Response): void {
        this.showingErrorMessages.showServerError(res);
    }

    onSubmit(registrationForm: NgForm): void {
        if (registrationForm.valid) {
            this.authServer.register(this.model, this.actionAccepted.bind(this), this.actionError.bind(this));
        }
    }
}