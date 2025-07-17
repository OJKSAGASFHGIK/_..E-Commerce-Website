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

// register password hash and store
UserSchema.pre(
    "save", async function(next){
    if (!this.isModified("password")) { next(); };
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);