const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require('path');
const app = express();
require('dotenv').config();
const dbMongoose = require('./app/utils/db')
dbMongoose();



var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "portfolio-session",
        keys: ["COOKIE_SECRET"], // should use as secret environment variable
        httpOnly: true
    })
);

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));


// simple route
app.get("/", (req, res) => {
    try {
        res.json({ message: "Api running successfully" });
    } catch (err) {
        console.log(err)
    }

});


const route = require("./app/routes/index");
app.use("/", route);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});