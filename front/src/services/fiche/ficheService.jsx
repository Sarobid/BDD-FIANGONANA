import axios from 'axios';
import url from '../common';
const ficheServ = {
    addsuivieFiche : async (data)=>{
        return  await axios.post(url.urlHtpp+"/fiche/suivie",data)
    },
    getStateFiche : async (legende,param)=>{
        return  await axios.post(url.urlHtpp+"/statistique-fiche",{legende:legende,filter:param})
    },
    getAllFiche : (data,num,pageSize,traiteSucces,traiteError)=>{
        if(num <= 0){
            num=1;
        }
        axios.post(url.urlHtpp+"/fiches/"+num+"/"+pageSize, data)
        .then(response=>{
           // console.log(response.data)
            traiteSucces(response.data.data,response.data.totalPage);
        }).catch(error=>{
            //console.log(error)
            traiteError(error)
        })
    },
    getAllSuivieFiche : (data,num,pageSize,traiteSucces,traiteError)=>{
        if(num <= 0){
            num=1;
        }
        axios.post(url.urlHtpp+"/fiches/suivie/"+num+"/"+pageSize, data)
        .then(response=>{
           // console.log(response.data)
            traiteSucces(response.data.data,response.data.totalPage);
        }).catch(error=>{
            //console.log(error)
            traiteError(error)
        })
    },
 }
 export default ficheServ;