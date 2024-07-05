const axios = require('axios');

class AmazonSellerAuth {
    
    #accessToken;
    
    constructor(logger) {
        this.clientId = process.env.SELLER_CLIENT_ID;
        this.clientSecret = process.env.SELLER_CLIENT_SECRET;
        this.refreshToken = process.env.SELLER_REFRESH_TOKEN;
        this.authUrl = 'https://api.amazon.com/auth/o2/token';
        this.tokenExpireTime = 0;

        this.logger = logger;
    }

    async fetchAccessToken() {
        
        const tokenIsExpired = this.verifyTokenIsExpired();

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'UserAgent': 'seller-manager v1.0.0 (Ubuntu 22.04.4 LTS)'
        }

        const body = `?grant_type=refresh_token&refresh_token=${encodeURIComponent(this.refreshToken)}&client_id=${encodeURIComponent(this.clientId)}&client_secret=${encodeURIComponent(this.clientSecret)}`;
        
        const options = {
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            headers: headers,
        }

        const url = this.authUrl + body
        const now = new Date()

        try {
            const response = tokenIsExpired ? await axios.post(url, options) : null;
            if (response) {
                const data = response.data;
                this.tokenExpireTime = now.getTime() + 3590000;
                this.#accessToken = data.access_token;
                this.logger.log(`Access token successfully obtained!`);
                return this.accessToken;
            } else {
                this.logger.log('Token still valid!')
                return this.accessToken;
            }
        } catch (error) {
            console.log(error)
        }
    }

    verifyTokenIsExpired() {
        const now = new Date();
        if (this.tokenExpireTime - now.getTime() <= 0) {
            this.logger.log('Token expirado ou inexistente');
            return true;
        } else {
            console.log('Token válido e irá expirar em ' + (this.tokenExpireTime - now.getTime()) / 1000 + "s");
            return false;
        }
    }

    getAccesToken(){
        if (this.#accessToken){
            return this.#accessToken;
        } else {
            throw new Error("Access Token hasn't been fetch yet.")
        }
    }

}

module.exports = AmazonSellerAuth;