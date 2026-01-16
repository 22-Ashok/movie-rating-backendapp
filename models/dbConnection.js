const mongoose = require("mongoose");

async function dbConnection(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("db connected successfully");
    }

    catch(err){
        console.log("something is wrong with db connection")
    }
}

module.exports = dbConnection 