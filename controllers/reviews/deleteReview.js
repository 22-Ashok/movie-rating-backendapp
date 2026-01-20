const reviews = require("../../models/reviewSchema")
const movies = require("../../models/movieSchema")

async function deleteReview(req,res){
   try{
      const movieId = req.params.movieId;

      if(!mongoose.Types.ObjectId.isValid(movieId)){
        return res.status(400).json({
            msg:"movieId is invalid"
        })
      }

      // i need to check user review then delete
      const userId = req.user.userId;
      const review = await reviews.findOneAndDelete({
        userId,
        movieId
      });

      if(!review){
        return res.status(404).json({
            msg:"user did not comment.."
        })
      }

      await movies.findByIdAndUpdate(movieId, 
        {$inc:
            {ratingSum:-review.rating, totalRating:-1}
        }
      )

      return res.status(200).json({
        msg:"comment deleted successfully"
      })
   }

   catch(err){
    console.log(err);
    return res.status(500).json({
        msg:"Internal Server Error"
    })
   }
}

module.exports = deleteReview