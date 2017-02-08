import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule, APP_INITIALIZER, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { Locale, LocaleService, LocalizationService, LocaleModule, LocalizationModule } from 'angular2localization';
import { LocalizationConfig, initLocalization } from './localization.config';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { APP_BASE_HREF } from '@angular/common';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';

import { LogService } from './log-service';

import { ShowingErrorMessages } from './services/showing-error-messages';

import { HttpAPI } from './server/http';

import { Header } from './components/navigation/header';
import { UserHeader } from './components/navigation/user-header';
import { AccountSettingsMenu } from './components/navigation/account-settings-menu';

import { GeneralPagesModule } from './modules/general/index';
import { AuthenticationModule } from './modules/authentication/index';
import { UserModule } from './modules/user/index';
import { EditUserModule} from './modules/user-edit/index';
import { FriendsModule } from './modules/friends/index';
import { MessagesModule } from './modules/messages/index';

@Component({
  moduleId: module.id,
  selector: '[app-trucker]',
  template: `<router-outlet></router-outlet>`,
  //directives: [ROUTER_DIRECTIVES]
})
export class AppComponent extends Locale {
  constructor(public locale: LocaleService, public localization: LocalizationService) {
    super(locale, localization);
  }
  // Sets a new locale & currency.
  selectLocale(language: string, country: string, currency: string): void {

    //this.locale.setCurrentLocale(language, country);
    //this.locale.setCurrentCurrency(currency);

  }
}


@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    HttpModule,
    FormsModule,
    LocaleModule.forRoot(),
    LocalizationModule.forRoot(),

    AuthenticationModule,
    UserModule,
    EditUserModule,
    FriendsModule,
    MessagesModule,
    GeneralPagesModule,
  ],
  //exports: [AccountSettingsMenu, UserHeader],
  declarations: [
    //InputValidationErrors,
    //AccountSettingsMenu,
    //Header,
    //UserHeader,
    //SocAuth,

    AppComponent
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

