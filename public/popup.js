let Popup_Running = false;

class Popup {
    constructor() {

        if (Popup_Running) this.close();

        document.body.innerHTML +=
            `
        <div id='popup-background'>
            <div id='popup'>
            
            </div>
        </div>
        `

        this.element = document.getElementById('popup')
        this.background = document.getElementById('popup-background')
        this.button = this.addButton('x', self.close)//this.element.getElementsByTagName('button')[0];

        Popup_Running = true;

        this.background.style.position = 'absolute';
        this.background.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
        this.background.style.width = 'max-width'
        this.background.style.top = 0;
        this.background.style.bottom = 0;
        this.background.style.left = 0;
        this.background.style.right = 0;

        this.element.style.position = 'absolute';
        this.element.style.top = '50%'
        this.element.style.left = '50%'
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.padding = '5px';
        this.element.style.border = '0.4px solid black'
        this.element.style.borderRadius = '10%'
        this.element.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
        this.element.style.display = 'flex'
        this.element.style.flexDirection = 'column'

        this.button.style.borderRadius = '50%'
        this.button.style.border = '0.2px solid black'
        this.button.style.cursor = 'pointer'
        this.button.style.width = '20px'
        this.button.style.float = 'right'
        this.button.style.direction = 'right'

        //this.button.addEventListener('click', this.close)

    }

    addButton(innerHTML, onclick) {

        this.element.innerHTML += `<button onclick="${onclick}">${innerHTML}</button>`
        return [...this.element.getElementsByTagName('button')].reverse()[0]

    }

    close() {

        document.getElementById('popup-background').remove()

        Popup_Running = false;

    }
}