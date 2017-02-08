import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'user-actions',
    template: `
        <ul class="user-actions  layout-xs layout-sm layout-gt-sm">
            <li class="flex-xs-40 flex-sm-20 flex-gt-sm-10"></li>
            <li class="flex-auto">
                <button md-button type="button" aria-label="Messages list" [routerLink]="['/messages']">
                    <md-icon>&#xE0BE;</md-icon>
                </button>
            </li>
            <li class="flex-auto">
                <button md-button type="button" aria-label="Friends list" [routerLink]="['/friends']">
                    <md-icon>&#xE7EF;</md-icon>
                    <span class="action-data">0</span>
                </button>
            </li>
            <li class="flex-auto">
                <button md-button type="button" aria-label="Approves list">
                    <md-icon>&#xE876;</md-icon>
                    <span class="action-data">0</span>
                </button>
            </li>
        </ul>
    `,
})
export class UserActions {
    constructor() { }
}