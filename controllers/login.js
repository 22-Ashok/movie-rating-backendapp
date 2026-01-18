const users = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwtGen = require("../middlewares/jwtToken")
const {loginSchema} = require("../validation/userInputSchema")

async function loginUser(req,res){
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                err:"invalid input"
            })
        }

        const isValidInput = loginSchema.safeParse({email,password});
        if(!isValidInput.success){
            return res.status(400).json({
                err:"invalid email or password"
            })
        }

        const user = await users.findOne({email:email});
        if(!user) {
            return res.status(404).json({
                err:"user not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(401).json({
                err:"invalid email or password"
            })
        }
        
        
        const token = jwtGen({userId:user._id, role:user.role});
        return res.status(200).json({
            token,
            msg:"user login successfully"
        })
    }

    catch(err){
        console.log("something is messed up to loginUser contoller");
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports = loginUser