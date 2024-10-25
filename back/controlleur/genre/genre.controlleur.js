var sexeServ = require("./genre.service");
var serv = require("../../service/errorService");

module.exports = function (app) {
    app.post("/genre",(req,res)=>{
        sexeServ.insertion(req.body)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
    app.get("/genres",(req,res)=>{
        sexeServ.getAll()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
}