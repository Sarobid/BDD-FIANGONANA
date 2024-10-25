const client = require("../../db");

async function getAll(){
    let d = await client.query('SELECT NOW()');
    return d.rows;
}
exports.getAll = getAll;

async function insertion(genre){
    return genre;
}
exports.insertion = insertion;