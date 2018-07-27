const puppeteer = require('puppeteer');
const path = require('path');

export async function serverStart(url, port){
    const express = require('express');
    const puppeteer = require('puppeteer');

    let app = express();


    app.use(express.static(path.join(__dirname, '../../dist')));
    app.get('*',function(req, res) {
        res.sendFile(path.join(__dirname, '../../dist/index.html'), function(err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    });

    let httpServer = app.listen(port, () => console.log(`Server listening on ${port}`));


    let browser = await puppeteer.launch({args: ['--no-sandbox'], headless: true});

    return [browser, httpServer];
}

export async function serverClose(browser, httpServer){
    await browser.close();
    await httpServer.close();
}