const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./models/dbConnection.js")

const app = express();

app.use(cors);
app.use(express.json());

app.get('/', (req,res) => {
    res.send("hello world");
})

dbConnection();

app.listen(8080, () => {
    console.log("app is listen at the 8080");
})