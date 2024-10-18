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


router.get("/month/:year/:month", async (req, res) => {
    try {
        // Extract month from request parameters
        const { month,year } = req.params;

        // Query the database for records that match the specified month
        const records = await LotteryRecordChart.find({ month: month,year:year });

        // Check if records are found
        if (records.length === 0) {
            return res.status(404).json({ message: "No records found for the specified month." });
        }

        // Send the retrieved records in the response
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving records", error });
    }
});
router.post("/month/day/:year/:month/:day", async (req, res) => {
    try {
        const { ids } = req.body; // Get array of IDs from the request body
        const day = Number(req.params.day); // Get the day from route parameters
        const year = Number(req.params.year); // Get the year
        const month = Number(req.params.month); // Get the month
        
        const promises = ids.map(async (id) => {
            const record = await LotteryRecordChart.findOne({
                id: id,
                year: year,
                month: month,
            });
            
            
            if (record) {
                // Find the result for the specific day
                const filteredResult = record.resultList.find(r => r.day === day);

                // If found, return the single result object
                if (filteredResult) {
                    return {
                        id: record.id,
                        day: filteredResult.day,
                        month:record.month,
                        year:record.year,
                        result_1: filteredResult.result_1,
                        result_2: filteredResult.result_2,
                        _id: filteredResult._id, // Include the MongoDB ObjectId if needed
                    };
                }
            }
            // If no matching record or result found, return a default message
            return { id, message: "No result found for this day." };
        });

        const results = await Promise.all(promises); // Wait for all promises to resolve
        res.json(results); // Send the results
    } catch (error) {
        res.status(500).json({ message: "Error retrieving records", error });
    }
});



module.exports = router;
