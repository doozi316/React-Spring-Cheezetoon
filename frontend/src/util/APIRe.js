import { API_BASE_URL, ACCESS_TOKEN } from '../constants';



const request = (options) => {
    const headers = new Headers({})

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};


export function uploadFile(title, artist, day, genre, fileList) {
        const formData = new FormData;
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('day', day);
        formData.append('genre', genre);
        formData.append('fileList', fileList);
        return request({
            url:API_BASE_URL + "/save",
            method: 'POST',
            body : formData
        })
}