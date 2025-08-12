const router = require("express").Router();
const user = require("./models/User");
const users = require("./data/Users");
const product = require("./models/Product");
const products = require("./data/Products");
const asyncHandler = require("express-async-handler");

router.post("/users", asyncHandler(async(req, res)=>{
    await user.deleteMany({});
    const userSeeder = await user.insertMany(users);
    res.send({userSeeder})
}));

router.get("/products", asyncHandler(async(req, res)=>{
    await product.deleteMany({});
    const productSeeder = await product.insertMany(products);
    res.send({productSeeder})
}));

module.exports = router;
