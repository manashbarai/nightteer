const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    color:{
        rotate:Number,
        backgroundColor1:String,
        backgroundColor2:String,
        borderColor:String,
        textColor:String

    },
    time: {
        firstResult: String,
        secondResult: String
    },
    description:String
}, { timestamps: true });


const State = mongoose.model("State", stateSchema);

module.exports = State;
