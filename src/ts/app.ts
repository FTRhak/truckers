import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { APP_BASE_HREF } from '@angular/common';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppRoutingModule, AppComponent } from './app-router';

import { HttpAPI } from './server/http';

import { Header } from './components/navigation/header';
import { UserHeader } from './components/navigation/userHeader';
import { SocAuth } from './components/authentication/soc-auth';

import { IndexPage } from './modules/index-page';
import { AboutPage } from './modules/about-page';
import { TermsPage } from './modules/terms-page';
import { _404Page } from './modules/404-page';

import { LoginPage, LogoutPage, RestorePage, RegistrationPage, RegisterCompletedPage, RegisterConfirmationPage } from './modules/authentication/index';
import { UserProfilePage, UserSettingsPage, UserEditPage, UserChangePasswordPage, UserChangeContactDataPage } from './modules/user/index';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    Header,
    UserHeader,
    SocAuth,

    AppComponent,
    IndexPage,
    AboutPage,
    TermsPage,
    _404Page,

    LoginPage, LogoutPage, RestorePage, RegistrationPage, RegisterCompletedPage, RegisterConfirmationPage,
    UserProfilePage, UserSettingsPage, UserEditPage, UserChangePasswordPage, UserChangeContactDataPage
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //{ provide: LocationStrategy, useClass: PathLocationStrategy },
    HttpAPI
  ],
  bootstrap: [AppComponent]
})
class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);

