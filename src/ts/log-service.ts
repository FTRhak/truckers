import { Injectable } from '@angular/core';

export class LogsTypes {
    debug: any[];
    info: any[];
    warning: any[];
    error: any[];
}

@Injectable()
export class LogService {
    name: string;
    logs: LogsTypes = new LogsTypes;
    constructor() {
        this.name = "main";
    }

    private showLog(t: any[]): void {
        console.log.apply(console, t);
    }

    debug(...args: any[]): void {
        var t = ["%s | %cDebug: ", this.name, "color:green"];
        t.push(...args);
        this.logs.debug.push(args);
        this.showLog(t);
    }
    info(...args: any[]): void {
        var t = ["%s | %cInfo: ", this.name, "color:blue"];
        t.push(...args);
        this.logs.debug.push(args);
        this.showLog(t);
    }
    warning(...args: any[]): void {
        var t = ["%s | %cWarning: ", this.name, "color:orange"];
        t.push(...args);
        this.logs.warning.push(args);
        this.showLog(t);
    }
    error(...args: any[]): void {
        var t = ["%s | %cError: ", this.name, "color:red"];
        t.push(...args);
        this.logs.warning.push(args);
        this.showLog(t);
    }
}



