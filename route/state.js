const express = require("express");
const State = require("../model/state");
const router = express.Router();

// Create (POST)
router.post("/", async (req, res) => {
    try {
        const { name, id } = req.body;
        console.log(req.body);
        
        // Check if the state with the same name or id already exists
        const existingState = await State.findOne({ $or: [{ name }, { id }] });

        if (existingState) {
            return res.status(400).json({
                message: "State with the same name or id already exists",
            });
        }

        // If not, create a new state
        const newState = new State(req.body);
        const savedState = await newState.save();
        res.status(201).json(savedState);

    } catch (error) {
        res.status(500).json({ message: "Error creating state", error });
    }
});


// Read (GET all states)
router.get("/", async (req, res) => {
    try {
        const states = await State.find();
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving states", error });
    }
});

// Read (GET single state by ID)
router.get("/:id", async (req, res) => {
    try {
        const state = await State.findById(req.params.id);
        if (!state) {
            return res.status(404).json({ message: "State not found" });
        }
        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving state", error });
    }
});
// Update (PUT)
router.put("/:id", async (req, res) => {
    
    try {
        const updatedState = await State.findByIdAndUpdate(
           req.params.id,
            req.body, // correctly passing the data to update
            { new: true } // return the updated document
        );
        if (!updatedState) {
            return res.status(404).json({ message: "State not found" });
        }
        res.status(200).json(updatedState);
    } catch (error) {
        res.status(500).json({ message: "Error updating state", error });
    }
});

// Delete (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedState = await State.findByIdAndDelete(req.params.id);
        if (!deletedState) {
            return res.status(404).json({ message: "State not found" });
        }
        res.status(200).json({ message: "State deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting state", error });
    }
});

module.exports = router;
