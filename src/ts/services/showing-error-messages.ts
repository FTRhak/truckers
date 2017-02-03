import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';
import { Response } from '@angular/http';

import { SuccessResponse, } from './../interfaces';

@Injectable()
export class ShowingErrorMessages extends Locale {
    constructor(
        private snackBar: MdSnackBar,
        public locale: LocaleService,
        public localization: LocalizationService) {
        super(locale, localization);
    }
    showError(res: SuccessResponse): void {
        if (res.status === false) {
            const dbError = res.error && res.error.message;
            const errorCode = res.data;
            const errorMessage = this.localization.translate('general.errors.' + errorCode);
            const error = errorCode && errorMessage ? errorMessage : res.error;
            this.snackBar.open(dbError || error, '', {
                duration: 2000
            });
        }
    }
    showServerError(res: Response): void {
        const error = this.localization.translate('general.errors.SR-' + res.status);
        this.snackBar.open(error, '', {
            duration: 2000,
        });
    }
}
