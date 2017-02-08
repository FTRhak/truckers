import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { LocaleModule, LocalizationModule } from 'angular2localization';
import { HttpModule } from '@angular/http';

import { AccountSettingsMenu } from './../../components/navigation/account-settings-menu';
import { UserHeader } from './../../components/navigation/user-header';

import { UserDataProfile } from './components/user-data-profile';
import { UserActions } from './components/user-actions';
import { UserSkills } from './components/user-skills';
import { UserCurrentDeliveryOrder } from './components/user-current-delivery-order';

import { UserProfilePage } from './user-profile-page';
import { UserSettingsPage } from './user-settings-page';
import { UserChangePasswordPage } from './user-change-password-page';
import { UserChangeContactDataPage } from './user-change-contact-data-page';

const routes: Routes = [
    { path: 'user', component: UserProfilePage },
    { path: 'user/settings', component: UserSettingsPage },
    { path: 'user/password', component: UserChangePasswordPage },
    { path: 'user/edit-contacts', component: UserChangeContactDataPage },
];

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule.forRoot(),
        HttpModule,
        LocaleModule.forRoot(),
        LocalizationModule.forRoot(),
        RouterModule.forRoot(routes)
    ],
    //imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [
        //AccountSettingsMenu,
        //UserHeader,

        UserDataProfile,
        UserActions,
        UserSkills,
        UserCurrentDeliveryOrder,

        UserProfilePage,
        UserSettingsPage,
        UserChangePasswordPage,
        UserChangeContactDataPage
    ]
})
export class UserModule { }