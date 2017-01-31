import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthServer } from './../../server/auth';

@Component({
  selector: 'app-trucker',
  templateUrl: '/templates/user/user.html',
  providers: [AuthServer]
})
export class UserProfilePage {
  name = 'Profile';
  user:any;
  constructor(private authServer: AuthServer, public snackBar: MdSnackBar, public router: Router) {
    if (!authServer.isLogin()) {
      router.navigate(['/login']);
    }
    this.user = this.authServer.getUser();
  }
}