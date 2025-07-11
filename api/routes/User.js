const express = require("express");
const userRoute = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

userRoute.post(
    "login",
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if ()
    })
)