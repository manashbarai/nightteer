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
    time: {
        firstResult: String,
        secondResult: String
    }
}, { timestamps: true });


const State = mongoose.model("State", stateSchema);

module.exports = State;
