import { APP_INITIALIZER, Injectable } from '@angular/core';

// Angular 2 Localization.
import { LocaleModule, LocalizationModule, LocaleService, LocalizationService } from 'angular2localization';

/**
 * Advanced initialization.
 * 
 * With these settings, translation file will be loaded before the app.
 */
@Injectable()
export class LocalizationConfig {

    constructor(public locale: LocaleService, public localization: LocalizationService) { }

    load(): Promise<any> {
        //https://en.wikipedia.org/wiki/ISO_4217
        // Adds the languages (ISO 639 two-letter or three-letter code).
        this.locale.addLanguages(['uk', 'en']);

        // Required: default language, country (ISO 3166 two-letter, uppercase code) and expiry (No days). If the expiry is omitted, the cookie becomes a session cookie.
        // Selects the default language and country, regardless of the browser language, to avoid inconsistencies between the language and country.
        this.locale.definePreferredLocale('uk', 'UA', 30);

        // Optional: default currency (ISO 4217 three-letter code).
        this.locale.definePreferredCurrency('UAH');

        // Initializes LocalizationService: asynchronous loading.
        this.localization.translationProvider('/languages/'); // Required: initializes the translation provider with the given path prefix.

        var promise: Promise<any> = new Promise((resolve: any) => {
            this.localization.translationChanged.subscribe(() => {
                resolve(true);
            });
        });

        this.localization.updateTranslation(); // Need to update the translation.

        return promise;
    }
}

/**
 * Aot compilation requires a reference to an exported function.
 */
export function initLocalization(localizationConfig: LocalizationConfig): Function {
    return () => localizationConfig.load();
}