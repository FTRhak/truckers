import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthServer } from './../../server/auth';

@Component({
  selector: 'app-trucker',
  template: `<h1>UserChangeContactData</h1>`,
  providers: [AuthServer]
})
export class UserChangeContactDataPage {
  name = 'UserChangeContactData';
  constructor(private authServer: AuthServer, public snackBar: MdSnackBar, public router: Router) {
    if (!authServer.isLogin()) {
      router.navigate(['/login']);
    }

  }
}