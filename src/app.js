const express = require('express');
const bodyParser = require('body-parser')
const db = require('./dals/mongoDbDal')
const wsc = require('./services/webScraperService')
const mdbh = require('./db_handlers/mongoDbHandler')
const pscraper = require('./scrapers/puppeteerScraper')


const PORT = 3000;
const app = express();
let timeout = 120000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.post('/parse', async (req, res) => {
    req.setTimeout(timeout);
    try {
        let url = req.body.url
        let webScraper = new wsc.WebScraperService(new pscraper.PuppeteerScraper(), new mdbh.MongodbHandler())
        let data = await webScraper.scrapeUrl(url)
        let response = {
            msg: 'scraped html',
            html: data.html,
            links: data.links
        }
        res.send(response)
    } catch (error) {
        res.status(400).send({error: error.toString()})
    }
});


app.listen(PORT);
console.log(`Running on port: ${PORT}`);
