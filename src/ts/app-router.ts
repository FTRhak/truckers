import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathLocationStrategy } from '@angular/common';

import { IndexPage } from './modules/index-page';
import { AboutPage } from './modules/about-page';
import { TermsPage } from './modules/terms-page';
import { _404Page } from './modules/404-page';


import { LoginPage, LogoutPage, RestorePage, RegistrationPage, RegisterCompletedPage, RegisterConfirmationPage } from './modules/authentication/index';
import { UserProfilePage, UserSettingsPage, UserEditPage, UserChangePasswordPage, UserChangeContactDataPage } from './modules/user/index';

//directives: [ng.common.CORE_DIRECTIVES, ng.common.FORM_DIRECTIVES, ng.router.ROUTER_DIRECTIVES],
//import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: '[app-trucker]',
  template: `<md-toolbar>My App</md-toolbar><router-outlet></router-outlet>
  <div>
    <a [routerLink]="['/']">Index</a>
    <a [routerLink]="['/about']">About</a>
    <a [routerLink]="['/terms']">Terms</a>
    <div>
      <a [routerLink]="['/login']">Login</a>
      <a [routerLink]="['/logout']">Logout</a>
      <a [routerLink]="['/restore']">Restore</a>
      <a [routerLink]="['/restore']">Restore</a>
      <a [routerLink]="['/registration']">Registration</a>
      <a [routerLink]="['/register/completed']">RegisterCompleted</a>
      <a [routerLink]="['/register/confirm/awder345hf3itug5thbg4i5']">RegisterConfirmation</a>
    </div>
    <div>
      <a [routerLink]="['/user']">user</a>
      <a [routerLink]="['/user/settings']">user/settings</a>
      <a [routerLink]="['/user/edit']">user/edit</a>
      <a [routerLink]="['/user/password']">user/password</a>
      <a [routerLink]="['/user/edit-contacts']">user/edit-contacts</a>
    </div>
  </div>
  `,
  //directives: [ROUTER_DIRECTIVES]
})
export class AppComponent { }

const routes: Routes = [
  { path: '', component: IndexPage },
  { path: 'about', component: AboutPage },
  { path: 'terms', component: TermsPage },

  { path: 'login', component: LoginPage },
  { path: 'logout', component: LogoutPage },
  { path: 'restore', component: RestorePage },
  { path: 'registration', component: RegistrationPage },
  { path: 'register/completed', component: RegisterCompletedPage },
  { path: 'register/confirm/:key', component: RegisterConfirmationPage },

  //UserProfilePage, UserSettingsPage, UserEditPage, UserChangePasswordPage, UserChangeContactDataPage
  { path: 'user', component: UserProfilePage },
  { path: 'user/settings', component: UserSettingsPage },
  { path: 'user/edit', component: UserEditPage },
  { path: 'user/password', component: UserChangePasswordPage },
  { path: 'user/edit-contacts', component: UserChangeContactDataPage },

  { path: '**', component: _404Page }
  //{ path: 'dashboard', redirectTo: '/dashboard2',  component: DashboardComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent },
  //{ path: 'heroes',     component: HeroesComponent, pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }