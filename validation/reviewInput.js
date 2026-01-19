const {z} = require('zod');

const reviewSchema = z.object({
    comment:z.string().min(1).max(150).trim(),
    rating:z.number().min(1).max(5)
})

module.exports = reviewSchema