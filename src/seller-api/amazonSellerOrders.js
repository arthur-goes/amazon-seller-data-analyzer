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

        this.logger = logger;
    }

    async getOrders(date1, date2 = null) {
        const dateHandler = new DateHandler();
        const now = new Date();
        let queryParams = '';
        const datesString = [date1, date2];
        
        const dates = [
            dateHandler.dateStringToDate(datesString[0], "00:00:00"),
            date2 ? dateHandler.dateStringToDate(datesString[1], "23:59:59") : now
        ].sort((a,b) => a-b);

        queryParams = {
            CreatedAfter: dateHandler.toAmazonIsoDateTime(dates[0]),
            CreatedBefore: dateHandler.toAmazonIsoDateTime(dates[1]),
            MarketplaceIds: this.marketplaceId
        }

        const options = {
            method: 'get',
            headers: this.headers,
            params: queryParams
        }

        try {
            const response = await axios.get(this.baseUrl, options);
            //this.logger.log(`Dados consulta pedidos: ${JSON.stringify(response.data, null, 2)}`);
            return response.data.payload;
        } catch (error) {
            console.log(error);
        }
        
    }

    async getOrder(orderId) {
        const url = `${this.baseUrl}/${orderId}`

        const options = {
            method: 'get',
            headers: this.headers,
        }

        const response = await axios.get(url, options);
        const order = response.data.payload;
        return order;
    }

    async getOrderItems(orderId) {
        const url = `${this.baseUrl}/${orderId}/orderItems`

        const options = {
            method: 'get',
            headers: this.headers,
        }

        try {
            const response = await axios.get(url, options);
            //const orderItems = response.data.payload;
            return response;
        } catch (error){
            console.error(error);
            return
        }
    }

}

module.exports = AmazonSellerOrders;
