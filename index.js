const express = require('express')
const app = express()
const cors = require("cors")
require("./db")
require("dotenv").config()
const port = process.env.PORT || 8080
app.use(express.json())
app.use(cors())


  


app.use("/api/user",require("./route/user"))
app.get("/",async(req,res)=>{
    try {
        res.send("I am On")
    } catch (error) {
        console.log(error);
        
    }
})
app.use("/api/state",require("./route/state"))
app.use("/api/result",require("./route/result"))


app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 