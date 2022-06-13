import home from './home';
import Delete from './delete';
import getFolder from './getFolder';
import login from './login';
import uploadFile from './uploadFile';
import createFolder from './createFolder';
import getUserData from './getUserData';
import changePassword from './changePassword';
import changettae from './changettae';

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
    },
    {
        fn: getUserData,
        route: '/getUserData'
    },
    {
        fn: changePassword,
        route: '/changePassword',
        method: 'patch'
    },
    {
        fn: changettae,
        route: '/changettae',
        method: 'patch'
    }
]

export default routes;