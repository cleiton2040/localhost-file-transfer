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
            <form id="sendfile-form" style='display: flex; flex-direction: row;' action="/upload" method="post" enctype="multipart/form-data">
                <label for='file-upload'> Selecionar arquivo </label>
                <label for='sendfile' id='sendfile-label'> Enviar arquivo</label>
                <input style='display: none;' type='submit' id='sendfile-button' ></input>
                <input type="file" id="file-upload" style='display: none;'>
            </form>
        </div>
    </div>
    `

    const label_sendfile = document.getElementById('sendfile-label')
    const sendfile = document.getElementById('sendfile-button')
    const form = document.getElementById('sendfile-form')
    const file_upload = document.getElementById('file-upload')

    label_sendfile.addEventListener('click', () => {
        sendfile.click()
    })

    form.addEventListener('submit', (e) => {
        
        e.preventDefault()

        const file = file_upload.files
        const formData = new FormData()

        formData.append('files[]', file)

        const request = new API_Request()

        request.setRoute('upload')
        
        const data = await request.fetch({
            method: 'POST',
            body: formData()
        })

        console.log(file, formData, request, data)

    })
}