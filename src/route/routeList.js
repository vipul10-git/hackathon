
import Dashboard from '../client/pages/dashboard';
import IdeaDashboard from '../client/pages/ideaDashboard';
import LoginPage from '../client/pages/loginPage';

export const RouteList = [
    {
        path: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/createNewIdea',
        component: IdeaDashboard
    },
    {
        path: '/login',
        component: LoginPage,
    }
]