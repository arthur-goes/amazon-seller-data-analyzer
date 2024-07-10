const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const AmazonSellerAuth = require('./seller-api/amazonSellerAuth');
const AmazonSellerOrders = require('./seller-api/amazonSellerOrders');
const DateHandler = require('./utils/dateHandler');
const Logger = require('./utils/logger');

const { afnOrderSchema, mfnOrderSchema } = require('./models/ordersModels');

const app = express();

app.use(express.json());

//mongoose.connect('mongodb://127.0.0.1:27017/amz-seller');

const logger = new Logger(true);
const amazonSellerAuth = new AmazonSellerAuth(logger);

app.get("/orders", async (req, res) => {
    const { date1, date2 = null } = req.query;
    console.log(date2);
    const accessToken = await amazonSellerAuth.getAccesToken();
    const dateHandler = new DateHandler();
    const amazonSellerOrders = new AmazonSellerOrders(accessToken, logger);

    const AFNOrder = mongoose.model("AFNOrder", afnOrderSchema);
    const MFNOrder = mongoose.model("MFNOrder", mfnOrderSchema);

    const date1IsOk = dateHandler.validateDateString(date1);
    const date2IsOk = date2 ? dateHandler.validateDateString(date2) : true;

    if (date1IsOk && date2IsOk) {
        try {
            const response = await amazonSellerOrders.getOrders(date1, date2);
            console.log(JSON.stringify(response.Orders.filter((order) => order.FulfillmentChannel === "AFN"), null, 2));
            AFNOrder.insertMany(response.Orders.filter((order) => order.FulfillmentChannel === "AFN"));
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({message: "Erro ao obter os pedidos.", error: error.message});
        }
    } else {
        res.status(400).json({message: "Verifique as datas enviadas."});
    }
})

app.get("/order", async (req, res) => {

    const accessToken = await amazonSellerAuth.getAccesToken();
    const amazonSellerOrders = new AmazonSellerOrders(accessToken, logger);
    const order = await amazonSellerOrders.getOrder("701-1960338-7710667");
})

app.get("/orderItems", async (req, res) => {

    const accessToken = await amazonSellerAuth.getAccesToken();
    const amazonSellerOrders = new AmazonSellerOrders(accessToken, logger);
    
    try {
        const orderItems = await amazonSellerOrders.getOrderItems("702-1777232-4748251");
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(400).json({ message: "Erro ao obter os itens do pedido." });
    }
    })

const PORT = 3000;
app.listen(PORT, () => console.log('Server is running on port ' + PORT));
