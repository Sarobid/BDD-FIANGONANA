var serv = require("../../service/errorService");
var dekServ = require("./dekonina.service");
module.exports = function(app) {
    app.post("/dekonina",(req,res)=>{
        dekServ.adddekonina(req.body)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });

    app.post("/dekonina-fiche",(req,res)=>{
        dekServ.addFicheDekonina(req.body)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });

    app.post("/statistique-dekonina",(req,res)=>{
        console.log(req.body)
        dekServ.getStatistiqueDekonina(req.body.legende,req.body.filter)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
}