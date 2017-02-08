import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { LocaleModule, LocalizationModule } from 'angular2localization';
import { HttpModule } from '@angular/http';

import { AccountSettingsMenu } from './../../components/navigation/account-settings-menu';
import { UserHeader } from './../../components/navigation/user-header';

import { UserEditNavigation } from './components/user-edit-navigation';
import { UserEditPage } from './user-edit-page';
import { UserEditGeneralPage } from './user-edit-general-page';
import { UserEditContactsPage } from './user-edit-contacts-page';
import { UserEditSocnetPage } from './user-edit-socnet-page';
import { UserEditAccessPage } from './user-edit-access-page';

export { UserEditNavigation } from './components/user-edit-navigation';

const routes: Routes = [
        { path: 'user/edit', component: UserEditPage },
        { path: 'user/edit/general', component: UserEditGeneralPage },
        { path: 'user/edit/contacts', component: UserEditContactsPage },
        { path: 'user/edit/socnet', component: UserEditSocnetPage },
        { path: 'user/edit/access', component: UserEditAccessPage }
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

        UserEditNavigation,
        UserEditPage,
        UserEditGeneralPage,
        UserEditContactsPage,
        UserEditSocnetPage,
        UserEditAccessPage
    ]
})
export class EditUserModule { }