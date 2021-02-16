const {IScraper} = require("./IScraper");
const puppeteer = require('puppeteer')
const {StringUtils} = require("../utils/stringUtils");

class PuppeteerScraper extends IScraper{
    constructor() {
        super();
    }

    async parse(url, maxSubUrls = 0) {
        console.log('parseSingleUrl with the following url', url)
        if (new StringUtils().validateUrl(url) === false){
            throw new Error(`invalid url ${url}`);
        }
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-gpu",
            ]
        });
        const page = await browser.newPage()
        await page.goto(url, {waitUntil: 'networkidle0'});
        let html = await page.content()
        let hrefs = await page.$$eval('a', as => as.map(a => a.href));
        if (maxSubUrls) {
            hrefs = hrefs.slice(0, maxSubUrls)
        }
        console.log(hrefs)
        await page.close()
        await browser.close();
        return {html: html, links: hrefs}
    }

    async parseRec(url, recDepth, parsedLinks){
        if (recDepth !== 0 && !parsedLinks.map(a => a.url).includes(url)){
            try {
                let data = await this.parse(url)
                parsedLinks.push({url: url, html: data.html})
                let promises = []
                for (const link of data.links) {
                    promises.push(this.parseRec(link, recDepth - 1, parsedLinks))
                }
                await Promise.all(promises)
            }
            catch (error) {
                console.error(error.toString())
            }
        }
    }

    async parseUrlAndSubUrls(url){
        let parsedLinks = []
        await this.parseRec(url, 1, parsedLinks)
        console.log(parsedLinks.map(a => a.url))
        return parsedLinks
    }
}

module.exports = {PuppeteerScraper}
