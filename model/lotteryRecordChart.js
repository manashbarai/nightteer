const mongoose = require("mongoose")

const lotteryRecordChartSchema = new mongoose.Schema({

    year: String,
    month: Number,
    resultList: [
        {
            day:Number,
            DateTime: Number,
            result:[

                {
                    id:Number,
                    result_1:String,
                    result_2:String,

                }
            ]
        }
    ]




}, { timestamps: true })

const LotteryRecordChart = mongoose.model("lotteryRecordChart", lotteryRecordChartSchema)
module.exports = LotteryRecordChart;