const User = require("../model/user");
const createError = require("../util/createError");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Hash the password before saving
  const salt = await bcrypt.genSaltSync(12);
  const hashPassword = await bcrypt.hashSync(password, salt);

  try {
    // Attempt to create a new user
    const user = new User({ name, email, password: hashPassword, role });
    const saveUser = await user.save();
    res.status(201).json(saveUser); // Return the saved user on success
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      // Handle MongoDB duplicate key error for the email field
      return res.status(400).json({
        message: `The email '${error.keyValue.email}' is already registered. Please use a different email.`,
      });
    }
    // General error handler
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
