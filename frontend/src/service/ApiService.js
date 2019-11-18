import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const headers = new Headers({
    'Content-Type' : 'application/x-www-form-urlencoded'
})

if(localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
}

class ApiService {
        
    addNewWebtoon(data){
       return axios({
        method: 'post',
        url: API_BASE_URL+'/newToon/save',
        data: data,
        headers: headers
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}
}

export default new ApiService();