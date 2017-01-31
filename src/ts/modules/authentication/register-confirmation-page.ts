import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { AuthServer } from './../../server/auth';

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/register_confirmation.html',
    providers: [AuthServer]
})
export class RegisterConfirmationPage {
    confirmationKey: string;
    constructor(private authServer: AuthServer, public router: Router, private route: ActivatedRoute) {
        this.confirmationKey = route.params['value'].key;
    }

    actionAccepted(res: any) {
        this.router.navigate(['/login']);
    }
    actionError(res: any) {
        this.router.navigate(['/login']);
    }
}