import * as XLSX from 'xlsx/xlsx.mjs';
const serv = {
    converteNombreEnDate: (nombre) => {
        let parsedDate = XLSX.SSF.parse_date_code(nombre)
        return serv.formattageDate(new Date(parsedDate.y, parsedDate.m - 1, parsedDate.d).toLocaleDateString('fr-FR'));
    },
    formattageDate: (date) => {
        let [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    },
    formatageDateTypeDate: (date) => {
        return date.toLocaleDateString('fr-FR');
    },
}

export default serv;