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
}, { timestamps: true }); 


const State = mongoose.model("State", stateSchema);

module.exports = State;
