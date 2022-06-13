async function ConfigByUser() {

    const sendfile = document.getElementById('sendfile')
    
    user = await new API_Request('getUserData').fetch();

    if (user.level < 2) {
        sendfile.setAttribute('disabled', '')
        sendfile.style.cursor = 'unset';
        sendfile.style.opacity = '0.4';

        deleteItem = () => console.log("Usuário sem permissão.")
    }

    setCookie('user', user);
    ConfigByUser = () => {};

}