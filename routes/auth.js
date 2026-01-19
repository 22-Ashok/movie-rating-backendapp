const router = require("express").Router();
const login = require("../controllers/login.js")
const signup = require("../controllers/signup.js")


router.post('/auth/login', login)
router.post('/auth/signup', signup)
//routes.post('/auth/signout', )

module.exports = router;

