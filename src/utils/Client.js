import urlcat from 'urlcat';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export function fetch(method, path, params) {
    return new Promise((resolve, reject) => {
        window.fetch(urlcat(path, params), {method, credentials: 'same-origin'}).catch(reject)
            .then(response => response.ok ? response.json().then(resolve).catch(() => resolve(null)) : reject(response));
    });
}

class BaseClient {
    _setupRequest(method, path=null, params={}) {
        return new Promise((resolve, reject) => {
            window.fetch(urlcat(path, params), {method, credentials: 'same-origin'}).catch(reject)
                .then(response => response.ok ? response.json().then(resolve).catch(() => resolve(null)) : reject(response));
        })
    }
}

class UserClient extends BaseClient {
    _setupRequest(method, path=null, params={}) {
        return super._setupRequest(method, urlcat('/user', path), params);
    }

    newUser(mail, password) {
        return this._setupRequest(METHOD.POST, null, {mail, password});
    }

    updateUser(password) {
        return this._setupRequest(METHOD.PUT, null, {password});
    }

    deleteUser() {
        return this._setupRequest(METHOD.DELETE);
    }
}

class SessionClient extends BaseClient {
    _setupRequest(method, path=null, params={}) {
        return super._setupRequest(method, urlcat('/session', path), params);
    }

    getSession() {
        return this._setupRequest(METHOD.GET);
    }

    newSession(mail, password) {
        return this._setupRequest(METHOD.POST, null, {mail, password});
    }

    newGuest() {
        return this._setupRequest(METHOD.POST, 'guest');
    }

    deleteSession() {
        return this._setupRequest(METHOD.DELETE);
    }
}

class PlaceClient extends BaseClient {
    _setupRequest(method, path=null, params={}) {
        return super._setupRequest(method, urlcat('/places', path), params);
    }

    getPlaces() {
        return this._setupRequest(METHOD.GET);
    }

    newPlace(query, alias) {
        return this._setupRequest(METHOD.POST, query, {alias});
    }

    updatePlace(coords, alias) {
        return this._setupRequest(METHOD.PUT, coords, {alias});
    }

    deletePlace(coords) {
        return this._setupRequest(METHOD.DELETE, coords);
    }
}

class QueryClient extends BaseClient {
    _setupRequest(method, path=null, params={}) {
        return super._setupRequest(method, urlcat('/query', path), params);
    }

    query(query) {
        return this._setupRequest(METHOD.GET, query);
    }
}

export default {
    user: new UserClient(),
    session: new SessionClient(),
    places: new PlaceClient(),
    query: new QueryClient()
};