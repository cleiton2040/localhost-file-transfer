const host = `http://${window.location.host}`;

class API_Request {
    constructor(route) {
        this.host = host;
        this.params = new URLSearchParams();
        this.route = route ? this.setRoute(route) : '';
    }

    append(key, value) {
        this.params.append(key, value)
        return this;
    }

    setRoute(route) {
        this.route = route[0] === '/' ? route.slice(1) : route;
        if (this.route.split('').reverse()[0] !== '/') this.route += '/'
        return this.route;
    }

    async fetch(additional) {

        const urlToFetch = `${this.host}/${this.route}?${this.params}`;
        const raw_data = await fetch(urlToFetch, additional);

        try { return raw_data.json(); } catch (e) { return raw_data }

    }
}