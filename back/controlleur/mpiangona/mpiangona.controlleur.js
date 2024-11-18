var mpiangServ = require("./mpiangona.service");
var serv = require("../../service/errorService");

module.exports = function (app) {
    app.get("/mpiangona/:id",(req,res)=>{
        mpiangServ.findById(req.params.id)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    })
    app.get("/mpiangona/option/:option",(req,res)=>{
        mpiangServ.getAllOptions(req.params.option)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
    app.post("/mpiangona",(req,res)=>{
        mpiangServ.insertion(req.body.data)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });
    app.post("/mpiangona-state-mpandray",(req,res)=>{
        mpiangServ.getStatistiqueMpandray(req.body)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(err.status || 400);
            serv.analyseError(err).then(error=>{res.send(error)})
        });
    });

    app.post("/mpiangona-state-batisa",(req,res)=>{
        mpiangServ.getStatistiqueBatisa(req.body)
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