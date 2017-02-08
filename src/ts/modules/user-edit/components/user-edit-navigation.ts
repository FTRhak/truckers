import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'user-edit-navigation',
    template: `
<nav md-tab-nav-bar>
    <a md-tab-link *ngFor="let link of navLinks" [routerLink]="link.url"
        routerLinkActive #rla="routerLinkActive" [active]="rla.isActive">{{ link.title }}</a>
</nav>`,
})
export class UserEditNavigation {
    navLinks: Object[];
    constructor() {
        this.navLinks = [
            {
                title: 'avatar',
                url: '/user/edit'
            },
            {
                title: 'general',
                url: '/user/edit/general'
            },
            {
                title: 'contacts',
                url: '/user/edit/contacts'
            },
            {
                title: 'socnet',
                url: '/user/edit/socnet'
            },
            {
                title: 'access',
                url: '/user/edit/access'
            }
        ];
    }
}