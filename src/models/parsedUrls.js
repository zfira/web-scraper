let mongoose = require('mongoose')

let parsedUrlSchema = new mongoose.Schema({
        url: {type: String, unique: true},
        html: {type: String, required: true},
    },
    {collection: 'url_html',
    timestamps: true})

module.exports = mongoose.model('ParsedUrl', parsedUrlSchema)
