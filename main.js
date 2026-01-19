const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./models/dbConnection.js")
const authRoute = require("./routes/auth.js")
const movieRoute = require("./routes/moviesRoute.js")
const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req,res) => {
    console.log(req.header);
    res.send("hello world");
})

app.use(authRoute);
app.use(movieRoute);

dbConnection();

app.listen(8080, () => {
    console.log("app is listen at the 8080");
})