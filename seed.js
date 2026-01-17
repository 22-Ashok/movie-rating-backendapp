require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require("./models/userSchema");

async function seedAdmin(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("db connected successfully");
        const isAdmin = await User.findOne({role:"admin"});

        if(isAdmin){
            console.log("admin exsists");
            process.exit(0);
        }

        const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        await User.create({
            name:" i am admin",
            email:process.env.ADMIN_EMAIL,
            password:hashPassword,
            role:"admin"
        })

        console.log("admin is created");
        process.exit(0);
    }

    catch(err){
        console.log(err);
        process.exit(1);
    }
}

seedAdmin(); 