const redis = require("redis")
const wsc = require('./services/webScraperService')
const dbh = require('./db_handlers/mongoDbHandler')
const pMng = require('./scrapers/puppeteerScraper')
const db = require('./dals/mongoDbDal')

let subscriber = redis.createClient();
let mongoDbHandler = new dbh.MongodbHandler()
let webScraper = new wsc.WebScraperService(new pMng.PuppeteerScraper(), mongoDbHandler)
subscriber.on("message", async  function (channel, message) {
    console.log("Message: " + JSON.parse(message).links + " on channel: " + channel + " has arrive!");
    let data = JSON.parse(message)
    for (const link of data.links) {
        const urlModel = await mongoDbHandler.getUrl(link)
        if (!urlModel) {
            try {
                await webScraper.scrapeUrl(link, data.maxRecDepth)
            } catch (error) {
                console.log(error.toString())
            }
        } else{
            console.log("url already in db: " + link)
        }
    }
});

subscriber.subscribe("notification");
