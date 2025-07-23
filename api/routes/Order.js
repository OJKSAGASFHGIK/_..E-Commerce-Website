const express = require("express");
const OrderRoute = express.Router();
const AuthenticantionProtect = require("../middleware/Auth");
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

OrderRoute.post(
    "/",
    AuthenticantionProtect,
    asyncHandler(async(req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            taxPrice,
            totalPrice,
            price,
        } = req.body;
        console.log(orderItems)

        if (orderItems && orderItems.length === 0){
            res.status(400);
            throw new Error("No order items found.");
        } else {
            const order = new Order({
                shippingAddress,
                paymentMethod,
                shippingPrice,
                taxPrice,
                totalPrice,
                price,
                user: req.user._id,
            });

/*             const newOrder = new UserOrder({
                userId: '1',
                customerId: '1',
                productId: '686e00054ddd02c060749c85',
                quantity: 1,
                subtotal: 12 / 100,
                total: 12 / 100,
                payment_status: '3',
            });
 */
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    })
);

module.exports = OrderRoute;
