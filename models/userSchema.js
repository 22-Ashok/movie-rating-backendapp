const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        maxLength:20,
        require:true,
        trim:true
    },

    email:{
        type:String,
        unique:true,
        require:true,
    },

    password:{
        type:String,
        require:true
    },

    role:{
        type:String,
        enum:["admin", "user"],
        require:true,
        default:"user"
    }},

    {
        timestamps:true
    }

);

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;