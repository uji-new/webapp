import urlcat from 'urlcat';

export function fetch(method, path, params) {
    return new Promise((resolve, reject) => {
        window.fetch(urlcat(path, params), {method, credentials: 'same-origin'}).catch(reject)
            .then(response => response.ok ? response.json().then(resolve).catch(() => resolve(null)) : reject(response));
    });
}