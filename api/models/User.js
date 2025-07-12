const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    }, { timestamps: true })

    // validade password match or not
    UserSchema.methods.matchPassword = async function(enterPassword){
        return await bcrypt.compare(enterPassword, this.password);
    };


    module.exports = mongoose.model("User", UserSchema);