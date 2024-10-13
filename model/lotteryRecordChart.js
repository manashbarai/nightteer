const mongoose = require("mongoose")

const lotteryRecordChartSchema = new mongoose.Schema({

    id: Number,
    year: String,
    month: Number,
    resultList: [
        {
            day: Number,
            result_1: String,
            result_2: String,



        }
    ]




}, { timestamps: true })

const LotteryRecordChart = mongoose.model("lotteryRecordChart", lotteryRecordChartSchema)
module.exports = LotteryRecordChart;