const client = require("../../db");
var ficheServ = require("./../fiche/fiche.service");

const critereFiltre = [
    { title: "Nom/Prenom", data: "nomcompletmpiangona", typeData: 'input' },
    { title: "N° FICHE", data: "numfichempiangona", typeData: 'input' },
    { title: "ADIRESY", data: "adressempiangona", typeData: 'input' },
    { title: "ANARANA", data: "nommpiangona", typeData: 'input' },
    { title: "ANARANA", data: "nommpiangona", typeData: 'input' },
    { title: "FANAMPINY 1", data: "prenommpiangona", typeData: 'input' },
    {
        title: "DATY NAHATERAHANA", data: "datenaissancempiangona", typeData: 'date'
    },
    {
        title: "LAHY/ VAVY", data: "codegenrempiangona", typeData: 'select'
    },
    {
        title: "DATY BATISA", data: "datebatisa", typeData: 'date'
    },
    {
        title: "DEKONINA", data: "estdekonina", typeData: 'select'
    },
    { title: "TOERANA NANAOVANA BATISA", typeData: 'input', data: "lieubatisa" },
    { title: "MPANDRAY/ KATEKOMENA", data: "estmpandray", typeData: 'select' },
    {
        title: "DATY NANDRAISANA MFT", data: "datempandray", typeData: 'date'
    },
    { title: "TOERANA NANDRAISANA", data: "lieumpandray", typeData: 'input' },
    { title: "N° KARATRA MPANDRAY", data: "karatrampandray", typeData: 'input' },
    { title: "RAY", data: "nompere", typeData: 'input' },
    { title: "RENY", data: "nommere", typeData: 'input' },
    {
        title: "Telephone", data: "telephone", typeData: 'input'
    },
    { title: "EMAIL", data: "email", typeData: 'input' },
    { title: "MANAMBADY VITA SORATRA", data: "estvadysoratra", typeData: 'select' },
    { title: "MANAMBADY VITA FANAMASINANA", data: "estvadymasina", typeData: 'select' },
    { title: "MATY VADY", data: "matyvady", typeData: 'select' },
    { title: "NISARAKA", data: "nisarabady", typeData: 'select' },
    { title: "ASA", data: "asampiangona", typeData: 'input' },
    { title: "TOERANA IASANA", data: "lieuasa", typeData: 'input' }
]

async function getStatistiqueDekonina(body,mpiangona) {
    let condition = "";
    for (let i = 0; i < critereFiltre.length; i++) {
        if (mpiangona[critereFiltre[i].data]) {
            if (mpiangona[critereFiltre[i].data] !== "") {
                if (critereFiltre[i].typeData === 'input') {
                    condition += " and UPPER(" + critereFiltre[i].data + "::TEXT) like '%" + mpiangona[critereFiltre[i].data].toUpperCase() + "%' ";
                } else if (critereFiltre[i].typeData === 'select') {
                    condition += " and " + critereFiltre[i].data + "='" + mpiangona[critereFiltre[i].data] + "'";
                } else if (critereFiltre[i].typeData === 'date') {
                    condition += " and " + critereFiltre[i].data + "='" + mpiangona[critereFiltre[i].data] + "'";
                }
                else if (critereFiltre[i].typeData === 'string') {
                    condition += " and UPPER(" + critereFiltre[i].data + ")='" + mpiangona[critereFiltre[i].data].toUpperCase() + "'";
                }
            }
        }
    }
    let sqlColone = ficheServ.traitementSQLEnteteMinMax("s.nombrefiche",body);
    let sql = `select name,code,color,SUM(value) as value from ( select ${sqlColone.colonne} ,count(*) as value from (select * from v_mpiangona where 1=1 and estdekonina='ENY' ${condition})s group by s.nombrefiche,${sqlColone.group} ) l group by name,code,color`;
        //console.log(sql);
    try {
        let d = await client.query(sql);
        return d.rows ;
    } catch (error) {
        throw error;
    }
}
exports.getStatistiqueDekonina = getStatistiqueDekonina;
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
