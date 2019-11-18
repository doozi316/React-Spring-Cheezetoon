import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type' : undefined
    })

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

export function addNewWebtoon(data) {
    return request({
        url: API_BASE_URL + "/newToon/save",
        method: 'POST',
        body: data
    });
}
