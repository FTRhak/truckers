import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServer } from './../../server/auth';

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/register_completed.html',
    providers: [AuthServer]
})
export class RegisterCompletedPage {

    constructor(private authServer: AuthServer, public router: Router) {}

    actionAccepted(res: any) {
        this.router.navigate(['/login']);
    }
    actionError(res: any) {
        this.router.navigate(['/login']);
    }
}