import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServer } from './../../server/auth';

@Component({
    selector: 'app-trucker',
    templateUrl: '/templates/authentication/logout.html',
    providers: [AuthServer]
})
export class LogoutPage {

    constructor(private authServer: AuthServer, public router: Router) {
        this.authServer.logout({}, this.actionAccepted.bind(this), this.actionError.bind(this));
    }

    actionAccepted(res: any) {
        this.authServer.removeUser();
        this.router.navigate(['/login']);
    }
    actionError(res: any) {
        this.authServer.removeUser();
        this.router.navigate(['/login']);
    }
}