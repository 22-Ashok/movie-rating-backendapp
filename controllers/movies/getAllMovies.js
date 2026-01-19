const movies = require("../../models/movieSchema")

async function getAllMovies(req,res) {
    try{
        let {page=1,limit=20} = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        if(isNaN(page) || page < 1) page=1;
        if(isNaN(limit) || limit<1 || limit>20) limit=20;

        const totalMovies = await movies.countDocuments();
        const totalPages = Math.ceil(totalMovies/limit);
        const hasNextPage = totalPages > page;
        const hasPrevPage = page > 1;

        const skip = (page - 1) * limit;

        const moviesList = await movies.aggregate([
            {$sort:{releaseDate:-1, avgRating:-1}},
            {$skip:skip},
            {$limit:limit}
        ]);

        return res.status(200).json({
            page,
            limit,
            count:moviesList.length,
            data:moviesList,
            hasNextPage,
            hasPrevPage,
            totalMovies,
            totalPages
        })
    }

    catch(err){
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}

module.exports = getAllMovies