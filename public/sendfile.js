function OpenSendfileMenu() {

    const popup = new Popup()

    popup.element.innerHTML += `
    <div id='sendfile-container'>
        <div>
            <div>
                <strong>Criar pasta</strong>
            </div>
            <br>
            <strong>
                Nome da pasta: <input id='folder-name'>
            </strong>
            <label> Criar pasta</label>
        </div>

        <div>
            <div>
                <strong>Enviar arquivo</strong>
            </div>
            <br>
            <strong> Nome do arquivo: <input type='text'> </strong>
            <div style='display: flex; width: auto; border-radius: 5px'>
                <label for='arquivo'> Selecionar arquivo </label>
                <label> Enviar arquivo</label>
                <input type="file" name="arquivo" id="arquivo" style='display: none;'>
            </div>
        </div>
    </div>
    `

    const container_pai = document.getElementById('sendfile-container');

    container_pai.style.display = 'flex';
    container_pai.style.flexDirection = 'row';

}