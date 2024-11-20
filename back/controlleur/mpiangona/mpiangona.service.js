const client = require("../../db");
const objetkeys = ['numfichempiangona', 'adressempiangona', 'nommpiangona', 'prenommpiangona', 'nomcompletmpiangona', 'datenaissancempiangona', 'codegenrempiangona', 'datebatisa', 'lieubatisa', 'estmpandray', 'datempandray', 'lieumpandray', 'karatrampandray', 'nompere', 'nommere', 'telephone', 'email', 'estvadysoratra', 'estvadymasina', 'matyvady', 'nisarabady', 'asampiangona', 'lieuasa']
//const critereFiltre = ['numfichempiangona','adressempiangona','nommpiangona','prenommpiangona','nomcompletmpiangona','datenaissancempiangona','codegenrempiangona','datebatisa','lieubatisa','estmpandray','datempandray','lieumpandray','karatrampandray','nompere','nommere','telephone','email','estvadysoratra','estvadymasina','matyvady','nisarabady','asampiangona','lieuasa']
const critereFiltre = [
    { title: "Date debut", data: "datedebut", typeData: 'date' },{ title: "Date Fin", data: "datefin", typeData: 'date' },
    { title: "Nom/Prenom", data: "nomcompletmpiangona", typeData: 'input' },
    { title: "N° FICHE", data: "numfichempiangona", typeData: 'select' },
    { title: "N° FICHE", data: "numfiche", typeData: 'select' },
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

async function getDekoninaMpiahy(mpiangona, num, nombrePage){
    //console.log("mpiangona", mpiangona)
    let condition = "";
    for (let i = 0; i < critereFiltre.length; i++) {
        if (mpiangona[critereFiltre[i].data]) {
            if (mpiangona[critereFiltre[i].data] !== "") {
                if (critereFiltre[i].typeData === 'input') {
                    condition += " and UPPER(" + critereFiltre[i].data + "::TEXT) like '%" + mpiangona[critereFiltre[i].data].toUpperCase() + "%' ";
                } else if (critereFiltre[i].typeData === 'select') {
                    condition += " and " + critereFiltre[i].data + "='" + mpiangona[critereFiltre[i].data] + "'";
                } else if (critereFiltre[i].typeData === 'date') {
                    if(mpiangona[critereFiltre[i].data] === 'null'){
                        condition += " and " + critereFiltre[i].data + " is null";
                    }else{
                        condition += " and " + critereFiltre[i].data + "='" + mpiangona[critereFiltre[i].data] + "'";
                    }
                }
                else if (critereFiltre[i].typeData === 'string') {
                    condition += " and UPPER(" + critereFiltre[i].data + ")='" + mpiangona[critereFiltre[i].data].toUpperCase() + "'";
                }
            }
        }
    }
    if(mpiangona['nombrefiche']){
        if(mpiangona['nombrefiche']!==""){
            condition += " and nombrefiche=" + mpiangona['nombrefiche'] + "";
        }
    }
    if(mpiangona['nombrefichemin']){
        if(mpiangona['nombrefichemin']!==""){
            condition += " and nombrefiche>=" + mpiangona['nombrefichemin'] + "";
        }
    }
    if(mpiangona['nombrefichemax']){
        if(mpiangona['nombrefichemax']!==""){
            condition += " and nombrefiche<=" + mpiangona['nombrefichemax'] + "";
        }
    }
    let offset = (num - 1) * nombrePage;
    let sql = `select a.numfiche,a.datedebut,a.datefin,b.* from distributiondekonina a join v_mpiangona b on b.mpiangonaid=a.mpiangonaid where 1=1 ${condition} order by a.datedebut,a.mpiangonaid desc  offset ${offset} limit ${nombrePage}`;
    let sql2 = `select count(*) as total from distributiondekonina a join v_mpiangona b on b.mpiangonaid=a.mpiangonaid where 1=1 ${condition}`;
    //console.log(sql)
    try {
        let d = await client.query(sql);
        let total = await client.query(sql2);
        let totalPage = 0;
        if (total.rowCount >= 1) {
            totalPage = total.rows[0]['total'];
        }
        return { data: d.rows, totalPage: totalPage };
    } catch (error) {
        throw error;
    }
}
exports.getDekoninaMpiahy = getDekoninaMpiahy;
async function getStatistiqueBatisa(mpiangona) {
    //console.log("mpandray state", mpiangona)
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
    let sql = `select a.vitabatisa as code,
CASE 
        WHEN a.vitabatisa =1 THEN 'VITA BATISA' 
        ELSE 'TSY VITA BATISA' end  as name,
CASE 
        WHEN a.vitabatisa =1 THEN 'green' 
        ELSE 'red' end as color
,count(*) as value  from v_mpiangona a where 1=1 ${condition} group by a.vitabatisa order by a.vitabatisa desc `;
    //console.log(sql)
    try {
        let d = await client.query(sql);
        return d.rows;
    } catch (error) {
        throw error;
    }
}
exports.getStatistiqueBatisa = getStatistiqueBatisa;

async function getStatistiqueMpandray(mpiangona) {
    //console.log("mpandray state", mpiangona)
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
    let sql = `select a.estmpandray as code,
COALESCE(a.estmpandray,'NON DEFINIE') as name,
CASE 
        WHEN a.estmpandray IS NULL THEN 'gray' 
        WHEN a.estmpandray = 'TSY MPANDRAY' THEN 'red' 
        WHEN a.estmpandray = 'KATEKOMENA' THEN 'yellow' 
        WHEN a.estmpandray = 'MPANDRAY' THEN 'green' 
        ELSE 'blue'end as color
,count(*) as value  from v_mpiangona a where 1=1 ${condition} group by a.estmpandray order by a.estmpandray desc `;
    //console.log(sql)
    try {
        let d = await client.query(sql);
        return d.rows;
    } catch (error) {
        throw error;
    }
}
exports.getStatistiqueMpandray = getStatistiqueMpandray;
async function getAllOptions(colonneName) {
    let sql = "select distinct " + colonneName + " as code ," + colonneName + " as value from v_mpiangona";
    try {
        let d = await client.query(sql);
        return d.rows;
    } catch (error) {
        throw error;
    }
}
exports.getAllOptions = getAllOptions;
async function getAll(mpiangona, num, nombrePage) {
    //console.log("mpiangona", mpiangona)
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
    if(mpiangona['nombrefiche']){
        if(mpiangona['nombrefiche']!==""){
            condition += " and nombrefiche=" + mpiangona['nombrefiche'] + "";
        }
    }
    if(mpiangona['nombrefichemin']){
        if(mpiangona['nombrefichemin']!==""){
            condition += " and nombrefiche>=" + mpiangona['nombrefichemin'] + "";
        }
    }
    if(mpiangona['nombrefichemax']){
        if(mpiangona['nombrefichemax']!==""){
            condition += " and nombrefiche<=" + mpiangona['nombrefichemax'] + "";
        }
    }
    let offset = (num - 1) * nombrePage;
    let sql = `select * from v_mpiangona where 1=1 ${condition} order by nomcompletmpiangona offset ${offset} limit ${nombrePage}`;
    let sql2 = `select count(*) as total from v_mpiangona where 1=1 ${condition}`;
   // //console.log(sql)
    try {
        let d = await client.query(sql);
        let total = await client.query(sql2);
        let totalPage = 0;
        if (total.rowCount >= 1) {
            totalPage = total.rows[0]['total'];
        }
        return { data: d.rows, totalPage: totalPage };
    } catch (error) {
        throw error;
    }
}
exports.getAll = getAll;

async function findById(id){
    if(id){
        let sql = `select * from v_mpiangona where 1=1 and mpiangonaid=${id}`;
        try {
            let d = await client.query(sql);
            return d.rows;
        } catch (error) {
            throw error;
        }
    }else{
        return [];
    }
}
exports.findById = findById;

async function insertion(mpiangona) {
    //console.log("mpiangona", mpiangona);
    let values = [];
    let seq = await client.query("select nextval('seq_mpiangona') as seq;");
    values.push(seq.rows[0]['seq'])
    let estValuePresent = false;
    for (let i = 0; i < objetkeys.length; i++) {
        if (objetkeys[i] === "nomcompletmpiangona") {
            let est = false;
            if (mpiangona["nomcompletmpiangona"]) {
                if (mpiangona["nomcompletmpiangona"] !== "") {
                    values.push(mpiangona["nomcompletmpiangona"]);
                    estValuePresent = true;
                    est = true;
                }
            }
            if (est === false) {
                let v = "";
                if (mpiangona['nommpiangona']) {
                    v = v + mpiangona['nommpiangona'];
                }
                if (mpiangona['prenommpiangona']) {
                    v = v + " " + mpiangona['prenommpiangona'];
                }
                if (v !== "") {
                    values.push(v);
                    estValuePresent = true;
                } else {
                    values.push(null);
                }

            }
        } else {
            if (mpiangona[objetkeys[i]]) {
                if (mpiangona[objetkeys[i]] !== "") {
                    values.push(mpiangona[objetkeys[i]])
                    estValuePresent = true;
                } else {
                    values.push(null)
                }
            } else {
                values.push(null)
            }
        }
    }
    //console.log("COLUMN = " + objetkeys.length + " VALUE = " + values.length + "");

    let sql = `INSERT INTO "public".mpiangona
	( mpiangonaid,numfichempiangona, adressempiangona, nommpiangona, prenommpiangona, nomcompletmpiangona, datenaissancempiangona, codegenrempiangona, datebatisa,lieubatisa, estmpandray
, datempandray, lieumpandray, karatrampandray, nompere, nommere, telephone, email, estvadysoratra, estvadymasina, matyvady, nisarabady, asampiangona, lieuasa)
 VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22,$23,$24 );`
    try {
        if (!estValuePresent) {
            throw { message: "not found data", status: 400 };
        }
        let res = await client.query(sql, values);
        return [{ 'mpiangonaid': values[0] }];
    } catch (error) {
        throw error;
    }
}
exports.insertion = insertion;