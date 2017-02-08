import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { LocaleModule, LocalizationModule } from 'angular2localization';
import { HttpModule } from '@angular/http';


import { FriendsPage } from './friends-page';


const routes: Routes = [
    { path: 'friends', component: FriendsPage },
    { path: 'friends/:fid', component: FriendsPage },
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
    exports: [RouterModule],
    declarations: [
        //AccountSettingsMenu,
        //UserHeader,

        FriendsPage
    ]
})
export class FriendsModule { }