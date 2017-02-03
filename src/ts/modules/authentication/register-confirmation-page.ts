import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';
import { Response } from '@angular/http';

import { AuthServer } from './../../server/auth';
import { ShowingErrorMessages } from './../../services/showing-error-messages';
import { SuccessResponse } from './../../interfaces';

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/register_confirmation.html',
    providers: [AuthServer]
})
export class RegisterConfirmationPage extends Locale implements OnInit {
    confirmationKey: string;
    constructor(
        private authServer: AuthServer,
        public showingErrorMessages: ShowingErrorMessages,
        public router: Router,
        private route: ActivatedRoute,
        private title: Title,
        public locale: LocaleService,
        public localization: LocalizationService) {
        super(locale, localization);
        this.confirmationKey = route.params['value'].key;
    }

    ngOnInit() {
        const pageTitle = this.localization.translate('registrationConfirmation.title');
        this.title.setTitle(pageTitle);
        if (this.authServer.isLogin()) {
            this.router.navigate(['/user']);
        }
    }

    actionAccepted(res: SuccessResponse): void {
        if (res.status) {
            this.router.navigate(['/login']);
        } else {
            this.showingErrorMessages.showError(res);
        }
    }
    actionError(res: Response) {
        this.showingErrorMessages.showServerError(res);
    }
    onSubmit() {
        this.authServer.registerConfirm(this.confirmationKey, this.actionAccepted.bind(this), this.actionError.bind(this));
    }
}