import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { AuthServer } from './../../server/auth';

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/restore.html',
    providers: [AuthServer]
})
export class RestorePage implements OnInit {
    model: Object;
    restoreCompleted: boolean = false;
    constructor(
        private authServer: AuthServer,
        public snackBar: MdSnackBar,
        public router: Router,
        private title: Title,
        public locale: LocaleService,
        public localization: LocalizationService) { }

    ngOnInit() {
        const pageTitle = this.localization.translate('restore.title');
        this.title.setTitle(pageTitle);
        if (this.authServer.isLogin()) {
            this.router.navigate(['/user']);
        }
    }

    actionAccepted(res: any): void {
        if (res.status) {
            this.restoreCompleted = true;
        } else if (res.error && res.error.message) {
            const dbError = res.error.message;
            this.snackBar.open(dbError, '', {
                duration: 2000
            });
        }
    }
    actionError(res: any): void {
        const error = this.localization.translate('general.errors.SR-' + res.status);
        this.snackBar.open(error, '', {
            duration: 2000,
        });
    }

    onSubmit(inputLogin: any): void {
        const email = inputLogin.value;
        this.authServer.restore({ email: email }, this.actionAccepted.bind(this), this.actionError.bind(this));
    }
}