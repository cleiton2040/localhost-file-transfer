import home from './home';
import Delete from './delete';
import getFolder from './getFolder';
import login from './login';

const routes = [
    {
        fn: home,
        route: '/'
    },
    {
        fn: getFolder,
        route: '/getFolder'
    },
    {
        fn: Delete,
        route: '/delete',
        method: 'delete'
    },
    {
        fn: login,
        route: ('/login')
    }
]

export default routes;