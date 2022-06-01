const host = `http://${window.location.host}/`;

class API_Request {
    constructor() {
        this.host = host;
        this.search = new URLSearchParams()
    }
}