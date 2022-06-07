function OpenSendfileMenu() {

    const popup = new Popup()

    popup.element.innerHTML += `
<div style='display: flex; flex-direction: row;'>
    <div style='padding: 5px; margin: 5px; border: 0.4px solid black; border-radius: 10px; width: 200%;'>
        <div style='text-align: center; font-size: 120%'>
            <strong>Criar pasta</strong>
        </div>
        <br>
        <strong>
            Nome: <input style='width: 78%' id='folder-name'>
        </strong>
        <br>
        <label style='margin-block: 10px; width: 100%; cursor: pointer;'>Criar pasta</label>
    </div>

    <div style='padding: 5px; margin: 5px; border: 0.4px solid black; border-radius: 10px; width: 200%;'>
        <div style='text-align: center; font-size: 120%'>
            <strong>Enviar arquivo</strong>
        </div>
        <br>
        <strong>
            Nome do arquivo:
            <input type='text'>
        </strong>
        <div style='display: flex'>
            <label style='padding: 6px;' for='arquivo'>
                Selecionar arquivo
            </label>
            <label style='padding: 6px;'>Enviar arquivo</label>
            <input type="file" name="arquivo" id="arquivo" style='display: none;'>
        </div>
    </div>
</div>
    `

}