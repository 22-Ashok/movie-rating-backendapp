const routes = require("express").Router();
const login = require("../controllers/login.js")
const signup = require("../controllers/signup.js")


routes.post('/auth/login', login)
routes.post('/auth/signup', signup)
//routes.post('/auth/signout', )

module.exports = routes;

