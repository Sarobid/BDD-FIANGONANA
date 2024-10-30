var ficheServ = require("./fiche.service");
var serv = require("../../service/errorService");

module.exports = function(app) {
    app.post("/fiches/:num/:nombrepage",(req,res)=>{
        ficheServ.getAll(req.body,req.params.num,req.params.nombrepage)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });

    app.post("/statistique-fiche",(req,res)=>{
        console.log(req.body)
        ficheServ.getStatistiqueFiche(req.body.legende,req.body.filter)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
}