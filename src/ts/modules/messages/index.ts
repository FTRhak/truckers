import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { LocaleModule, LocalizationModule } from 'angular2localization';
import { HttpModule } from '@angular/http';

import { MessagesListPage } from './messages-list-page';

const routes: Routes = [
    { path: 'messages', component: MessagesListPage },
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

        MessagesListPage
    ]
})
export class MessagesModule { }