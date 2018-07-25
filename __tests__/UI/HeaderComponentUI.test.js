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
        await page.waitForSelector('.sc-bdVaJa');

        const pageTitle = await page.title();

        expect(pageTitle).toBe("Arthur Joly");
    });


    test('Check the background image name', async () => {
        await page.waitForSelector('.sc-bdVaJa');

        let backgroundImage = await page.$eval('.sc-bdVaJa', e => e.getAttribute("src"));

        expect(backgroundImage.startsWith("/static/media/backgroundImage")).toBe(true);
    }, 16000);

    test('Check the background image extension', async () => {
        let backgroundImage = await page.$eval('.sc-bdVaJa', e => e.getAttribute("src"));
        expect(backgroundImage.endsWith(".jpg")).toBe(true);
    }, 16000);


    test('Check the title text', async () => {
        await page.waitForSelector('#title');

        let titleVal = await page.$eval('#title', e => e.innerHTML);

        expect(titleVal).toBe("Arthur Joly's portfolio");
    });

    afterAll(async (done) => {
        await browser.close();
        await httpServer.close();
        done();
    }, 16000)
});
