async function ask() {
    
    const username = prompt('Usuário: ')
    const password = prompt('Senha: ')

    const data = await new API_Request('login').append('username', username).append('password', password).fetch()

    if (data.status != 200) {

        /**
         * Falta fazer aq o bagulho de aceitar o login e também o app.use na api
         */
        
    }

    /**
     * 
     */
}

ask()