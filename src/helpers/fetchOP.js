import urlcat from 'urlcat';

export function fetchOP(method, path, params) {
    return new Promise((resolve, reject) => {
        window.fetch(urlcat(path, params), {method, credentials: 'same-origin'}).catch(reject)
            .then(response => response.ok ? (response.bodyUsed ? response.json().then(resolve) : resolve(null)) : reject(response));
    });
}