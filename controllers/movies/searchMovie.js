const movies = require("../../models/movieSchema")

async function searchMovie(req,res){
    try{
        let {q, page=1, limit=10} = req.query;
        
        if(!q){
            return res.status(400).json({
                msg:"did not search anything"
            })
        }

        page = parseInt(page);
        limit=parseInt(limit);
        if(isNaN(page) || page < 1) page=1;
        if(isNaN(limit) || limit<1 || limit>20) limit=10;

        const skip = (page-1) * limit;
        const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // this will replace with (/) if any char matches in the regex list

        // here we use mongodb search feature that search field value matches to the given query it is acheived using $regex operator
        const filter = {       
            $or:[
                {title: {$regex:escapedQuery, $options:"i"}},
                {genre: {$regex:escapedQuery, $options:"i"}}
            ]
        }

        const searchMoviesList = await movies.find(filter).sort({releaseDate:-1}).skip(skip).limit(limit);

        res.status(200).json({
            limit,
            page,
            data:searchMoviesList,
            length:searchMoviesList.length
        })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    } 
}

module.exports = searchMovie