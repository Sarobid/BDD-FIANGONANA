var server = require("./server");
var http = require("http");
var express = require("express");
const cors = require("cors");

const db = require("./db");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: ["http://localhost:4200","http://41.188.43.90:8082"]
};
app.use(cors(corsOptions));

require("./controlleur/genre/genre.controlleur")(app);
const httpServ = http.createServer(app);
server.start(httpServ);