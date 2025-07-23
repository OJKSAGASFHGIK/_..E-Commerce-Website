const express = require("express");
const ProductRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

ProductRoute.get(
    "/",
    asyncHandler(async(req, res) => {
        const products = await Product.find({});
        res.json(products);
    })
);

ProductRoute.get(
    "/:id",
    asyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id);
        if (product){
            res.json(product);
        } else {
            res.status(404);
            throw new Error("Product NOT FOUND.");
        }
    })
);

module.exports = ProductRoute;