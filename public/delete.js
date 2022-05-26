function Delete(button) {

    const path = button.getAttribute('data-folder')

    fetch(`${host}delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path })
    })

    update({ getAttribute: () => folder})

}