const express = require("express");
const LotteryRecordChart = require("../model/lotteryRecordChart");
const router = express.Router();

router.post("/single", async (req, res) => {
    try {
        const clientData = req.body; 

        for (const data of clientData) {
            const { year, month, resultList, id } = data;
            const { day, result_1, result_2 } = resultList;

            // Find the existing record for the same ID and year
            const existingRecord = await LotteryRecordChart.findOne({ 
                id: id,
                year: year,
                month: month
            });

            if (existingRecord) {
                // Check if the day already exists in the resultList
                const dayExists = existingRecord.resultList.some(result => result.day === day);

                if (dayExists) {
                    // Update the existing day's results
                    existingRecord.resultList = existingRecord.resultList.map(result => {
                        if (result.day === day) {
                            result.result_1 = result_1 !== "" ? result_1 : result.result_1;
                            result.result_2 = result_2 !== "" ? result_2 : result.result_2;
                        }
                        return result;
                    });
                } else {
                    // If the day does not exist, push the new result into the resultList
                    existingRecord.resultList.push({
                        day: day,
                        result_1: result_1,
                        result_2: result_2
                    });
                }

                // Save the updated record
                await existingRecord.save();
            } else {
                // Create a new record if no existing record is found
                const newRecord = new LotteryRecordChart({
                    id: id,
                    year: year,
                    month: month,
                    resultList: [{
                        day: day,
                        result_1: result_1,
                        result_2: result_2
                    }]
                });
                await newRecord.save();
            }
        }

        res.json({ message: "Records processed successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error processing records", error });
    }
});


module.exports = router;
