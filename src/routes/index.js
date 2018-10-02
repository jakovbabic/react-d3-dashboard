import NotFound from './NotFound';
import MainPage from './MainPage';
import DashboardPage from './DashboardPage';
import Table from './Table';
import DashboardView from './DashboardView';
import Login from './Login';
import Signup from './Signup';
import { DASHBOARD_VIEW_URL, TABLE_VIEW_URL, DASHBOARD_URL } from '../constants/urls';

export const BASEROUTE = '/';

export const ROUTE_MAIN_PAGE = '/main';
export const ROUTE_DASHBOARD_PAGE = `/${DASHBOARD_URL}`;
export const ROUTE_DASHBOARD_VIEW = `/${DASHBOARD_VIEW_URL}/:id`;
export const ROUTE_TABLE = `/${TABLE_VIEW_URL}/:id`;
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
    path: ROUTE_DASHBOARD_PAGE,
    component: DashboardPage,
    exact: false,
    header: true,
    ignoreSession: false,
  },
  {
    path: ROUTE_TABLE,
    component: Table,
    exact: false,
    header: true,
    ignoreSession: false,
  },
  {
    path: ROUTE_DASHBOARD_VIEW,
    component: DashboardView,
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
