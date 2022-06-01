async function ask() {
    
    const username = prompt('Usuário: ')
    const password = prompt('Senha: ')

    const raw_data = await fetch(`${host}login?username=${username}&password=${password}`)
    const data = await raw_data.json()

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