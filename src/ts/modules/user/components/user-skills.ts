import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'user-skills',
    template: `
        <md-card>
            <md-card-header class="layout-row">
                <div class="flex-auto">
                    <md-card-title >Skills</md-card-title>
                </div>
                <div class="flex-none">
                    <button md-icon-button type="button" aria-label="Edit skills">
                        <md-icon>&#xE254;</md-icon>
                    </button>
                </div>
            </md-card-header>
            <md-card-content>
                <md-list>
                    <md-list-item>Item 1</md-list-item>
                    <md-list-item>Item 2</md-list-item>
                    <md-list-item>Item 3</md-list-item>
                </md-list>
            </md-card-content>
            <md-card-actions></md-card-actions>
        </md-card>
    `,
})
export class UserSkills {
    constructor() { }
}