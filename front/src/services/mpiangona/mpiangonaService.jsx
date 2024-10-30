import axios from 'axios';
import url from '../common';
const mpiangonaServ = {
    getStateBatisa : async (body)=>{
        return  await axios.post(url.urlHtpp+"/mpiangona-state-batisa",body)
    },
    getStateMpandray : async (body)=>{
        return  await axios.post(url.urlHtpp+"/mpiangona-state-mpandray",body)
    },
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
            console.log("liste mpiangona",response.data)
            traiteSucces(response.data.data,response.data.totalPage);
        }).catch(error=>{
            console.log("error-liste",error)
            traiteError(error)
        })
    },
    getAllMpiangonaAsync : async (data,num,pageSize)=>{
        if(num <= 0){
            num=1;
        }
        let response = await axios.post(url.urlHtpp+"/mpiangonas/"+num+"/"+pageSize, data)
        return response.data.data;
        // .then(response=>{
        //     console.log("liste mpiangona",response.data)
        //     traiteSucces(response.data.data,response.data.totalPage);
        // }).catch(error=>{
        //     console.log("error-liste",error)
        //     traiteError(error)
        // })
    },
    addMpiangona : async (data)=>{
        return await axios.post(url.urlHtpp+"/mpiangona", {data})
    }
 }
 export default mpiangonaServ;