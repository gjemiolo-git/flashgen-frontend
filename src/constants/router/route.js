//import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Dashboard from '../../pages/Dashboard';
import PrivacyPolicy from '../../components/static/PrivacyPolicy'
import About from '../../components/static/About'
import TermsOfService from '../../components/static/TermsOfService'
import Logout from '../../pages/Logout';
import Library from '../../pages/Library';
import HomeOld from '../../pages/Home_old';
import Create from '../../pages/Create';

export const ROUTES = [
    {
        id: 'publicRoutes',
        public: true,
        routes: [
            { path: '/login', element: <Login /> },
            { path: '/logout', element: <Logout /> },
            { path: '/register', element: <Register /> },
            { path: '/terms', element: <TermsOfService /> },
            { path: '/about', element: <About /> },
            { path: '/privacy', element: <PrivacyPolicy /> },
            { path: '/library', element: <Library /> },
            { path: '/create', element: <Create /> },
        ]
    },
    {
        id: 'protectedRoutes',
        protected: true,
        routes: [
            { path: '/dashboard', element: <Dashboard /> },
        ]
    },
    {
        id: 'privateRoutes',
        private: true,
        routes: [


        ]
    }
];
