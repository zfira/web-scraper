class IScraper{
    async parse(url){
        throw new Error('getHtml not implemented');
    }
}

module.exports = {IScraper}
