const mongoose = require('mongoose');

const afnOrderSchema = new mongoose.Schema({
    BuyerInfo: {
        BuyerEmail: {type: String, required: false},
        BuyerCounty: {type: String, required: false}
    },
    AmazonOrderId: {type: String, required: true, unique: true},
    EarliestShipDate: {type: String, required: true},
    SalesChannel: {type: String, required: true},
    OrderStatus: {type: String, required: true},
    NumberOfItemsShipped: {type: Number, required: true},
    OrderType: {type: String, required: true},
    IsPremiumOrder: {type: Boolean, required: true},
    IsPrime: {type: Boolean, required: true},
    FulfillmentChannel: {type: String, required: true},
    NumberOfItemsUnshipped: {type: Number, required: true},
    HasRegulatedItems: {type: Boolean, required: true},
    IsReplacementOrder: {type: String, required: true},
    IsSoldByAB: {type: Boolean, required: true},
    LatestShipDate: {type: String, required: true},
    ShipServiceLevel: {type: String, required: true},
    IsISPU: {type: Boolean, required: true},
    MarketplaceId: {type: String, required: true},
    PurchaseDate: {type: String, required: true},
    ShippingAddress: {
        StateOrRegion: {type: String, required: false},
        PostalCode: {type: String, required: false},
        City: {type: String, required: false},
        CountryCode: {type: String, required: false}
    },
    IsAccessPointOrder: {type: Boolean, required: true},
    SellerOrderId: {type: String, required: true},
    PaymentMethod: {type: String, required: true},
    IsBusinessOrder: {type: Boolean, required: true},
    OrderTotal: {
        CurrencyCode: {type: String, required: false},
        Amount: {type: String, required: false}
    },
    PaymentMethodDetails: [{type: String, required: true}],
    IsGlobalExpressEnabled: {type: Boolean, required: true},
    LastUpdateDate: {type: String, required: true},
    ShipmentServiceLevelCategory: { type: String, required: true },
    orderItems: [orderItemSchema]
});

const mfnOrderSchema = new mongoose.Schema({
        BuyerInfo: {
            BuyerEmail: {type: String, required: true},
            BuyerCounty: {type: String, required: true}
        },
        AmazonOrderId: {type: String, required: true, unique: true},
        EarliestShipDate: {type: String, required: true},
        SalesChannel: {type: String, required: true},
        OrderStatus: {type: String, required: true},
        NumberOfItemsShipped: {type: Number, required: true},
        OrderType: {type: String, required: true},
        IsPremiumOrder: {type: Boolean, required: true},
        IsPrime: {type: Boolean, required: true},
        FulfillmentChannel: {type: String, required: true},
        NumberOfItemsUnshipped: {type: Number, required: true},
        HasRegulatedItems: {type: Boolean, required: true},
        IsReplacementOrder: {type: String, required: true},
        IsSoldByAB: {type: Boolean, required: true},
        LatestShipDate: {type: String, required: true},
        ShipServiceLevel: {type: String, required: true},
        IsISPU: {type: Boolean, required: true},
        MarketplaceId: {type: String, required: true},
        PurchaseDate: {type: String, required: true},
        ShippingAddress: {
            StateOrRegion: {type: String, required: true},
            PostalCode: {type: String, required: true},
            City: {type: String, required: true},
            CountryCode: {type: String, required: true}
        },
        IsAccessPointOrder: {type: Boolean, required: true},
        SellerOrderId: {type: String, required: true},
        PaymentMethod: {type: String, required: true},
        IsBusinessOrder: {type: Boolean, required: true},
        OrderTotal: {
            CurrencyCode: {type: String, required: true},
            Amount: {type: String, required: true}
        },
        PaymentMethodDetails: [{type: String, required: true}],
        IsGlobalExpressEnabled: {type: Boolean, required: true},
        LastUpdateDate: {type: String, required: true},
        ShipmentServiceLevelCategory: { type: String, required: true },
        orderItems: [orderItemSchema]
})

const orderItemSchema = new mongoose.Schema({
    ProductInfo: {
        NumberOfItems: String
    },
    BuyerInfo: {},
    ItemTax: {
        CurrencyCode: String,
        Amount: String
    },
    QuantityShipped: Number,
    ItemPrice: {
        CurrencyCode: String,
        Amount: String
    },
    ASIN: String,
    SellerSKU: String,
    Title: String,
    ShippingTax: {
        CurrencyCode: String,
        Amount: String
    },
    IsGift: Boolean,
    ShippingPrice: {
        CurrencyCode: String,
        Amount: String
    },
    ShippingDiscount: {
        CurrencyCode: String,
        Amount: String
    },
    ShippingDiscountTax: {
        CurrencyCode: String,
        Amount: String
    },
    IsTransparency: Boolean,
    QuantityOrdered: Number,
    PromotionDiscountTax: {
        CurrencyCode: String,
        Amount: String
    },
    PromotionDiscount: {
        CurrencyCode: String,
        Amount: String
    },
    OrderItemId: String
});

module.exports = { afnOrderSchema, mfnOrderSchema };