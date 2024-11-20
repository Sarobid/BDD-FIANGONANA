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
    getListeMois : ()=>{
         return [
            { code: '1', name: 'Janvier' },
            { code: '2', name: 'Février' },
            { code: '3', name: 'Mars' },
            { code: '4', name: 'Avril' },
            { code: '5', name: 'Mai' },
            { code: '6', name: 'Juin' },
            { code: '7', name: 'Juillet' },
            { code: '8', name: 'Août' },
            { code: '9', name: 'Septembre' },
            { code: '10', name: 'Octobre' },
            { code: '11', name: 'Novembre' },
            { code: '12', name: 'Décembre' },
        ];
    }
}

export default serv;