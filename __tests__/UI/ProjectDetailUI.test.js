const path = require('path');
const ScreenTest = require('puppeteer-screenshot-tester');

const {serverStart, serverClose} = require('./TestsUtils');

const url = 'http://localhost';
const port = 8084;

describe('>>> PROJECT DETAIL', () => {
    let browser, page, httpServer;

    beforeAll(async (done) => {
        [browser, httpServer] = await serverStart(url, port);
        done();
    });

    beforeEach(async (done) => {
        page = await browser.newPage();
        page.emulate({
            viewport: {
                width: 1200,
                height: 1080
            },
            userAgent: ''
        }, 16000);
        done();
    });

    test('Check the page title', async (done) => {
        await page.goto(`${url}:${port}`, {waitUntil:'networkidle0'});
        await page.click('a');

        const pageTitle = await page.title();

        expect(pageTitle).toBe("Arthur Joly");
        done();
    });

    test('Check the project detail screenshot', async (done) => {
        const tester = await ScreenTest();

        await page.goto(`${url}:${port}`, {waitUntil:'networkidle0'});
        await page.click('a');
        const result = await tester(page, 'screenshots/projectDetail');

        expect(result).toBe(true);
        done();
    });

    afterAll(async (done) => {
        await serverClose(browser, httpServer);
        done();
    }, 16000)
});
