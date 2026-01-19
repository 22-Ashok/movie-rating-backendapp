const mongoose = require("mongoose")
const movies = require("../../models/movieSchema")
const reviews = require("../../models/reviewSchema")
const reviewSchema = require("../../validation/reviewInput")

async function postReview(req,res){

    const {movieId} = req.params; // checks the type of the movie id 
    const { userId } = req.user;

    if(!mongoose.Types.ObjectId.isValid(movieId)){
        return res.status(400).json({
            msg:"invalid movieid"
        })
    }

    const {comment,rating} = req.body;

    const review = reviewSchema.safeParse(req.body);
    if(!review.success){
        return res.status(400).json({
            msg: review.error.issues.map(err => ({
                field:err.path.join("."),
                message:err.message
            }))
        })
    }
    
    let session;
    try{
        session = await mongoose.startSession(); // sart the transcation which ensure either completness or abort 
        session.startTransaction();
        await reviews.create(
            [{ comment, rating, userId, movieId }],
            { session }
        );

        const result = await movies.updateOne(
            { _id : movieId },
            { $inc: {ratingSum:rating, totalRating:1} },
            { session }
        )

        if (result.matchedCount === 0) {
            const err = new Error("Movie not found");
            err.statusCode = 404;
            throw err;
        }

        await session.commitTransaction();

        return res.status(201).json({
            msg:"comment added successfully"
        })
    }

    catch (err) {
        if (session?.inTransaction()) {
            await session.abortTransaction();
        }

        if (err.code === 11000) {
            return res.status(409).json({
            msg: "User already reviewed"
            });
        }

        return res.status(err.statusCode || 500).json({
            msg: err.message || "Internal server error"
        });

    } 

    finally {
        if (session) {
            session.endSession(); 
        }
    }
}

module.exports = postReview