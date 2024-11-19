var server = require("./server");
var http = require("http");
var express = require("express");
const cors = require("cors");

const db = require("./db");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: ["https://front-isotry-ft.onrender.com","http://localhost:3000"]
};
app.use(cors(corsOptions));

require("./controlleur/genre/genre.controlleur")(app);
require("./controlleur/mpiangona/mpiangona.controlleur")(app);
require("./controlleur/fiche/fiche.controlleur")(app);
require("./controlleur/dekonina/dekonina.controlleur")(app);
const httpServ = http.createServer(app);
server.start(httpServ);