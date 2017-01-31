import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { HttpModule } from '@angular/http';

import { APP_BASE_HREF } from '@angular/common';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
//ng.router.ROUTER_DIRECTIVES

import { AppRoutingModule, AppComponent } from './app-router';

import { HttpAPI } from './server/http';

import { IndexPage } from './modules/index-page';
import { AboutPage } from './modules/about-page';
import { TermsPage } from './modules/terms-page';

import { LoginPage } from './modules/authentication/login-page';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    IndexPage,
    AboutPage,
    TermsPage,

    LoginPage
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //{ provide: LocationStrategy, useClass: PathLocationStrategy }
    HttpAPI
  ],
  bootstrap: [AppComponent]
})
class AppModule { }
/*
ng.platform.browser.bootstrap(app.TruckersApplication, [
    ng.router.ROUTER_PROVIDERS,
    ng.core.provide(ng.router.LocationStrategy, { useClass: ng.router.PathLocationStrategy }),
    //ng.core.provide(ng.router.LocationStrategy, { useClass: ng.router.HashLocationStrategy }),
    ng.core.provide(ng.router.APP_BASE_HREF, { useValue: '/' }),
    ng.http.HTTP_PROVIDERS
]);*/


platformBrowserDynamic().bootstrapModule(AppModule);

