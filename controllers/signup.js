const users = require("../models/userSchema")
const {signUpSchema} = require("../validation/userInputSchema")
const tokenGen = require("../middlewares/jwtToken")
const bcrypt = require("bcrypt")


async function signup(req,res){
  try{
    const {name,email,password} = req.body;
    const isValidInput = signUpSchema.safeParse(req.body);

    if(!isValidInput.success){
      return res.status(400).json({err:isValidInput.error.issues.map(err => ({
        field:err.path.join("."),
        message:err.message
      }))
    })
  }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    const hashPass = await bcrypt.hash(password,10);

    const user = await users.create({
        name,
        email,
        password:hashPass,
        role:"user"
    });
    
    const token = tokenGen({
      userId:user._id,
      role:user.role
    });

    return res.status(201).json({
        msg:"user created successfully",
        token
    })
  }

  catch(err){
    console.log(err);
    return res.status(500).json({
      msg:"Internal server error"
    });
  }
}

module.exports = signup