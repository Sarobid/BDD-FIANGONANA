import axios from 'axios';
import url from '../common';
const mpiangonaServ = {
    getAllOpions : async (colonne)=>{
        let data = await axios.get(url.urlHtpp+"/mpiangona/option/"+colonne)
        console.log("data "+colonne,data)
        return data.data;
    },
    getAllMpiangona : (data,num,pageSize,traiteSucces,traiteError)=>{
        if(num <= 0){
            num=1;
        }
        axios.post(url.urlHtpp+"/mpiangonas/"+num+"/"+pageSize, data)
        .then(response=>{
           // console.log(response.data)
            traiteSucces(response.data.data,response.data.totalPage);
        }).catch(error=>{
            //console.log(error)
            traiteError(error)
        })
    },
    addMpiangona : (data,traiteSucces,traiteError)=>{
        axios.post(url.urlHtpp+"/mpiangona", {data})
        .then(response=>{
            console.log(response)
            traiteSucces(response.data);
        }).catch(error=>{
            //console.log(error)
            traiteError(error)
        })
    }
 }
 export default mpiangonaServ;