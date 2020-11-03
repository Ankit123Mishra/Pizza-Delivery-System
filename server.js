require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const MongoDbStore = require("connect-mongo")(session);
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const url = "mongodb://localhost/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

//Session Config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //time in miliseconds ~ 24 hours
  })
);

app.use(flash());

//Global Middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Assets
app.use(express.static("public"));
app.use(express.json());

// Set Template Engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
