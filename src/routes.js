import Dynamic from './pages/Dynamic';
import Static from './pages/Static';
import Home from './pages/Home';
import { getStarWarsPeople } from './api/http';

export default [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/static',
        component: Static
    },
    {
        component: Dynamic,
        path: '/dynamic',
        getInitialProps: getStarWarsPeople
    }
];
