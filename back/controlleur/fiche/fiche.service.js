const client = require("../../db");
var serv = require("../../service/service");

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
    //console.log(param)
    //console.log(condition)
    let offset = (num - 1) * nombrePage;
    let sql = `select distinct a.* from v_fiche a join v_ficheadresse b 
        on b.numfichempiangona=a.numfichempiangona left join distributiondekonina c on c.numfiche=a.numfichempiangona 
        where 1=1 ${condition} order by a.numfichempiangona offset ${offset} limit ${nombrePage}`;
    let sql2 = `select count(*) as total from (select distinct a.* from v_fiche a join v_ficheadresse b 
        on b.numfichempiangona=a.numfichempiangona left join distributiondekonina c on c.numfiche=a.numfichempiangona
        where 1=1 ${condition})s `;
    try {
        //console.log(sql)
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
        //console.log(sql);
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
        //console.log(body[i]);
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
    //console.log(body);
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

async function getListeSuivie(mpiangona, num, nombrePage){
    let critereFiltre = [{ title: "Nom/Prenom", data: "nomcompletmpiangona", typeData: 'input' },
        { title: "N° FICHE", data: "numfichempiangona", typeData: 'select' },
        { title: "N° FICHE", data: "numfichesuivie", typeData: 'select' },
        { title: "N° FICHE", data: "numfiche", typeData: 'select' },
        {title:"",data:"datesuivie",typeData:"date"},
        { title: "ADIRESY", data: "adressempiangona", typeData: 'input' },
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
        { title: "TOERANA IASANA", data: "lieuasa", typeData: 'input' }];
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
    let offset = (num - 1) * nombrePage;
    let sql = `select a.suiviefamilleid,a.descriptionsuivie,a.datesuivie,a.namangy,a.numfichesuivie,b.* from suiviefamille a join v_mpiangona b on b.mpiangonaid=a.mpiangonaid
     where 1=1 ${condition} order by a.datesuivie,a.numfichesuivie desc  offset ${offset} limit ${nombrePage}`;
    let sql2 = `select count(*) as total from suiviefamille a join v_mpiangona b on b.mpiangonaid=a.mpiangonaid where 1=1 ${condition}`;
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
exports.getListeSuivie = getListeSuivie;


async function statistiqueNombreDeSuivie(mpiangona, typePeriode,filtrePeriode){
    let critereFiltre = [{ title: "Nom/Prenom", data: "nomcompletmpiangona", typeData: 'input' },
        { title: "N° FICHE", data: "numfichempiangona", typeData: 'select' },
        { title: "N° FICHE", data: "numfichesuivie", typeData: 'select' },
        { title: "N° FICHE", data: "numfiche", typeData: 'select' },
        {title:"",data:"datesuivie",typeData:"date"},
        { title: "ADIRESY", data: "adressempiangona", typeData: 'input' },
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
        { title: "TOERANA IASANA", data: "lieuasa", typeData: 'input' }];
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
    condition += serv.createFiltreColonnePeriodeSQL(typePeriode,"a.datesuivie",filtrePeriode.debut,filtrePeriode.fin)
    let sql = `select ${serv.createColonnePeriodeSQL(typePeriode,"a.datesuivie","periode")} a.numfichesuivie,count(*) as nombre from suiviefamille a join v_mpiangona b on b.mpiangonaid=a.mpiangonaid
     where 1=1 ${condition} group by ${serv.createGroupByPeriodeSQL(typePeriode,"a.datesuivie")},a.numfichesuivie order by ${serv.createOrderByPeriodeSQL(typePeriode,"a.datesuivie")};`;
    try {
        console.log(sql);
        let d = await client.query(sql);
        return d.rows;
    } catch (error) {
        throw error;
    }
}
exports.statistiqueNombreDeSuivie = statistiqueNombreDeSuivie;