async function ask() {
    
    const username = prompt('Usuário: ')
    const password = prompt('Senha: ')

    const data = await new API_Request('login').append('username', username).append('password', password).fetch()

    if (data.status != 200) {

        alert(`Usuário ou senha incorreto. Tente novamente.`)
        ask()
        
    }

    /**
     * 
     */
}

ask()