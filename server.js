/* Showing Mongoose's "Populated" Method
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
//set handlebars
var exphbs = require("express-handlebars");

//set the PORT 
var PORT = process.env.PORT || 3000;

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/mongo-news-scrapper");
// mongoose.connect("mongodb://heroku_h8dd0v12:d4mvaopvotk4qqcjdasifn9ju3@ds155424.mlab.com:55424/heroku_h8dd0v12");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//import routes and give the server access to them
var routes = require("./controllers/mongoNewsScrapper_controller.js");

app.use("/", routes);
app.use("/articles", routes);
app.use("/articles/:id", routes);
app.use("/scrape", routes);




// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port" + PORT + "!");
});
