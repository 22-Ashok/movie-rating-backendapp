const movieInputSchema = require("../../validation/movieInputValidation");
const movies = require("../../models/movieSchema");

async function addMovie(req,res){
    try{
        const{role} = req.user;
        if(role=="user"){
            return res.status(403).json({
                msg:"not allow to add movies"
            })
        }

        const {title,genre,releaseDate} = req.body;
        const isInputValid = movieInputSchema.safeParse({title,genre,releaseDate});

        if(!isInputValid.success){
            return res.status(400).json({
                err: isInputValid.error.issues.map(err => ({
                    field:err.path.join('.'),
                    message:err.message
                }))
                
            })
        }

        await movies.create({
            title,
            genre,
            releaseDate
        })

        return res.status(201).json({
            msg:"movie added successfully"
        })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}

module.exports = addMovie