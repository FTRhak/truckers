import { Injectable } from '@angular/core';

@Injectable()
export class AppSettins {
    constructor() { }

    get appName() {
        return 'Track';
    }

}
