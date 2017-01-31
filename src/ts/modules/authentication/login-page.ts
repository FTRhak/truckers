import { Component } from '@angular/core';

import { AuthServer } from './../../server/auth';

@Component({
  selector: 'app-trucker',
  templateUrl: '/templates/authentication/login.html',
  providers: [AuthServer]
})
export class LoginPage  {

    constructor(private authServer: AuthServer) { }

    onSubmit(inputLogin: any, inputPassword: any) { 
        const model = {
            login: inputLogin.value,
            password: inputPassword.value
        };
        this.authServer.login(model, function(){console.log(1);}, function(){console.log(2);});
     }

}