import { useEffect, useState } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import mpiangonaServ from "../services/mpiangona/mpiangonaService";
import serv from "../services/service";
const titleSheet = [
    //{title:"NUMERO",
    {title:"N° FICHE",data:"numfichempiangona"},
    //{title:"MPANAO SAISIE",
    //{title:"DIAKONA MPIAHY",
    {title:"ADIRESY",data:"adressempiangona"},
    {title:"ANARANA",data:"nommpiangona"},
    {title:"FANAMPINY 1",data:"prenommpiangona"},
    {title:"DATY NAHATERAHANA",data:"datenaissancempiangona",traitement:(value)=>{
        return serv.converteNombreEnDate(value);
    }},
    {title:"LAHY/ VAVY",data:"codegenrempiangona"},
    {title:"DATY BATISA",data:"datebatisa",traitement:(value)=>{
        return serv.converteNombreEnDate(value);
    }},
    {title:"TOERANA NANAOVANA BATISA",data:"lieubatisa"},
    {title:"MPANDRAY/ KATEKOMENA",data:"estmpandray"},
    {title:"DATY NANDRAISANA MFT",data:"datempandray",traitement:(value)=>{
        return serv.converteNombreEnDate(value);
    }},
    {title:"TOERANA NANDRAISANA",data:"lieumpandray"},
    {title:"N° KARATRA MPANDRAY",data:"karatrampandray"},
    //{title:"FG 2019-2023",
    //{title:"SAMPANA/ FIKAMBANANA",
    //{title:"SAMPANA",
    //{title:"SAMPANA2",
    //{title:"SAMPANA3",
    //{title:"SAMPANA FIFOHAZANA",
    //{title:"SAMPANA4",
    {title:"RAY",data:"nompere"},
    {title:"RENY",data:"nommere"},
    {title:"TEL 33",data:"telephone",traitement:(value)=>{
        return value;
    }},
    {title:"TEL 34/38",data:"telephone",traitement:(value)=>{
        return value;
    }},
    {title:"TEL 032",data:"telephone",traitement:(value)=>{
        return value;
    }},
    {title:"EMAIL",data:"email"},
    {title:"MANAMBADY VITA SORATRA",data:"estvadysoratra"},
    {title:"MANAMBADY VITA FANAMASINANA",data:"estvadymasina"},
    {title:"MATY VADY",data:"matyvady"},
    {title:"NISARAKA",data:"nisarabady"},
    //{title:"MPITOVO",
    {title:"ASA",data:"asampiangona"},
    {title:"TOERANA IASANA",data:"lieuasa"}
    // {title:"FANAMARIHANA",
    // {title:"FANAMARIHANA 2"
];
function ListeMpiangona() {
    const [file, setFile] = useState(null);  
    const importerFile = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const donnee = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                //console.log("donnee", donnee);
                donnee.forEach(value=>{
                    let d = {};
                    for (let i = 0; i < titleSheet.length; i++) {
                        if(value[titleSheet[i].title]){
                            if(titleSheet[i].traitement){
                                d[titleSheet[i].data] =titleSheet[i].traitement(value[titleSheet[i].title]) 
                            }else{
                                d[titleSheet[i].data] = value[titleSheet[i].title];
                            }
                        }
                    }
                    console.log("d", d);
                    mpiangonaServ.addMpiangona(d,(data)=>{
                        console.log("data",data);
                    },(error)=>{
                        console.log("error",error);
                    })
                })
            };
            reader.readAsArrayBuffer(file);
        }
    };
    const [num,setNum] = useState(1);
    const getAll = ()=>{
        mpiangonaServ.getAllMpiangona({},num,(data,totalPage)=>{
            console.log("data",data);
            console.log("data",totalPage);
            setNum(num)
        },(error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        getAll();
    }, [0]);


    return (
        <>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button type="button" onClick={importerFile}>Importer</button>
        </>
    );
}

export default ListeMpiangona;
