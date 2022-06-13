setInterval(() => {

    for (const x of document.querySelectorAll('[user-name], [user-level], [user-elementType]')) {

        const elementType = x.getAttribute('user-elementType') || 'innerHTML';

        x[elementType] = x[elementType].replace(/{user\.name}/g, user.username || 'User');
        x[elementType] = x[elementType].replace(/{user\.level}/g, user.level || 0);

        x.removeAttribute('user-name');
        x.removeAttribute('user-level');
        x.removeAttribute('user-elementType');

    }

}, 100)
