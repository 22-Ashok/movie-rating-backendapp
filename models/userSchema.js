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
        enum:["admin", "user"],
        require:true
    },

    createdAt:Date
});

const UserModel = mongoose.Model('UserModel', UserSchema);

module.exports = UserModel;