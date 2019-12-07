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
        formData.append('toonId', selectedToonId);
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

export function uploadEditEpi(id, epiTitle, eFile, mFile){
    const formData = new FormData();
    formData.append('epiTitle', epiTitle);
    formData.append('eFile', eFile);
    formData.append('mFile', mFile);
    return request({
        url:API_BASE_URL + "/uploadEditEpi/" + id,
        method: 'PUT',
        body : formData
    })
    
}

export function uploadEditEpiExceptTaM(id, epiTitle){
    const formData = new FormData();
    formData.append('epiTitle', epiTitle);
    return request({
        url:API_BASE_URL + "/uploadEditEpiExceptTaM/" + id,
        method: 'PUT',
        body : formData
    })
    
}

export function uploadEditEpiExceptM(id, epiTitle, eFile){
    const formData = new FormData();
    formData.append('epiTitle', epiTitle);
    formData.append('eFile', eFile);
    return request({
        url:API_BASE_URL + "/uploadEditEpiExceptM/" + id,
        method: 'PUT',
        body : formData
    })
    
}


export function uploadEditEpiExceptT(id, epiTitle, mFile){
    const formData = new FormData();
    formData.append('epiTitle', epiTitle);
    formData.append('eFile', mFile);
    return request({
        url:API_BASE_URL + "/uploadEditEpiExceptT/" + id,
        method: 'PUT',
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

export function fetchEpiById(id) {
    return request({
        url: API_BASE_URL + "/getEpiById/" + id,
        method: 'GET'
    });
}

export function fetchToonById(id) {
    return request({
        url: API_BASE_URL + "/getToonById/" + id,
        method: 'GET'
    });
}

export function deleteToonThumbnail(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteToonThumbnail/" + id,
        method: 'DELETE'
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


export function uploadEditToon(id, title, artist, day, genre, fileList) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('day', day);
    formData.append('genre', genre);
    formData.append('file', fileList);
    return request({
        url:API_BASE_URL + "/uploadEditToon/" + id,
        method: 'PUT',
        body : formData
    })
}

export function uploadEditToonExceptFile(id, title, artist, day, genre) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('day', day);
    formData.append('genre', genre);
    return request({
        url:API_BASE_URL + "/uploadEditToonExceptFile/" + id,
        method: 'PUT',
        body : formData
    })
}

export function deleteEpi(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteEpi/" + id,
        method: 'DELETE'
    });
}

export function fetchEditEpi(id) {
    return request({
        url : API_BASE_URL + "/getEditEpi/" + id,
        method: 'GET'
    });
}

export function fetchToonTitle(id) {
    return request({
        url :API_BASE_URL + "/getToonTitle/" + id,
        method:'GET'
    })
}

export function fetchEpiThumbnailById(id) {
    return request({
        url :API_BASE_URL + "/getEpiThumbnailById/" + id,
        method: 'GET'
    })
}

export function deleteEpiThumbnail(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteEpiThumbnail/" + id,
        method: 'DELETE'
    });
}

export function deleteEpiToon(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteEpiToon/" + id,
        method: 'DELETE'
    });
}

export function fetchEpiToon(id) {
    return request({
        url :API_BASE_URL + "/getEpiToon/" + id,
        method: 'GET'
    })
}

export function uploadComment(id, username, comment){
    const formData = new FormData();
    formData.append('user', username);
    formData.append('comment', comment);
    return request({
        url: API_BASE_URL + "/saveComment/" + id,
        method: 'POST',
        body: formData
    });
}

export function uploadEditComment(id, comment){
    const formData = new FormData();
    formData.append('comment', comment);
    return request({
        url:API_BASE_URL + "/uploadEditComment/" + id,
        method: 'PUT',
        body : formData
    })
}

export function uploadRate(id, username, rate){
    const formData = new FormData();
    formData.append('rate', rate);
    formData.append('user', username);
    return request({
        url:API_BASE_URL + "/uploadRate/" + id,
        method: 'POST',
        body : formData
    })
}

export function uploadEditRate(id, username, rate){
    const formData = new FormData();
    formData.append('rate', rate);
    formData.append('user', username);
    return request({
        url:API_BASE_URL + "/uploadEditRate/" + id,
        method: 'PUT',
        body : formData
    })
}

export function saveFav(id, user, title, webtoonId){
    const formData = new FormData();
    formData.append('user', user);
    formData.append('title', title);
    formData.append('webtoonId', webtoonId);
    return request({
        url:API_BASE_URL + "/saveFav/" + id,
        method: 'POST',
        body : formData
    })
}

export function deleteFav(id, user) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteFav/" + id + "/" + user,
        method: 'DELETE'
    });
}

export function deleteFavById(id) {
    return deleteRequest({
        url: API_BASE_URL + "/deleteFavById/" + id,
        method: 'DELETE'
    });
}

export function fetchFav(user){
    return request({
        url : API_BASE_URL + "/getFav/" + user,
        method: 'GET'
    });
}

export function fetchFavById(tno,user){
    return request({
        url : API_BASE_URL + "/getFavById/" + tno + "/" + user,
        method: 'GET'
    });
}
