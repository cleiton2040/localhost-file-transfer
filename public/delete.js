function Delete(button) {

    const path = button.getAttribute('data-folder')

    new API_Request('delete').fetch({
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path })
    })

    update({ getAttribute: () => folder})

}