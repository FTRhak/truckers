//import { DOCUMENT } from '@angular/platform-browser';

describe("Start tests:", function () {
    beforeEach(function (done) {
        browser().navigateTo('/#/');
        sleep(15);
    });
    it('---------------', function (done) { });
});



describe("Login page ::", function () {

    beforeEach(function (done) {
        browser().navigateTo('/#/login');
        sleep(10);
    });

    afterEach(function (done) {
        //done();
    });

    it('check browser location "1"', function (done) {
        expect(element('#registration').count()).toBe(1);
    });

    it('check browser location "2"', function (done) {
        expect(element('#registration').count()).toBe(1);
    });
});
