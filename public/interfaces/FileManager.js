let folder = atob(new URL(window.location.href).searchParams.get('folder') || "Lw==") || "/";
let olderdata = {}
const table = document.getElementById('file-list');

const icones = {
    download: '/public/assets/download.png',
    lixeira: '/public/assets/lixeira.png',
    pasta: 'public/assets/pasta.png',
    arquivo: 'public/assets/arquivo.png'
}

/**
 * btoa = ascii to base64
 * atob = base64 to ascii 
 */

async function updateTable(button) {

    try {

        folder = button.getAttribute("data-folder");

        const data = await new API_Request('getFolder').append('folder', btoa(folder)).fetch();
        const writeInDelete = user.level < 2 ? 'disabled style="opacity: 0.6; cursor: unset;"' : 'onclick="deleteItem(this)"'

        resetTable();

        data.sort((x, y) => y.type.length - x.type.length).map(x => {

            const filePath = `${folder}${x.name}${x.type == 'folder' ? '/' : ''}`;
            const fileIcon = x.type == 'folder' ? icones.pasta : icones.arquivo;
            const fileName = x.name.length > 20 ? x.name.slice(0, 20) + '...' : x.name;

            table.innerHTML += `
            <tr>
                <td><img src="${fileIcon}"></td>
                <td style="text-align:left;">${fileName}</td>
                <td>${x.size_bytes} bytes</td>
                <td>${x.createdIn}       </td>
                <td>${x.mimeType}        </td>
                <td>
                    <button data-folder="${filePath}" onclick="updateTable(this)" title="- Baixar arquivo\n- Acessar pasta"><img src="${icones.download}"></button> | 
                    <button data-folder="${filePath}" ${writeInDelete}            title="Deletar arquivo ou pasta"><img src="${icones.lixeira}"> </button>
                </td>
            </tr>`

        })

    } catch (e) {
        if (e.message == "Unexpected token C in JSON at position 0") open(`${host}/getFolder?sendFile=1&folder=${btoa(folder)}`)
    }
}

function resetTable() {

    const filter = folder.split('/').slice(0, -2).join('/') || '/';

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
        <td><button data-folder="${filter}" onclick="updateTable(this)"><img src="/public/assets/download.png"></button> | <button disabled style="opacity: 0.6; cursor: unset;"><img src="/public/assets/lixeira.png"></button>
    </tr>
    `
    
}

async function refreshTable() {

    let i = 0;
    const interval = setInterval(async () => {

        console.log(`[${++i}] - Fazendo uma nova requisição...`)
        const data = await new API_Request('getFolder').append('folder', btoa(folder)).fetch();

        if (data.length != olderdata) {

            updateTable({ getAttribute: () => folder })

            clearInterval(interval)

            console.log(`[${i}] - Dados alterados, atualizando dados e limpando o intervalo.`)

        } else {

            olderdata = data
            console.log(`[${i}] - Dados não alterados, aguarde...`)

        };

    }, 100)

}

function reloadPage(ms) {
    setTimeout(() => { window.location.href = `${host}/?folder=${btoa(folder)}` }, ms || 1000)
}

refreshTable()