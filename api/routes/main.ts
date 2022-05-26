import home from './home';
import Delete from './delete';
import getFolder from './getFolder';

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
    }
]

export default routes;