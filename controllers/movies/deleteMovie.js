const mongoose = require("mongoose")
const movies = require("../../models/movieSchema")

async function deleteMovie(req,res){
    try{
        const { movieId } =  req.params;
        if(!mongoose.Types.ObjectId.isValid(movieId)){
            return res.status(400).json({
                msg:"invalid movieId"
            })
        }

        const movie = await movies.findById({_id:movieId});

        if(!movie){
            return res.status(400).json({
                msg:"invalid movie id"
            })
        }

        await movies.findByIdAndDelete(movie._id);
        /* here i also need to delete all the reviews from the review collection..  do when making review route*/

        return res.status(200).json({
            msg:"movie deleted successfully"
        });
    }

    catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}

module.exports = deleteMovie