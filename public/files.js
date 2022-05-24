let folder = "/";
const table = document.getElementById('file-list');
const host = `http://${window.location.host}/`;

/**
 * btoa = ascii to base64
 * atob = base64 to ascii 
 */

async function update(button) {

    resetTable();

    const element = document.getElementById(button.getAttribute("data-elementopai"));

    folder = element.getAttribute("data-folder");

    const raw_data = await fetch(`${host}getFolder?folder=${btoa(folder)}`);
    const data = await raw_data.json();

    data.sort((x, y) => y.type.length - x.type.length).map(x => {
        table.innerHTML += `
            <tr id="${x.path}" onclick="update(this)" data-folder="${folder}${x.name}/">
                <td><img src="/public/assets/${x.type == 'folder'? 'pasta.png':'arquivo.png'}"></td>
                <td>${x.name}</td>
                <td>${x.size_bytes} bytes</td>
                <td>${x.createdIn}</td>
                <td><button data-folder="${folder}${x.name}/" onclick="update(this)"><img src="/public/assets/download.png"></button> | <button></button> | <button></button></td>
            </tr>`
    })

}

function resetTable() {

    const filter = folder.split('/').slice(0, -1).join('/');
    table.innerHTML = `
    <tr>
        <th style="font-weight: none;">Tipo</th>
        <th style="text-align: left; ">Nome</th>
        <th style="font-weight: none;">Tamanho</th>
        <th style="font-weight: none;">Criado em</th>
        <th style="font-weight: none;">Ações</th>
    </tr>
    <tr id="/" data-folder="${filter.length == 0? '/':filter}" onclick="update(this)">
        <td><img src="/public/assets/pasta aberta.png"></td>
        <td>Uma pasta acima...</td>
        <td>0 bytes</td>
        <td>Agora</td>
        <td><button data-elementopai="/" onclick="update(this)"><img src="/public/assets/download.png"></button> | <button></button> | <button></button></td>
    </tr>
    `
}

update({ getAttribute: () => '/' })