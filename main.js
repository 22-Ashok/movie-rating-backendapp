const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./models/dbConnection.js")
const authRoute = require("./routes/auth.js")
const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req,res) => {
    res.send("hello world");
})

app.use(authRoute);

dbConnection();

app.listen(8080, () => {
    console.log("app is listen at the 8080");
})