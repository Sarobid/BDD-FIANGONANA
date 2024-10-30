import axios from 'axios';
import url from '../common';
const dekoninaServ = {
    getStateDekonina : async (legende,param)=>{
        return  await axios.post(url.urlHtpp+"/statistique-dekonina",{legende:legende,filter:param})
    },
    adddekonina : async (data)=>{
        return await axios.post(url.urlHtpp+"/dekonina", data)
    },
    addFicheDekonina : async (data)=>{
        return await axios.post(url.urlHtpp+"/dekonina-fiche", data);
    }
 }
 export default dekoninaServ;