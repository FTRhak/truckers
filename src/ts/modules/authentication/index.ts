import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { LocaleModule, LocalizationModule } from 'angular2localization';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { InputValidationErrors } from './../../components/input-validation-errors';

import { SocAuth } from './components/soc-auth';

import { LoginPage } from './login-page';
import { LogoutPage } from './logout-page';
import { RestorePage } from './restore-page';
import { RegistrationPage } from './registration-page';
import { RegisterCompletedPage } from './register-completed-page';
import { RegisterConfirmationPage } from './register-confirmation-page';


const routes: Routes = [
    { path: 'login', component: LoginPage },
    { path: 'logout', component: LogoutPage },
    { path: 'restore', component: RestorePage },
    { path: 'registration', component: RegistrationPage },
    { path: 'register/completed', component: RegisterCompletedPage },
    { path: 'register/confirm/:key', component: RegisterConfirmationPage },
];

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule.forRoot(),
        HttpModule,
        FormsModule,
        LocaleModule.forRoot(),
        LocalizationModule.forRoot(),
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: [
        InputValidationErrors,
        //Header,

        SocAuth,

        LoginPage,
        LogoutPage,
        RestorePage,
        RegistrationPage,
        RegisterCompletedPage,
        RegisterConfirmationPage
    ]
})
export class AuthenticationModule { }