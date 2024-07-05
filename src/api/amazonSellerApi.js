const os = require('os');
const axios = require('axios');
const DateHandler = require('../utils/dateHandler');
const Logger = require('../utils/logger');

const logger = new Logger(true);


class AmazonSellerOrders {
    
    #accessToken;

    constructor(accessToken, logger) {
        const amazonSellerAuth = new AmazonSellerAuth(logger);
        this.marketplaceId = 'A2Q3Y263D00KWC';
        this.baseUrl = 'https://sellingpartnerapi-na.amazon.com';
        this.userAgent = `Express server on ${os.type()} - ${os.hostname()}`;
        this.#accessToken = accessToken;
        
        
        this.headers = {
            'User-Agent': `${this.userAgent}`,
            'Accept': 'application/json',
            'x-amz-access-token': this.accessToken(),
        }

        this.options = {
            method: 'get',
            headers: this.headers,
        }

        this.logger = logger;
    }

    async getOrders(date1, date2 = null) {
        const dateHandler = new DateHandler();
        
        const dates = [
            dateHandler.dateStringToDate(date1),
            dateHandler.dateStringToDate(date2)
        ]
        .sort((a,b) => a - b);
        this.logger.log(`Datas em ordem crescente: ${dates[0]}, ${dates[1]}}`);

        const body = null 

        //const response = await axios.get(this.baseUrl, this.options);
        //this.logger.log(`Dados consulta pedidos: ${response.data}`)
        
    }
}

module.exports = AmazonSellerOrders;
