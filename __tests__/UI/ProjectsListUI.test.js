const puppeteer = require('puppeteer');
const path = require('path');
const ScreenTest = require('puppeteer-screenshot-tester');

const {serverStart, serverClose} = require('./TestsUtils');

const url = 'http://localhost';
const port = 8083;

describe('>>> PROJECTS LIST', () => {
    let browser, page, httpServer;

    beforeAll(()=>{
        jest.setTimeout(10000);
    });

    beforeEach(async (done) => {
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

    test('Check the page title', async () => {
        await page.goto(`${url}:${port}/projectsList`, {waitUntil:'networkidle0'});
        const pageTitle = await page.title();

        expect(pageTitle).toBe("Arthur Joly");
    });

    test('Check the projects list screenshot', async (done) => {
        const tester = await ScreenTest();

        await page.goto(`${url}:${port}/projectsList`, {waitUntil:'networkidle0'});
        const result = await tester(page, 'screenshots/projectsList');

        expect(result).toBe(true);
        done();
    });

    afterEach(async (done) => {
        await serverClose(browser, httpServer);
        done();
    }, 16000)
});
