const express = require('express')
const app = express()
const cors = require("cors")
require("./db")
require("dotenv").config()
const port = process.env.PORT
app.use(express.json())
app.use(cors())


  





app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 