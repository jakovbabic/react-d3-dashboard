import NotFound from './NotFound';
import MainPage from './MainPage';
import Login from './Login';
import Signup from './Signup';

export const BASEROUTE = '/';

export const ROUTE_MAIN_PAGE = '/main';
export const ROUTE_LOGIN = '/login';
export const ROUTE_LOGOUT = '/logout';
export const ROUTE_SIGNUP = '/signup';

export const routes = [
  {
    path: BASEROUTE,
    component: MainPage,
    exact: true,
    header: true,
    ignoreSession: false,
  },
  {
    path: ROUTE_MAIN_PAGE,
    component: MainPage,
    exact: false,
    header: true,
    ignoreSession: false,
  },
  {
    path: ROUTE_LOGIN,
    component: Login,
    exact: false,
    header: false,
    ignoreSession: true,
  },
  {
    path: ROUTE_SIGNUP,
    component: Signup,
    exact: false,
    header: false,
    ignoreSession: true,
  },
  {
    component: NotFound,
    header: false,
  },
];
