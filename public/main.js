let folder = "/";
const table = document.getElementById('file-list');
const host = `http://${window.location.host}/`;

/**
 * btoa = ascii to base64
 * atob = base64 to ascii 
 */

async function update(button) {

    try {
        folder = button.getAttribute("data-folder");

        const raw_data = await fetch(`${host}getFolder?folder=${btoa(folder)}`);
        const data = await raw_data.json();

        resetTable();

        data.sort((x, y) => y.type.length - x.type.length).map(x => {
            table.innerHTML += `
            <tr>
                <td><img src="/public/assets/${x.type == 'folder' ? 'pasta.png' : 'arquivo.png'}"></td>
                <td style="text-align:left;">${x.name}</td>
                <td>${x.size_bytes} bytes</td>
                <td>${x.createdIn}</td>
                <td>${x.mimeType}</td>
                <td>
                    <button data-folder="${folder}${x.name}${x.type == 'folder'? '/':''}" onclick="update(this)"><img src="/public/assets/download.png"></button> | 
                    <button data-folder="${folder}${x.name}${x.type == 'folder'? '/':''}" onclick="Delete(this)"><img src="/public/assets/lixeira.png"></button> | 
                    <button></button>
                </td>
            </tr>`
        })
    } catch(e) {
        if(e.message == "Unexpected token C in JSON at position 0") open(`${host}getFolder?sendFile=1&folder=${btoa(folder)}`)
    }
}

function resetTable() {

    const filter = folder.split('/').slice(0, -1).join('/');
    table.innerHTML = `
    <tr>
        <th>Tipo</th>
        <th>Nome</th>
        <th>Tamanho</th>
        <th>Criado em</th>
        <th>Mime type</th>
        <th>Ações</th>
    </tr>
    <tr>
        <td><img src="/public/assets/pasta aberta.png"></td>
        <td style="text-align:left;">Uma pasta acima...</td>
        <td>0 bytes</td>
        <td>Agora</td>
        <td>Pasta</td>
        <td><button data-folder="${filter.length == 0 ? '/' : filter}" onclick="update(this)"><img src="/public/assets/download.png"></button> | <button><img src="/public/assets/lixeira.png"></button> | <button></button></td>
    </tr>
    `
}

update({ getAttribute: () => '/' })