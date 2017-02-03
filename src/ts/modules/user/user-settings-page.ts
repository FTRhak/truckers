import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthServer } from './../../server/auth';

@Component({
  selector: 'app-trucker',
  templateUrl: '/templates/user/user_settings.html',
  providers: [AuthServer]
})
export class UserSettingsPage {
  name = 'UserSettings';
  constructor(private authServer: AuthServer, public snackBar: MdSnackBar, public router: Router) {
    if (!authServer.isLogin()) {
      router.navigate(['/login']);
    }

  }
}