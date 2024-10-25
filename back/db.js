const pg = require('pg') 
const { Pool, Client } = pg
const client = new Client({
    // user: 'avnadmin',
    // password: 'copieo eto ny mot de passse',
    // host: 'pg-19ae558c-bdd-fiangonana-isotry.i.aivencloud.com',
    // port: 28864,
    // database: 'defaultdb',
    // ssl: {
    //     rejectUnauthorized: false,  
    //   },
})
async function test() {
    await client.connect()
let d = await client.query('SELECT NOW()');
console.log(d['rows'])
}
test()
module.exports = client;