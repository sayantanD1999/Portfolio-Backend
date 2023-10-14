const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
require('dotenv').config();
app.use(cors())


// require('./app/routes/auth.routes')(app);

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


const db = require("./app/models");

db.mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        // initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


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