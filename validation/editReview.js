const {z} = require('zod');

const reviewSchema = z.object({
    comment:z.string().min(1).max(150).trim().optional(),
    rating:z.number().min(1).max(5).optional()
}).strict();

module.exports = reviewSchema