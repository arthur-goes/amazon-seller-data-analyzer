const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();

const AmazonSellerAuth = require('./api/amazonSellerAuth');
const AmazonSellerOrders = require('./api/amazonSellerApi');
const Logger = require('./utils/logger');

const app = express();

app.use(express.json());

const logger = new Logger(true);
const amazonSellerAuth = new AmazonSellerAuth(logger);

app.get("/orders", async (req, res) => {
    const { dataInicial, dataFinal } = req.query;
    const accessToken = await amazonSellerAuth.getAccesToken();
    const amazonSellerOrders = new AmazonSellerOrders(accessToken, logger);
    amazonSellerOrders.getOrders(dataInicial, dataFinal);
})

const PORT = 3000;
app.listen(PORT, () => console.log('Server is running on port ' + PORT));