import axios from 'axios';
import { API_BASE_URL } from '../constants';

class ApiService {

    addNewWebtoon(data){
        return axios.post(""+API_BASE_URL, data);
    }
}

export default new ApiService();