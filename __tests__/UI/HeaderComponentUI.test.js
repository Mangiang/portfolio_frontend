const puppeteer = require('puppeteer');
const path = require('path');

describe('>>> HEADER COMPONENT', () => {
    let browser, page, httpServer;

    beforeAll(async (done) => {
        let express = require('express');
        let app = express();

        app.use(express.static(path.join(__dirname, '../../dist')));
        httpServer = app.listen(8082, () => console.log("Server listening on 8082"));


        browser = await puppeteer.launch({args: ['--no-sandbox'], headless: true});
        page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 1200,
                height: 1080
            },
            userAgent: ''
        }, 16000);

        await page.goto('http://localhost:8082/');
        console.log("FINISHED");
        done();
    });

    test('Check the page title', async () => {
        const pageTitle = await page.title();

        expect(pageTitle).toBe("Arthur Joly");
    });

    afterAll(async (done) => {
        await browser.close();
        await httpServer.close();
        done();
    }, 16000)
});
