var mpiangServ = require("./mpiangona.service");
var serv = require("../../service/errorService");

module.exports = function (app) {
    app.post("/mpiangona",(req,res)=>{
        mpiangServ.insertion(req.body.data)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
    app.post("/mpiangonas/:num/:nombrepage",(req,res)=>{
        mpiangServ.getAll(req.body,req.params.num,req.params.nombrepage)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
}