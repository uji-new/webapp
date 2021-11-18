import urlcat from 'urlcat';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const SERVICE_TYPE = {
    WEATHER: 'WEATHER',
    EVENTS: 'EVENTS',
    NEWS: 'NEWS'
}

export function fetch(method, path, params) {
    return new Promise((resolve, reject) => {
        window.fetch(urlcat(path, params), {method, credentials: 'same-origin'}).catch(reject)
            .then(response => response.ok ? response.json().then(resolve).catch(() => resolve(null)) : reject(response));
    });
}

class BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return new Promise((resolve, reject) => {
            window.fetch(urlcat(paths.join('/'), params), {method, credentials: 'same-origin'}).catch(reject)
                .then(response => response.ok ? response.json().then(resolve).catch(() => resolve(null)) : reject(response));
        })
    }
}

class HistoryClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['/history', ...paths], params);
    }

    getPlaces() {
        return this._setupRequest(METHOD.GET);
    }

    newPlace(coords) {
        return this._setupRequest(METHOD.POST, [':coords'], {coords});
    }

    deletePlace(coords) {
        return this._setupRequest(METHOD.DELETE, [':coords'], {coords});
    }
}

class PlaceClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['/places', ...paths], params);
    }

    getPlaces() {
        return this._setupRequest(METHOD.GET);
    }

    newPlace(query, alias) {
        return this._setupRequest(METHOD.POST, [':query'], {query, alias});
    }

    updatePlace(coords, alias) {
        return this._setupRequest(METHOD.PUT, [':coords'], {coords, alias});
    }

    deletePlace(coords) {
        return this._setupRequest(METHOD.DELETE, [':coords'], {coords});
    }
}

class QueryClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['/query', ...paths], params);
    }

    query(query) {
        return this._setupRequest(METHOD.GET, [':query'], {query});
    }
}

class ServiceClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['/services', ...paths], params);
    }

    getServices() {
        return this._setupRequest(METHOD.GET);
    }

    newService(type) {
        return this._setupRequest(METHOD.POST, [], {type});
    }

    deleteService(type) {
        return this._setupRequest(METHOD.DELETE, [], {type});
    }

    getServicesForPlace(coords) {
        return this._setupRequest(METHOD.GET, [':coords'], {coords});
    }

    newService(coords, type) {
        return this._setupRequest(METHOD.POST, [':coords'], {coords, type});
    }

    deleteService(coords, type) {
        return this._setupRequest(METHOD.DELETE, [':coords'], {coords, type});
    }
}

class SessionClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['/session', ...paths], params);
    }

    getSession() {
        return this._setupRequest(METHOD.GET);
    }

    newSession(mail, password) {
        return this._setupRequest(METHOD.POST, [], {mail, password});
    }

    newGuest() {
        return this._setupRequest(METHOD.POST, ['guest']);
    }

    deleteSession() {
        return this._setupRequest(METHOD.DELETE);
    }
}

class UserClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['/user', ...paths], params);
    }

    newUser(mail, password) {
        return this._setupRequest(METHOD.POST, [], {mail, password});
    }

    updateUser(password) {
        return this._setupRequest(METHOD.PUT, [], {password});
    }

    deleteUser() {
        return this._setupRequest(METHOD.DELETE);
    }
}

export default {
    history: new HistoryClient(),
    places: new PlaceClient(),
    query: new QueryClient(),
    service: new ServiceClient(),
    session: new SessionClient(),
    user: new UserClient()
}