import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathLocationStrategy } from '@angular/common';

import { IndexPage } from './modules/index-page';
import { AboutPage } from './modules/about-page';
import { TermsPage } from './modules/terms-page';
import { _404Page } from './modules/404-page';


import { LoginPage } from './modules/authentication/login-page';
import { LogoutPage } from './modules/authentication/logout-page';
import { RegistrationPage } from './modules/authentication/registration-page';

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
    <a [routerLink]="['/login']">Login</a>
    <a [routerLink]="['/logout']">Logout</a>
    <a [routerLink]="['/registration']">Registration</a>
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
  { path: 'registration', component: RegistrationPage },
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
