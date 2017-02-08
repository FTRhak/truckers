import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { LocaleModule, LocalizationModule } from 'angular2localization';
import { LocalizationConfig, initLocalization } from './localization.config';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { APP_BASE_HREF } from '@angular/common';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppRoutingModule, AppComponent } from './app-router';
import { LogService } from './log-service';

import { ShowingErrorMessages } from './services/showing-error-messages';

import { HttpAPI } from './server/http';

import { Header } from './components/navigation/header';
import { UserHeader } from './components/navigation/user-header';
import { AccountSettingsMenu } from './components/navigation/account-settings-menu';
import { SocAuth } from './components/authentication/soc-auth';
import { UserDataProfile } from './components/user/user-data-profile';
import { UserActions } from './components/user/user-actions';
import { UserSkills } from './components/user/user-skills';
import { UserCurrentDeliveryOrder } from './components/user/user-current-delivery-order';
import { InputValidationErrors } from './components/input-validation-errors';

import { IndexPage } from './modules/index-page';
import { AboutPage } from './modules/about-page';
import { TermsPage } from './modules/terms-page';
import { _404Page } from './modules/404-page';

import { LoginPage, LogoutPage, RestorePage, RegistrationPage, RegisterCompletedPage, RegisterConfirmationPage } from './modules/authentication/index';
import { UserProfilePage, UserSettingsPage, UserEditPage, UserChangePasswordPage, UserChangeContactDataPage } from './modules/user/index';
import { FriendsPage } from './modules/friends/index';
import { MessagesListPage } from './modules/messages/index';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    HttpModule,
    FormsModule,
    LocaleModule.forRoot(),
    LocalizationModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    InputValidationErrors,
    AccountSettingsMenu,
    Header,
    UserHeader,
    SocAuth,
    UserDataProfile,
    UserActions,
    UserSkills,
    UserCurrentDeliveryOrder,

    AppComponent,
    IndexPage,
    AboutPage,
    TermsPage,
    _404Page,

    LoginPage, LogoutPage, RestorePage, RegistrationPage, RegisterCompletedPage, RegisterConfirmationPage,
    UserProfilePage, UserSettingsPage, UserEditPage, UserChangePasswordPage, UserChangeContactDataPage, 
    FriendsPage,
    MessagesListPage
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //{ provide: LocationStrategy, useClass: PathLocationStrategy },
    HttpAPI,
    ShowingErrorMessages,
    LogService,
    LocalizationConfig,
    {
        provide: APP_INITIALIZER, // APP_INITIALIZER will execute the function when the app is initialized and delay what it provides.
        useFactory: initLocalization,
        deps: [LocalizationConfig],
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);

