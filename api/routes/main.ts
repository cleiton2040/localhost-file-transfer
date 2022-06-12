import home from './home';
import Delete from './delete';
import getFolder from './getFolder';
import login from './login';
import uploadFile from './uploadFile';
import createFolder from './createFolder';

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
        route: '/login'
    },
    {
        fn: uploadFile,
        route: '/upload',
        method: 'post'
    },
    {
        fn: createFolder,
        route: '/createFolder',
        method: 'post'
    }
]

export default routes;