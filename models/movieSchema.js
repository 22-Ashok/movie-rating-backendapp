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
        require:true,
        min:1,
        max:5
    },

    totalRating:{
        type:Number,
        min:0,
        max:1000,
        require:true
    },

    releaseDate:{
        type:Date,
        require:true
    }

})

const MovieModel = mongoose.Model("MovieModel", MovieSchema);

module.exports = MovieModel