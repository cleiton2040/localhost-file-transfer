import home from './home';
import getFolder from './getFolder';

const routes = [
    {
        fn: home,
        route: '/'
    },
    {
        fn: getFolder,
        route: '/getFolder'
    }
]

export default routes;