const mongoose = require("mongoose");
const movies = require("../../models/movieSchema");

async function getMovie(req,res){
    try{
        const {movieId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(movieId)){
            return res.status(400).json({
                msg:"invalid movieId"
            })
        }

        const movie = await movies.findById(movieId);
        
        if(!movie){
            return res.status(400).json({
                msg:"invalid movieId"
            })
        }

        return res.status(200).json({
            msg:movie
        })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}

module.exports = getMovie