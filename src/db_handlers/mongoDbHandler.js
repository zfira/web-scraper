const UrlModel = require('../models/parsedUrls')

class MongoDbHandler {
    async saveUrl(url,html) {
        console.log(`saving url ${url}`)
        try {
            const urlModel = await this.getUrl(url)
            if (urlModel) {
                console.log("Found url model")
                urlModel.html = html
                await urlModel.save()
            } else {
                const res = await UrlModel.create({
                    url: url,
                    html: html
                })
                console.log("added record!")
            }
        } catch (error) {
            console.error(error)
            // handle the error
        }
    }

    async getUrl(url) {
        return UrlModel.findOne({url: url})
    }
}

module.exports = {MongodbHandler: MongoDbHandler}
