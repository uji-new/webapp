import urlcat from 'urlcat';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

class BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return new Promise((resolve, reject) => {
            window.fetch(urlcat(['', ...paths].join('/'), params), {method, credentials: 'same-origin'}).catch(reject)
                .then(response => response.ok ? response.json().then(resolve).catch(() => resolve(null)) : reject(response));
        })
    }
}

class HistoryClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['history', ...paths], params);
    }

    getLocations() {
        return this._setupRequest(METHOD.GET);
    }

    restoreLocation(coords) {
        return this._setupRequest(METHOD.POST, [':coords'], {coords});
    }

    removeLocation(coords) {
        return this._setupRequest(METHOD.DELETE, [':coords'], {coords});
    }
}

class LocationClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['locations', ...paths], params);
    }

    getLocations() {
        return this._setupRequest(METHOD.GET);
    }

    addLocation(query, alias) {
        let params = {query, alias};
        if (!alias) delete params.alias;
        return this._setupRequest(METHOD.POST, [':query'], params);
    }

    updateLocation(coords, alias) {
        return this._setupRequest(METHOD.PUT, [':coords'], {coords, alias});
    }

    removeLocation(coords) {
        return this._setupRequest(METHOD.DELETE, [':coords'], {coords});
    }
}

class QueryClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['query', ...paths], params);
    }

    query(query) {
        return this._setupRequest(METHOD.GET, [':query'], {query});
    }
}

class ServiceClient extends BaseClient {
    TYPE = {
        WEATHER: 'WEATHER',
        EVENTS: 'EVENTS',
        NEWS: 'NEWS'
    }

    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['services', ...paths], params);
    }

    getServices() {
        return this._setupRequest(METHOD.GET);
    }

    enableAllServices() {
        return this._setupRequest(METHOD.POST);
    }

    disableAllServices() {
        return this._setupRequest(METHOD.DELETE);
    }

    enableService(type) {
        return this._setupRequest(METHOD.POST, [], {type});
    }

    disableService(type) {
        return this._setupRequest(METHOD.DELETE, [], {type});
    }

    getServicesForLocation(coords) {
        return this._setupRequest(METHOD.GET, [':coords'], {coords});
    }

    enableAllServicesForLocation(coords) {
        return this._setupRequest(METHOD.POST, [':coords'], {coords});
    }

    disableAllServicesForLocation(coords) {
        return this._setupRequest(METHOD.DELETE, [':coords'], {coords});
    }

    enableServiceForLocation(coords, type) {
        return this._setupRequest(METHOD.POST, [':coords'], {coords, type});
    }

    disableServiceForLocation(coords, type) {
        return this._setupRequest(METHOD.DELETE, [':coords'], {coords, type});
    }
}

class SessionClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['session', ...paths], params);
    }
    getSession() {
        return this._setupRequest(METHOD.GET);
    }

    login(mail, password) {
        return this._setupRequest(METHOD.POST, [], {mail, password});
    }

    loginAsGuest() {
        return this._setupRequest(METHOD.POST, ['guest']);
    }

    logout() {
        return this._setupRequest(METHOD.DELETE);
    }
}

class AccountClient extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['account', ...paths], params);
    }

    register(mail, password) {
        return this._setupRequest(METHOD.POST, [], {mail, password});
    }

    updateAccount(password) {
        return this._setupRequest(METHOD.PUT, [], {password});
    }

    deregister() {
        return this._setupRequest(METHOD.DELETE);
    }
}

export default {
    history: new HistoryClient(),
    location: new LocationClient(),
    query: new QueryClient(),
    service: new ServiceClient(),
    session: new SessionClient(),
    account: new AccountClient()
}