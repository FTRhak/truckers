import { NgModule, Component }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PathLocationStrategy} from '@angular/common';

import { IndexPage }   from './modules/index-page';
import { AboutPage }   from './modules/about-page';
import { TermsPage }   from './modules/terms-page';

import { LoginPage }   from './modules/authentication/login-page';

//import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: '[app-trucker]',
  template: `<router-outlet></router-outlet>
  <div>
    <a href="#/">Index</a>
    <a href="#/about">About</a>
    <a href="#/terms">Terms</a>
    <a href="#/login">Login</a>
  </div>
  `,
})
export class AppComponent {}

const routes: Routes = [
  { path: '', component: IndexPage},
  { path: 'about', component: AboutPage},
  { path: 'terms', component: TermsPage},

  { path: 'login', component: LoginPage},
  //{ path: 'dashboard', redirectTo: '/dashboard2',  component: DashboardComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent },
  //{ path: 'heroes',     component: HeroesComponent, pathMatch: 'full'  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
