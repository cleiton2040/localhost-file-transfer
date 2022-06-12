let folder = atob(new URL(window.location.href).searchParams.get('folder') || "Lw==") || "/";
let olderdata = {}
const table = document.getElementById('file-list');

/**
 * btoa = ascii to base64
 * atob = base64 to ascii 
 */

async function update(button) {

    try {

        folder = button.getAttribute("data-folder");

        const data = await new API_Request('getFolder').append('folder', btoa(folder)).fetch();

        resetTable();

        data.sort((x, y) => y.type.length - x.type.length).map(x => {
            table.innerHTML += `
            <tr>
                <td><img src="/public/assets/${x.type == 'folder' ? 'pasta.png' : 'arquivo.png'}"></td>
                <td style="text-align:left;">${x.name.length > 20? x.name.slice(0, 20)+'...':x.name}</td>
                <td>${x.size_bytes} bytes</td>
                <td>${x.createdIn}</td>
                <td>${x.mimeType}</td>
                <td>
                    <button data-folder="${folder}${x.name}${x.type == 'folder'? '/':''}" onclick="update(this)"><img src="/public/assets/download.png"></button> | 
                    <button data-folder="${folder}${x.name}${x.type == 'folder'? '/':''}" onclick="Delete(this)"><img src="/public/assets/lixeira.png"></button>
                </td>
            </tr>`
        })
        
        console.log(user);

        for ( let x of document.getElementsByClassName('username')) {
            x.innerHTML = user.username + ' - ' + user.level || 0
        }

    } catch(e) {
        if(e.message == "Unexpected token C in JSON at position 0") open(`${host}/getFolder?sendFile=1&folder=${btoa(folder)}`)
    }
}

function resetTable() {

    const filter = folder.split('/').slice(0, -2).join('/') || '/';
    console.log(filter)
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
        <td><button data-folder="${filter}" onclick="update(this)"><img src="/public/assets/download.png"></button> | <button><img src="/public/assets/lixeira.png"></button>
    </tr>
    `
}

async function refresh() {
    
    let i = 0;
    const interval = setInterval(async() => {
        
        console.log(`[${++i}] - Fazendo uma nova requisição...`)
        const data = await new API_Request('getFolder').append('folder', btoa(folder)).fetch();

        if (data.length != olderdata) {

            update({ getAttribute: () => folder })
            clearInterval(interval)
            console.log(`[${i}] - Dados alterados, atualizando dados e limpando o intervalo.`)

        } else {

            olderdata = data
            console.log(`[${i}] - Dados não alterados, aguarde...`)
        
        };

    }, 100)

}

function reload(ms) {
    setTimeout(() => { window.location.href = `${host}/?folder=${btoa(folder)}` }, 1000)
}

refresh()