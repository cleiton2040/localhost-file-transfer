let folder = btoa("/");
const table = document.getElementById('file-list');
const host = `http://${window.location.host}/`;

async function update(button) {
    resetTable()
    folder = button.getAttribute("folder");
    const raw_data = await fetch(`${host}getFolder?folder=${atob(folder)}`);
    const data = await raw_data.json();
    console.log(data);
    table.innerHTML += `
    <tr>
        <th>aaa</th>
    </tr>`
}

function resetTable() {
    table.innerHTML = `
    <tr>
        <th>Tipo</th>
        <th>Nome do arquivo/pasta</th>
        <th>Tamanho</th>
    </tr>
    `
}

update({ getAttribute: () => btoa('/') })