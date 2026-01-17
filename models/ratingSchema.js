const mongoose = require("mongoose");
const userModel = require("./userSchema");
const MovieModel = require("./movieSchema");

const RatingSchema = mongoose.Schema({
    comment:{
        type:String,
        require:true,
        minLength:3,
        maxLength:50
    },

    rating:{
        type:Number,
        min:1,
        max:5,
        require:true
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: userModel,
        require:true
    },

    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:MovieModel,
        require:true
    }
});

/* making compound index of the userId and movieId so that the user do not make multiple review */
RatingSchema.index(
    {userId:1, movieId:1},
    {require:true}
);

const RatingModel = mongoose.Schema('RatingModel', RatingSchema);

module.exports = RatingModel 