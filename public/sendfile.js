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
            <label> Criar pasta</label>
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

        console.log(file, form, request, data)

    })
}