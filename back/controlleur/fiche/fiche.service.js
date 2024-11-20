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
    if(param['dekoninaid']){
        if(param['dekoninaid']!==""){
            condition += " and c.mpiangonaid=" + param['dekoninaid'] + "";
        }
    }
    if(param['adressempiangona']){
        if(param['adressempiangona']!==""){
            condition += " and UPPER(b.adressempiangona) like'%" + param['adressempiangona'].toUpperCase() + "%'";
        }
    }
    console.log(param)
    console.log(condition)
    let offset = (num - 1) * nombrePage;
    let sql = `select distinct a.* from v_fiche a join v_ficheadresse b 
        on b.numfichempiangona=a.numfichempiangona left join distributiondekonina c on c.numfiche=a.numfichempiangona 
        where 1=1 ${condition} order by a.numfichempiangona offset ${offset} limit ${nombrePage}`;
    let sql2 = `select count(*) as total from (select distinct a.* from v_fiche a join v_ficheadresse b 
        on b.numfichempiangona=a.numfichempiangona left join distributiondekonina c on c.numfiche=a.numfichempiangona
        where 1=1 ${condition})s `;
    try {
        console.log(sql)
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

async function getStatistiqueFiche(body,param) {
    let condition = "";
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
    let sqlColone = traitementSQLEnteteMinMax("s.nombredekonina",body);
    let sql = `select name,code,color,SUM(value) as value from ( select ${sqlColone.colonne} ,count(*) as value from (select distinct a.* from v_fiche a join v_ficheadresse b 
        on b.numfichempiangona=a.numfichempiangona
        where 1=1 ${condition})s group by s.nombredekonina,${sqlColone.group} ) l group by name,code,color`;
        console.log(sql);
    try {
        let d = await client.query(sql);
        return d.rows ;
    } catch (error) {
        throw error;
    }
}
exports.getStatistiqueFiche = getStatistiqueFiche;

function traitementSQLEnteteMinMax(colonneName,body){
    let initialCode = " CASE ";
    let initialName = " CASE ";
    let initialColor = " CASE ";
    for (let i = 0; i < body.length; i++) {
        console.log(body[i]);
        let colonneMinMax = " WHEN 1=1 ";
        let min = "";
        let max = "";
        if(body[i]['min'] !== undefined && body[i]['min'] !== null && body[i]['min'] !== ''){
            min = body[i]['min']
            colonneMinMax += " and "+colonneName+" >= "+body[i]['min']+" ";
        }
        if(body[i]['max'] !== undefined && body[i]['max'] !== null && body[i]['max'] !== ''){
            max = body[i]['max']
            colonneMinMax += " and "+colonneName+" <= "+body[i]['max']+" ";
        }
         initialCode += colonneMinMax+ " then '"+min+";"+max+"' ";
         initialName += colonneMinMax+ " then '";
         let n = "";
         if(min!==""){
            n+=" Superieur a "+min;
         }
         if(max!==""){
            if(n!== ""){
                n+=" et "
            }
            n+=" Inferieur a "+min;
         }
         initialName+=n+"' ";
         initialColor += colonneMinMax +" then '"+body[i]["color"]+"' ";
    }
    initialCode +=" ELSE 'Non definie' end ";
    initialName +=" ELSE 'Non definie' end ";
    initialColor +=" ELSE 'black' end  ";
    return {colonne:initialCode+" as code ,"+initialName+" as name ,"+initialColor+" as color ",
        group : initialCode+","+initialName+","+initialColor
    };
}

exports.traitementSQLEnteteMinMax = traitementSQLEnteteMinMax;
async function getAdressesFiche(numfiche){
    let sql = "select * from v_ficheadresse a where a.numfichempiangona='"+numfiche+"'";
    try {
        let d = await client.query(sql);
        return d.rows;
    } catch (error) {
        throw error;
    }
}

async function suivieFiche(body){
    console.log(body);
    try {
        if(body.numfichempiangona === ""){
            throw new Error("Num fiche doit etre declarer");
        }
        let values = [body.descriptionsuivie,'now()','ENY',body.numfichempiangona,body.mpiangonaid];
        if(body.datesuivie){
            values[1] = body.datesuivie;
        }
        let sql = `INSERT INTO "public".suiviefamille
	( descriptionsuivie, datesuivie, namangy, numfichesuivie, mpiangonaid) VALUES ( $1, $2, $3, $4, $5 );`
        let d = await client.query(sql,values);
        return d.rows;
    } catch (error) {
        throw error;
    }
}
exports.suivieFiche = suivieFiche;
