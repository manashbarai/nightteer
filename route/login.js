
const User = require("../model/user");
const createError = require("../util/createError");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
router.post("/", async (req, res) => {
    const { email, password } = req.body;
        
        
        
    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        

       // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            if(user.password!==password){

                return res.status(400).json({ message: "Invalid email or password" });
            }
        }
        console.log(user);
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Payload
            JWT_SECRET, // Secret key
            { expiresIn: "1h" } // Token expiration
        );

        // Set JWT token in an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "strict", // Protects against CSRF attacks
            maxAge: 3600000, // 1 hour in milliseconds
        });

        // Successful login response
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
