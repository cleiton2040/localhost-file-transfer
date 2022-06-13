const profileButton = document.getElementById('profile')

profileButton.addEventListener('click', openProfile)
//profileButton.click();

function openProfile() {

    const popup = new Popup({ reloadOnClose: true });

    popup.element.innerHTML += `
    <div id="profile-container">
        <div>
            <strong>Nome: </strong>
            <input disabled value="${user.username}">
        </div>
        <div>
            <strong>Senha: </strong>
            <button id="profile-password">Alterar senha</button>
        </div>
        <div>
            <strong>Nível de acesso (1 - 3): </strong>
            <input disabled value="${user.level}">
        </div>
        <div>
            <strong>Tempo inativo até deslogar automaticamente:</strong>
            <button id="profile-timeToAutoExit">${user.timeToAutoExit}ms - Alterar</button>
        </div>
    </div>
    `

    const password = document.getElementById('profile-password')
    const timeToAutoExit = document.getElementById('profile-timeToAutoExit')

    password.addEventListener('click', changePassword)
    timeToAutoExit.addEventListener('click', changeTimeToAutoExit)
}

function changePassword() {

    Popup.close();

    const popup = new Popup({ reloadOnClose: true })

    popup.element.innerHTML += `
    <div id="change-password">
        <div>
            <strong>Senha atual: </strong>
            <input id="password-atual">
        </div>
        <div>
            <strong>Nova senha: </strong>
            <input id="password-new">
        </div>
        <div>
            <strong>Confirmar nova senha: </strong>
            <input id="password-confirm">
        </div>
        <button id="change-password-button" disabled>Alterar senha</button>
    </div>
    `

    const password_atual = document.getElementById('password-atual');
    const password_new = document.getElementById('password-new');
    const password_confirm = document.getElementById('password-confirm');
    const passwords = [password_atual, password_new, password_confirm];
    const button = document.getElementById('change-password-button');
    const passwordLength = 3;

    passwords.map(x => x.addEventListener('input', checkPassword))
    passwords.map(x => x.setAttribute('type', 'password'))

    function checkPassword() {

        if (
            password_atual.value.length != passwordLength &&
            password_atual.value.length >= passwordLength &&
            password_new.value.length >= passwordLength &&
            password_confirm.value.length >= passwordLength &&
            password_new.value == password_confirm.value
        ) button.removeAttribute('disabled');

        else button.setAttribute('disabled', '')

    }

    button.addEventListener('click', async() => {

        const request = new API_Request('changePassword')
        const data = await request.fetch({
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: {
                senhaAtual: password_atual.value,
                newPassword: password_new.value
            }
        })

        const popup = new Popup({ reloadOnClose: true });
        const msgSub = {
            "400": "Possivelmente a senha tem menos de 4 caracteres.",
            "401": "A senha inserida está incorreta.",
            "200": "Senha alterada com sucesso!",
        }

        popup.element.innerHTML += `<strong style="padding: 5px">${msgSub[`${data.status}`] || "Ocorreu um erro ao alterar a senha..."}</strong>`

        reloadPage(5000)
    })
}

function changeTimeToAutoExit() {

    Popup.close();

    const popup = new Popup({ reloadOnClose: true });

    popup.element.innerHTML += `
    <div id="change-time_to_auto_exit">
        <div>
            <strong>Tempo inativo até<br>deslogar automaticamente:</strong>
            <input type='number' id="ttae-tempo" value="0">
            <select id="ttae-medida">
                <option value="m" default>Minutos</option>
                <option value="h">Horas</option>
                <option value="d">Dias</option>
            </select>
        </div>
        <button id="ttae-alterar" disabled>Alterar tempo</button>
    </div>`

    const tempo = document.getElementById('ttae-tempo');
    const medida = document.getElementById('ttae-medida');
    const botao = document.getElementById('ttae-alterar');
    let olderState = 'm';

    medida.addEventListener('change', () => {

        /*switch (medida.value) {
            case 'd':
                if (olderState == 'm') tempo.value = tempo.value / 1440;
                else tempo.value = tempo.value / 24;
                break;
            case 'h':
                if (olderState == 'm') tempo.value = tempo.value * 60;
                else tempo.value = tempo.value / 24
                break;
            case 'm':
                if (olderState == 'h') tempo.value = tempo.value * 60;
                else tempo.value = tempo.value * 1440;
                break;
        }

        olderState = medida.value;*/

    })

    const interval = setInterval(() => {

        const value = +tempo.value
        
        if (value && value <= 0) {
            tempo.value = 1;
            botao.setAttribute('disabled', '')
        } else botao.removeAttribute('disabled');

    }, 10)

    botao.addEventListener('click', alterarttae);

    async function alterarttae() {

        clearInterval(interval);

        let time = 0;
        let popup = new Popup({ reloadOnClose: true });
        let msg = '';

        switch(medida.value) {
            case 'm': time = tempo.value * 60000; break;
            case 'h': time = tempo.value * 3.6e+6; break;
            case 'd': time = tempo.value * 8.64e+7; break; 
        }

        if (tempo < 0 || tempo > 6.048e+8) msg = "Tempo inválido." 
        else {

            const request = new API_Request('changettae');
            const data = await request.fetch({
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: { time }
            })

            if (data.status != 200) msg = "Ocorreu um tempo ao alterar seu tempo de inatividade...";
            else msg = "Tempo de inatividade alterado com sucesso.";

        }

        popup.element.innerHTML += `<strong style="padding: 5px;">${msg}</strong>`;
        
    }

}