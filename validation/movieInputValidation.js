const {z} = require("zod");

const movieInputSchema = z.object({
    title:z.string().min(1).max(50),
    genre:z.string().min(3).max(50),
    releaseDate:z.coerce.date().max(new Date(), {error:"release date cannot be future"})
})

module.exports = movieInputSchema