const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
    title:{
        type:String,
        minLength:1,
        maxLength:50,
        trim:true,
        require:true,
        index:true
    },

    genre:{
        type:String,
        minLength:3,
        maxLength:50,
        trim:true,
        require:true
    },

    avgRating:{
        type:Number,
        min:0,
        max:5,
        default:0,
        require:true
    },

    totalRating:{
        type:Number,
        default:0,
        require:true
    },

    releaseDate:{
        type:Date,
        require:true
    }
},

{
    timestamps:true
})

const MovieModel = mongoose.model("MovieModel", MovieSchema);

module.exports = MovieModel