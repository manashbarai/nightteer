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
    console.log(name,email);
    
    const randomPassword = generateRandomPassword();    
    try {
        const user = new User({ name, email, password: randomPassword, role: 2 });
        const saveUser = await user.save();
        res.json(saveUser);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email) {
            return res.status(400).json({
                message: `The email '${error.keyValue.email}' is already registered. Please use a different email.`,
            });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        console.log("Hello");
        
      // Extract the update data dynamically from req.body
      const data = req.body; // This will contain the key-value pairs you want to update
      console.log(data);
      
      // Find the user by ID and update with the dynamic fields
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: data },  // Dynamically set the fields to update
        { new: true }  // Return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  



router.get("/all", async (req, res) => {
    const { role } = req.query;
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
  
    try {
        // Skip (page-1) * limit results and limit the number of results
        const users = await User.find({ role: role })
            .skip((page - 1) * limit)  // Skip the previous pages' results
            .limit(limit);  // Limit the number of results to 'limit'
        
        const total = await User.countDocuments({ role: role });  // Get the total count of matching documents
        
        
        res.status(200).json({
            total,  // Total number of users with the given role
            page,   // Current page
            pages: Math.ceil(total / limit),  // Total number of pages
            users   // Users for the current page
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});



router.post("/login", async (req, res) => {
    const { email,password } = req.body;


    const userExist=await User.findOne({'email':email})
    if(!userExist) createError(400,"User not found")
    if(userExist.role===2 && userExist.login_count===0){
        const password_update_url=`${process.env.CLIENT_URL}update_password/${userExist._id}`
        res.status(201).json({url:password_update_url});
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

module.exports = router;
