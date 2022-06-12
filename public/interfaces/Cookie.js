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

function setCookie(cname, cvalue, exdays) {

    const d = new Date(Date.now() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;

    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}