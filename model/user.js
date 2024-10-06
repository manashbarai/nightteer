const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: Number,
        default: 0
    },
    login_count: {
        type: Number,
        default: 0
    },
    changeStateName:Boolean,
    updateResult:Boolean,
    updateVipNumber:Boolean,
    deleteVipNumber:Boolean,
    deleteState:Boolean,
    blocked:Boolean


    
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
