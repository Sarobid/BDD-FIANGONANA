const client = require("../../db");
async function adddekonina(body){
    let values = [body.mpiangonaid,'now()',null];
    if(body.datedebut){
        values[1] = body.datedebut;
    }
    let sql = `INSERT INTO "public".dekonina
	( mpiangonaid, datedebut, datefin) VALUES ( $1, $2, $3 );`
    try {
        let d = await client.query(sql,values);
        return d.rows;
    } catch (error) {
        throw error;
    }
}
exports.adddekonina = adddekonina;

async function addFicheDekonina(body){
    console.log(body);
    try {
        if(body.numfichempiangona === ""){
            throw new Error("Num fiche doit etre declarer");
        }
        let values = [body.numfichempiangona,'now()',body.mpiangonaid];
        if(body.datedebut){
            values[1] = body.datedebut;
        }
        let sql = `INSERT INTO "public".distributiondekonina
        ( numfiche, datedebut, mpiangonaid) VALUES ( $1, $2, $3 );`
        let d = await client.query(sql,values);
        return d.rows;
    } catch (error) {
        throw error;
    }
}
exports.addFicheDekonina = addFicheDekonina;
