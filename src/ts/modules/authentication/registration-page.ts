import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { AuthServer } from './../../server/auth';

class RegistrationModel {
    public login: string;
    public firstName: string;
    public secondName: string;
    public email: string;
    public password: string;
}

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/register.html',
    providers: [AuthServer]
})
export class RegistrationPage extends Locale implements OnInit {
    model: RegistrationModel = new RegistrationModel;
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
        const pageTitle = this.localization.translate('registration.title');
        this.title.setTitle(pageTitle);
        if (this.authServer.isLogin()) {
            this.router.navigate(['/user']);
        }
    }

    actionAccepted(res: any): void {
        this.router.navigate(['/login']);
    }
    actionError(res: any): void {

    }

    onSubmit() {
        console.log(this.model);

        //this.authServer.register(this.model, this.actionAccepted.bind(this), this.actionError.bind(this));
    }
}