let user = JSON.parse(getCookie('user') || '{}');

async function ask() {

    if (getCookie('sessionId') && user?.username) return ConfigByUser();

    const username = prompt('Usuário: ')
    const password = prompt('Senha: ')

    const data = await new API_Request('login').append('username', username).append('password', password).fetch()
    
    if (data.status != 200) {

        alert(`Usuário ou senha incorreto. Tente novamente.`)
        ask()
        
    } else {

        user = data.user;
        
        window.location.href = window.location.href.includes('/')? host:host + '/'
    }

    /**
     * 
     */
}

ask()