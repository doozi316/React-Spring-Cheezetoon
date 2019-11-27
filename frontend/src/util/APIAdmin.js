import { API_BASE_URL, ACCESS_TOKEN} from '../constants';



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


const deleteRequest = (options) => {
    const headers = new Headers()

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
}


export function uploadFile(title, artist, day, genre, fileList) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('day', day);
        formData.append('genre', genre);
        formData.append('file', fileList);
        return request({
            url:API_BASE_URL + "/newAdd",
            method: 'POST',
            body : formData
        })
}

export function uploadEpi(selectedToonId, epiTitle, thumbnail, main) {
        const formData = new FormData();
        formData.append('webtoonId', selectedToonId);
        formData.append('epiTitle', epiTitle);
        formData.append('eFile', thumbnail);
        formData.append('mFile', main);
        return request({
        url:API_BASE_URL + "/newEpi",
        method: 'POST',
        body : formData
    })
}

export function fetchToonInfo() {
    return request({
        url: API_BASE_URL + "/getToonIdAndName",
        method: 'GET'
    });
}

export function fetchToon() {
    return request({
        url: API_BASE_URL + "/getToon",
        method: 'GET'
    });
}

export function fetchEpi(id) {
    return request({
        url: API_BASE_URL + "/getEpi/" + id,
        method: 'GET'
    });
}

export function fetchToonById(id) {
    return request({
        url: API_BASE_URL + "/getToonById/" + id,
        method: 'GET'
    });
}

export function deleteFile(id) {
    return request({
        url: API_BASE_URL + "/deleteFile/" + id,
        method: 'PUT'
    });
}

export function deleteToon(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteToon/" + id,
        method: 'DELETE'
    });
}

export function fetchToonThumbnailById(id) {
    return request({
        url: API_BASE_URL + "/getToonThumbnailById/" + id,
        method: 'GET'
    });
}

