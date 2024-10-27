import axios from 'axios';
import url from '../common';
const mpiangonaServ = {
    getAllMpiangona : (data,num,traiteSucces,traiteError)=>{
        if(num <= 0){
            num=1;
        }
        axios.post(url.urlHtpp+"/mpiangonas/"+num+"/20", data)
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