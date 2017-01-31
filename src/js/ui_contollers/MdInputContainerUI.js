(function (ng, app, Component, ROUTER_DIRECTIVES, Server) {
    'use strict';

    app.ui.MdInput = ng.core.Directive({
        selector: 'input.md-input, select.md-input, textarea.md-textarea',
        host: {
            "(focus)": "_focus($event)",
            "(blur)": "_blur($event)",
            "(input)": "_input($event)"
        },
        outputs: ['_focusEmitter', '_emptyEmitter'],
        directives: []
    }).Class({
        constructor: [ng.core.ElementRef, ng.core.Renderer, function MdInput(el, renderer) {
            this.element = el;
            this._focusEmitter = new ng.core.EventEmitter();
            this._emptyEmitter = new ng.core.EventEmitter();

            this._value = "";
            this._type = "text";
        }],
        ngAfterViewInit(){
            this._value = this.element.nativeElement.value;
            this._type = this.element.nativeElement.getAttribute('type');

            const empty = ((this._value == null || this._value === '') && this.type !== 'date');
            this._emptyEmitter.emit(empty);
        },

        _focus(ev) {
            this._focusEmitter.emit(true);
        },
        _blur(ev) {
            this._focusEmitter.emit(false);
        },
        _input(ev) {
            this._value = ev.target.value;
            const empty = ((this._value == null || this._value === '') && this.type !== 'date');
            this._emptyEmitter.emit(empty);
        },
        writeValue(value) {
            if (value !== undefined) {
                this.value = value;
                console.log('value changed2:', value);
            }
        },
        registerOnChange(fn) {
            this.propagateChange = fn;
        },

        registerOnTouched() { }
    });

    const prov = {
        provide: ng.common.NG_VALUE_ACCESSOR,
        useExisting: ng.core.forwardRef(() => con),
        multi: true
    };
    app.ui.MdInputContainer = ng.core.Component({
        selector: 'md-input-container',
        template: `
            <label></label>
            <input type="text" (_focusEmitter)="focus($event)" (_emptyEmitter)="empty($event)" (change)="change($event)" [(ngModel)]="value" class="ng-pristine md-input">
        `,
        host: {
            '[class.md-block]': 'true',
            '[class.md-input-focused]': 'inputFucused',
            '[class.md-input-has-value]': 'hasValue'
        },
        inputs: [
            'areaLabel: aria-label',
            'typeInput: type',
            'nameInput: name',
            'value'],
        directives: [app.ui.MdInput],
        //providers: [prov]
    }).Class({
        constructor: [ng.core.ElementRef, ng.core.Renderer, function MdInputContainer(el, renderer) {
            this.element = el.nativeElement;
            this.el = el;
            this._renderer = renderer;
            this.inputFucused = false;
            this.hasValue = false;
            //this.value = '';
        }],
        ngAfterViewInit() {
            let label = this.element.querySelector('label');
            if (label) {
                this.areaLabel && (label.innerHTML = this.areaLabel);
            }
            let input = this.element.querySelector('input');
            if (input) {
                input.setAttribute('type', this.typeInput);
                this.nameInput && input.setAttribute('name', this.nameInput);
            }
        },
        focus(ev) {
            this.inputFucused = ev;
        },
        empty(ev) {
            this.hasValue = !ev;
        },
        change(ev) {
            console.log("-change-", this.value);
        },
        writeValue(value) {
            if (value !== undefined) {
                this.value = value;
                console.log('value changed:', value);
            }
        },
        registerOnChange(fn) {
            this.propagateChange = fn;
        },

        registerOnTouched() { }
    });

})(
    ng,
    window.app,
    ng.core.Component,
    ng.router.ROUTER_DIRECTIVES,
    window.app.Server
    );