const reviews = require("../../models/reviewSchema")
const movies = require("../../models/movieSchema")
const updateReviewSchema = require("../../validation/reviewInput")

async function editReview(req, res) {
  try {
    const { movieId } = req.params;
    const userId = req.user.userId;

    //  Validate body (sanitization + validation)
    const parsed = updateReviewSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        msg: "Invalid input",
        errors: parsed.error.errors
      });
    }

    const updates = parsed.data;

    // Reject empty PATCH
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        msg: "At least one field must be updated"
      });
    }

    //  Find review
    const review = await reviews.findOne({
      movie: movieId,
      user: userId
    });

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    const oldRating = review.rating;

    //  Apply updates
    if (updates.rating !== undefined) {
      review.rating = updates.rating;
    }

    if (updates.comment !== undefined) {
      review.comment = updates.comment;
    }

    await review.save();

    // Sync movie rating
    if (updates.rating !== undefined && updates.rating !== oldRating) {
      await movies.findByIdAndUpdate(movieId, {
        $inc: { ratingSum: updates.rating - oldRating }
      });
    }

    return res.status(200).json({
      msg: "Review updated successfully",
      review
    });

  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


module.exports = editReview