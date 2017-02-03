import { Component, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
    selector: 'input-errors',
    template: `
        <span *ngIf="inputField" [hidden]="inputField.valid || inputField.pristine" class="tr-input-alert-danger">
            <span *ngIf="inputField.errors && inputField.errors.required">{{ 'general.errors.INP-0' | translate:lang }}</span>
            <span *ngIf="inputField.errors && inputField.errors.minlength">{{ 'general.errors.INP-1' | translate:lang }} {{inputField.errors.minlength.requiredLength}}.</span>
            <span *ngIf="inputField.errors && inputField.errors.maxlength">{{ 'general.errors.INP-2' | translate:lang }} {{inputField.errors.maxlength.requiredLength}}.</span>
            <span *ngIf="inputField.errors && inputField.errors.pattern">{{ 'general.errors.INP-3' | translate:lang }}.</span>
        </span>
    `,
})
export class InputValidationErrors {
    @Input() inputField: NgModel;
    constructor() { }
}