document.getElementById('sendfile').addEventListener('click', OpenSendfileMenu)

async function OpenSendfileMenu() {

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
            <label onclick="createFolder()">Criar pasta</label>
        </div>

        <div>
            <div>
                <strong>Enviar arquivo</strong>
            </div>
            <br>
            <strong>Caminho do arquivo</strong>
            <input value='${folder}' disabled></input>
            <div style='display: flex; flex-direction: row;'>
                <label for='sendfile-file'> Selecionar arquivo </label>
                <label id='sendfile-label'> Enviar arquivo</label>
                <input type="file" id="sendfile-file" style='display: none;'>
            </div>
        </div>
    </div>
    `

    SendFileRequest()

}


async function SendFileRequest() {
    
    const label_sendfile = document.getElementById('sendfile-label')
    const file = document.getElementById('sendfile-file')

    label_sendfile.addEventListener('click', async(e) => {

        if ([...file.files].length == 0) return new Popup().element.innerHTML += "<span style='margin: 10px;'>É necessário inserir um arquivo para enviar.</span>"

        const form = new FormData()

        for (const x of file.files) { form.append('files[]', x) }

        form.append('path', folder)

        const request = new API_Request()

        request.setRoute('upload')
        request.append('path', btoa(folder))

        const data = await request.fetch({
            method: 'POST',
            body: form,
            'Content-Type': 'multipart/form-data'
        })

        let msg = '';
        let popup = new Popup();

        if (data.status != 200) msg = "Ocorreu um erro ao enviar este arquivo..."
        else {
            msg = "Arquivo enviado com sucesso! Aguarde...";
            reload(2000)
        }

        popup.element.innerHTML += "<span style='margin: 10px;'>"+msg+"</span>"

    })
}

async function createFolder() {

    const folderName = document.getElementById('folder-name').value.replace(/\/\\/g, '')
    const request = new API_Request()

    request.setRoute('createFolder');

    const data = await request.fetch({
        method: 'POST',
        body: JSON.stringify({
            folderName,
            path: folder
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let popup = new Popup();
    let msg = '';

    if (data.status != 200) msg = "Ocorreu um erro ao criar a pasta..."
    else {
        msg = `Pasta "${folderName}" criada com sucesso!`
        reload()
    }

    popup.element.innerHTML += `<span style='margin: 10px;'>${msg}</span>`;

}