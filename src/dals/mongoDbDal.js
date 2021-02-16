let mongoose = require('mongoose');

const server = 'cluster0.vwdlp.mongodb.net';
const database = 'web_scraper';
const user_name = 'amir'
const password = 'amir1234'

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb+srv://${user_name}:${password}@${server}/${database}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()
