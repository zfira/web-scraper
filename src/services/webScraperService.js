const redis = require("redis")
let publisher = redis.createClient(6379);

class WebScraperService {
    constructor(scraper, dbHandler) {
        this.scraper = scraper
        this.dbHandler = dbHandler

    }

    async scrapeUrl(url, maxRecDepth = 10) {
        let data = await this.scraper.parse(url)
        await this.dbHandler.saveUrl(url, data.html)
        await this.publishSubUrls(data.links, maxRecDepth)
        return data
    }

    async publishSubUrls(links, maxRecDepth){
        if (maxRecDepth > 0) {
            publisher.publish('notification', JSON.stringify({
                links: links,
                maxRecDepth: maxRecDepth - 1
            }), function () {
                console.log("sent")
            });
        }
    }
}

module.exports = {WebScraperService}
