import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { LocaleModule, LocalizationModule } from 'angular2localization';
import { HttpModule } from '@angular/http';


import { IndexPage } from './index-page';
import { AboutPage } from './about-page';
import { TermsPage } from './terms-page';
import { _404Page } from './404-page';

const routes: Routes = [
    { path: '', component: IndexPage },
    { path: 'about', component: AboutPage },
    { path: 'terms', component: TermsPage },
    { path: '**', component: _404Page }
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
        IndexPage,
        AboutPage,
        TermsPage,
        _404Page,
    ]
})
export class GeneralPagesModule { }