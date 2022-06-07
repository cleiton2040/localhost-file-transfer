let user = JSON.parse(sessionStorage.getItem('user')) || {};

async function ask() {
    
    if (sessionStorage.getItem('sessionKey')) return;

    const username = prompt('Usuário: ')
    const password = prompt('Senha: ')

    const data = await new API_Request('login').append('username', username).append('password', password).fetch()
    
    if (data.status != 200) {

        alert(`Usuário ou senha incorreto. Tente novamente.`)
        ask()
        
    } else {

        sessionStorage.setItem('sessionKey', data.hash)
        sessionStorage.setItem('user', JSON.stringify(data.user))

        user = data.user;
        
        update({ getAttribute: () => '/' })
        
        window.location.href = window.location.href.includes('/')? host:host + '/'
    }

    /**
     * 
     */
}

ask()