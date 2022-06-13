function getCookie(cname) {

    let name = cname + "=";

    for (let c of decodeURIComponent(document.cookie).split(';')) {

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }

    }

    return "";
}

function setCookie(cname, cvalue, milisseconds) {

    const d = new Date(Date.now() + milisseconds);
    const expires = `expires=${d.toUTCString()}`;

    document.cookie = `${cname}=${typeof cvalue == 'string' ? cvalue : JSON.stringify(cvalue)};${expires};path=/`;

}