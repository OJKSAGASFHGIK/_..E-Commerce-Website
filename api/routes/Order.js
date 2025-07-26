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

// order payment
OrderRoute.put(
    "/:id/payment",
    AuthenticantionProtect,
    asyncHandler(async(req, res) => {
        const order = await Order.findById(req.params.id);
        if (order){
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                updated_time: req.body.create_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save();
            console.log(updatedOrder);
            res.status(200).json(updatedOrder);
        } else {
            res.status(404);
            throw new Error("Order not found.");
        }
    })
);

// get orders
OrderRoute.get(
    "/",
    AuthenticantionProtect,
    asyncHandler(async(req, res) => {
        const orders = await Order.find({ user: req.user._id }).sort({ _id:-1 });
        if (orders){
            res.status(200).json(orders);
        } else {
            res.status(404);
            throw new Error("Orders not found.")
        }
    })
);

// get one order by id
OrderRoute.get(
    "/:id",
    AuthenticantionProtect,
    asyncHandler(async(req, res) => {
        const order = await Order.findById(req.params.id).populate("user", "email");
        if (order){
            res.status(200).json(order);
        } else {
            res.status(404);
            throw new Error("Order not found.");
        }
    })

)

module.exports = OrderRoute;
