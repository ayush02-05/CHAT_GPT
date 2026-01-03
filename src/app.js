require("dotenv").config();
const express = require("express");
const cookieparser = require("cookie-parser");
const UserRoute = require("../src/routes/user.routes");

const app = express();

// middleware
app.use(express.json());
app.use(cookieparser());
app.use("/user", UserRoute);

module.exports = app;
