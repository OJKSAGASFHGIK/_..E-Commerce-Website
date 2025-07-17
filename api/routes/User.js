const express = require("express");
const UserRoute = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const GenerateToken = require("../tokenGenerator");
const AuthenticantionProtect = require("../middleware/Auth");

UserRoute.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))){
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: GenerateToken(user._id),
                createdAt: user.createdAt,
            });
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password.");
        }
    })
);

// register route
UserRoute.post("/", asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser){
        res.status(400);
        throw new Error("User already exist.");
    } else {
        const user = await User.create({ name, email, password });
        if (user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data.");
        }    
    }
}));

// get auth profile data
UserRoute.get(
    "/profile",
    AuthenticantionProtect,
    asyncHandler(async(req, res) => {
        const user = await User.findById(req.user._id);
        if (user){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
            });
        } else {
            res.status(404);
            throw new Error("USE NOT FOUND.")
        }
    })
);

module.exports = UserRoute;
