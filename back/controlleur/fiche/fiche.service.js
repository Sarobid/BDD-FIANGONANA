const client = require("../../db");
async function getAll(param, num, nombrePage) {
    let condition = "";
    if(param['nombreadresse']){
        if(param['nombreadresse']!==""){
            condition += " and a.nombreadresse=" + param['nombreadresse'] + "";
        }
    }
    if(param['nombreadressemin']){
        if(param['nombreadressemin']!==""){
            condition += " and a.nombreadresse>=" + param['nombreadressemin'] + "";
        }
    }
    if(param['nombreadressemax']){
        if(param['nombreadressemax']!==""){
            condition += " and a.nombreadresse<=" + param['nombreadressemax'] + "";
        }
    }
    if(param['nombrempiangona']){
        if(param['nombrempiangona']!==""){
            condition += " and a.nombrempiangona=" + param['nombrempiangona'] + "";
        }
    }
    if(param['nombrempiangonamin']){
        if(param['nombrempiangonamin']!==""){
            condition += " and a.nombrempiangona>=" + param['nombrempiangonamin'] + "";
        }
    }
    if(param['nombrempiangonamax']){
        if(param['nombrempiangonamax']!==""){
            condition += " and a.nombrempiangona<=" + param['nombrempiangonamax'] + "";
        }
    }
    if(param['nombredekonina']){
        if(param['nombredekonina']!==""){
            condition += " and a.nombredekonina=" + param['nombredekonina'] + "";
        }
    }
    if(param['nombredekoninamin']){
        if(param['nombredekoninamin']!==""){
            condition += " and a.nombredekonina>=" + param['nombredekoninamin'] + "";
        }
    }
    if(param['nombredekoninamax']){
        if(param['nombredekoninamax']!==""){
            condition += " and a.nombredekonina<=" + param['nombredekoninamax'] + "";
        }
    }
    if(param['numfichempiangona']){
        if(param['numfichempiangona']!==""){
            condition += " and a.numfichempiangona='" + param['numfichempiangona'] + "'";
        }
    }
    if(param['adressempiangona']){
        if(param['adressempiangona']!==""){
            condition += " and UPPER(b.adressempiangona) like'%" + param['adressempiangona'].toUpperCase() + "%'";
        }
    }
    let offset = (num - 1) * nombrePage;
    let sql = `select distinct a.* from v_fiche a join v_ficheadresse b 
        on b.numfichempiangona=a.numfichempiangona
        where 1=1 ${condition} order by a.numfichempiangona offset ${offset} limit ${nombrePage}`;
    let sql2 = `select count(*) as total from (select distinct a.* from v_fiche a join v_ficheadresse b 
        on b.numfichempiangona=a.numfichempiangona
        where 1=1 ${condition})s `;
    try {
        let d = await client.query(sql);
        let total = await client.query(sql2);
        let totalPage = 0;
        if (total.rowCount >= 1) {
            totalPage = total.rows[0]['total'];
        }
        let numFiches = d.rows;
        for (let i = 0; i < numFiches.length; i++) {
            numFiches[i]["adressempiangona"] = await getAdressesFiche(numFiches[i]["numfichempiangona"]);
        }
        return { data: numFiches, totalPage: totalPage };
    } catch (error) {
        throw error;
    }
}
exports.getAll = getAll;

async function getAdressesFiche(numfiche){
    let sql = "select * from v_ficheadresse a where a.numfichempiangona='"+numfiche+"'";
    try {
        let d = await client.query(sql);
        return d.rows;
    } catch (error) {
        throw error;
    }
}