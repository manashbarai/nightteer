require("dotenv").config()

require("mongoose").connect(process.env.DATA).then(()=>{
    console.log("Success");
}).catch((error)=>{
    console.log("Error",error);
})