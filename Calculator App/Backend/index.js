var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var mathjs = require("mathjs");
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var inputNode = {
  calculatedString: ""
};

app.post("/calculate", function(req, res) {
  console.log("Inside Calculate Post Request");
  console.log("Req Body : " + req.body.input);
  var inputString = req.body.input;

  try {
    inputNode.calculatedString = mathjs.evaluate(inputString);

    console.log(inputNode);
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    res.end(JSON.stringify(inputNode));
  } catch (e) {
    res.writeHead(201, {
      "Content-Type": "text/plain"
    });
    res.end("Invalid input");
  }
});

//start your server on port 3001

console.log("Hello world!");

app.listen(3001);
console.log("Server Listening on port 3001");
