const ScreenTest = require('puppeteer-screenshot-tester');
const {serverStart, serverClose} = require('./TestsUtils');

const url = 'http://localhost';
const port = 8082;

describe('>>> MAIN PAGE', () => {
    let browser, page, httpServer;

    beforeAll(()=>{
        jest.setTimeout(20000);
    });

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

    test('Check the page title', async () => {
        await page.goto(`${url}:${port}`, {waitUntil: 'networkidle0'});
        const pageTitle = await page.title();

        expect(pageTitle).toBe("Arthur Joly");
    });

    test('Check the main page screenshot', async (done) => {
        const tester = await ScreenTest();

        await page.goto(`${url}:${port}`, {waitUntil: 'networkidle0'});
        const result = await tester(page, 'screenshots/mainPage');

        expect(result).toBe(true);
        done();
    });

    afterAll(async (done) => {
        await serverClose(browser, httpServer);
        done();
    }, 16000)
});
