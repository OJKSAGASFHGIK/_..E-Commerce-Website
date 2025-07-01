const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
// test route
app.get("/", (req, res) => {
    res.send("App is running");
});

app.listen(PORT || 9000, ()=>{
    console.log(`Server listening on port ${PORT}`)
})