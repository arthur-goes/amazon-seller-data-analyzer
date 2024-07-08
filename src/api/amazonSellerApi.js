const os = require('os');
const axios = require('axios');
const DateHandler = require('../utils/dateHandler');

class AmazonSellerOrders {
    
    #accessToken;

    constructor(accessToken, logger) {
        this.marketplaceId = 'A2Q3Y263D00KWC';
        this.baseUrl = 'https://sellingpartnerapi-na.amazon.com/orders/v0/orders';
        this.userAgent = `Express server on ${os.type()} - ${os.hostname()}`;
        this.#accessToken = accessToken;
        
        
        this.headers = {
            'User-Agent': `${this.userAgent}`,
            'Accept': 'application/json',
            'x-amz-access-token': this.#accessToken,
        }

        this.options = {
            method: 'get',
            headers: this.headers,
        }

        this.logger = logger;
    }

    async getOrders(date1, date2 = null) {
        const dateHandler = new DateHandler();
        const now = new Date();
        let queryParams = '';
        const datesString = [date1, date2];
        
        const dates = [
            dateHandler.dateStringToDate(datesString[0]),
            date2 ? dateHandler.dateStringToDate(datesString[1]) : now
        ].sort((a,b) => a-b);
        
        if (now.getTime() - dates[1].getTime() < 86400000) {
            queryParams = `?CreatedAfter=${encodeURIComponent(dateHandler.toAmazonIsoDateTime(dates[0]))}&MarketplaceIds=${this.marketplaceId}`
        } else {
            queryParams = `?CreatedAfter=${encodeURIComponent(dateHandler.toAmazonIsoDateTime(dates[0]))}&CreatedBefore=${encodeURIComponent(dateHandler.toAmazonIsoDateTime(dates[1]))}&MarketplaceIds=${this.marketplaceId}`
        }
        const url = `${this.baseUrl}?CreatedAfter=2024-07-01${encodeURIComponent("T00:00:00-03:00")}&MarketplaceIds=${this.marketplaceId}`

        try {
            const response = await axios.get(url, this.options);
            //this.logger.log(`Dados consulta pedidos: ${JSON.stringify(response.data, null, 2)}`);
            return response.data.payload;
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = AmazonSellerOrders;
