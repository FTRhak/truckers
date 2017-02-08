import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'user-current-delivery-order',
    template: `
        <md-card>
            <md-card-header class="layout-row">
                <div class="flex-auto">
                    <md-card-title >Current Order</md-card-title>
                </div>
                <div class="flex-none">
                    <button md-icon-button type="button" aria-label="Edit order">
                        <md-icon>&#xE254;</md-icon>
                    </button>
                </div>
            </md-card-header>
            <md-card-content>
                <md-list>
                    <md-list-item>Current order</md-list-item>
                </md-list>
            </md-card-content>
            <md-card-actions></md-card-actions>
        </md-card>
    `,
})
export class UserCurrentDeliveryOrder {
    constructor() { }
}