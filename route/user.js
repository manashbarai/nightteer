const User = require("../model/user");
const createError = require("../util/createError");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const generateRandomPassword = require('../util/generateRandom');


router.post("/signup", async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;


    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }


    const salt = await bcrypt.genSaltSync(12);
    const hashPassword = await bcrypt.hashSync(password, salt);

    try {

        const user = new User({ name, email, password: hashPassword, role });
        const saveUser = await user.save();
        res.status(201).json(saveUser);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email) {

            return res.status(400).json({
                message: `The email '${error.keyValue.email}' is already registered. Please use a different email.`,
            });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
});



router.post("/createuser", async (req, res) => {
    const { name, email } = req.body;

    const randomPassword = generateRandomPassword();    
    try {
        const user = new User({ name, email, password: randomPassword, role: 2 });
        const saveUser = await user.save();
        res.status(201).json(saveUser);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email) {
            return res.status(400).json({
                message: `The email '${error.keyValue.email}' is already registered. Please use a different email.`,
            });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
