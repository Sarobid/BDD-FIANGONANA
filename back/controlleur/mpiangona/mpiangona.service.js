const client = require("../../db");
const objetkeys = ['numfichempiangona','adressempiangona','nommpiangona','prenommpiangona','nomcompletmpiangona','datenaissancempiangona','codegenrempiangona','datebatisa','lieubatisa','estmpandray','datempandray','lieumpandray','karatrampandray','nompere','nommere','telephone','email','estvadysoratra','estvadymasina','matyvady','nisarabady','asampiangona','lieuasa']
const critereFiltre = ['numfichempiangona','adressempiangona','nommpiangona','prenommpiangona','nomcompletmpiangona','datenaissancempiangona','codegenrempiangona','datebatisa','lieubatisa','estmpandray','datempandray','lieumpandray','karatrampandray','nompere','nommere','telephone','email','estvadysoratra','estvadymasina','matyvady','nisarabady','asampiangona','lieuasa']

async function getAll(mpiangona,num,nombrePage){
    let condition = "";
    for (let i = 0; i < critereFiltre.length; i++) {
        if(mpiangona[critereFiltre[i]]){
            if(mpiangona[critereFiltre[i]] !== ""){
                condition += " and UPPER("+critereFiltre[i]+"::TEXT) =like '%"+mpiangona[critereFiltre[i]].toUpperCase()+"%' ";
            }
        }
    }
    let offset = (num - 1)*nombrePage;
    let sql = `select * from v_mpiangona where 1=1 ${condition} order by nommpiangona offset ${offset} limit ${nombrePage}`;
    let sql2 = `select count(*) as total from v_mpiangona where 1=1 ${condition}`;
    try {
        let d = await client.query(sql);
        let total = await client.query(sql2);
        let totalPage = 0;
        if (total.rowCount >= 1) {
            totalPage = total.rows[0]['total'];   
        }
        return {data:d.rows,totalPage:totalPage};   
    } catch (error) {
        throw error;
    }
}
exports.getAll = getAll;

async function insertion(mpiangona){
    console.log("mpiangona", mpiangona);
        
    let values = [];
    let estValuePresent = false;
    for (let i = 0; i < objetkeys.length; i++) {
        if(objetkeys[i] === "nomcompletmpiangona"){
            let est = false;
            if(mpiangona["nomcompletmpiangona"]){
                if (mpiangona["nomcompletmpiangona"] !=="") {
                    values.push(mpiangona["nomcompletmpiangona"]);
                    estValuePresent = true;
                    est= true;
                }
            }
            if(est === false){
                let v = "";
                if(mpiangona['nommpiangona']){
                    v = v+mpiangona['nommpiangona'];
                }
                if(mpiangona['prenommpiangona']){
                    v = v+" "+mpiangona['prenommpiangona'];
                }
                if(v !== ""){
                    values.push(v);
                    estValuePresent = true;
                }else{
                    values.push(null);
                }
                
            }
        }else{
            if (mpiangona[objetkeys[i]]) {
                if (mpiangona[objetkeys[i]] !== "") {
                    values.push(mpiangona[objetkeys[i]])   
                    estValuePresent = true;
                }else{
                    values.push(null)
                }
            }else{
                values.push(null)
            }
        }
    }
    console.log("COLUMN = "+objetkeys.length+" VALUE = "+values.length+"");
    
    let sql = `INSERT INTO "public".mpiangona
	( numfichempiangona, adressempiangona, nommpiangona, prenommpiangona, nomcompletmpiangona, datenaissancempiangona, codegenrempiangona, datebatisa,lieubatisa, estmpandray
, datempandray, lieumpandray, karatrampandray, nompere, nommere, telephone, email, estvadysoratra, estvadymasina, matyvady, nisarabady, asampiangona, lieuasa)
 VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22,$23 );`
    try {
        if(!estValuePresent){
            throw {message:"not found data",status:400};
        }
        let res = await client.query(sql, values);
        return res.rows;
    } catch (error) {
        throw error;
    }
}
exports.insertion = insertion;