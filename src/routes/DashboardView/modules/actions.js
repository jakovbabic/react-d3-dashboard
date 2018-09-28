// import apiFetch from 'utils/apiFetch';
import {
  loadingAction,
} from 'store/globalState/global';

import {
  loadDashboardView,
  loadOptions,
  loadDashboard,
} from '../../../services/DashboardService';

import {
  FETCH_DASHBOARD_INIT,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
  FETCH_TYPEOPTIONS_SUCCESS,
  FETCH_TABLEOPTIONS_SUCCESS,
  DASHBOARD_CHANGED_SUCCESS,
} from './types';

export function fetchDashboardsInit() {
  return {
    type: FETCH_DASHBOARD_INIT,
  };
}

export function fetchDashboardsSuccess(res) {
  return {
    type: FETCH_DASHBOARD_SUCCESS,
    payload: res,
  };
}

export function fetchDashboardsFailed(error) {
  return {
    type: FETCH_DASHBOARD_FAILURE,
    payload: error,
  };
}

export function loadTypeOptionsSuccess(res) {
  return {
    type: FETCH_TYPEOPTIONS_SUCCESS,
    payload: res,
  };
}

export function loadTableOptionsSuccess(res) {
  return {
    type: FETCH_TABLEOPTIONS_SUCCESS,
    payload: res,
  };
}


export function dashboardChangeSuccess(res) {
  return {
    type: DASHBOARD_CHANGED_SUCCESS,
    payload: res,
  };
}

export function loadTypeOptionsAction() {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return new Promise((resolve) => {
      loadOptions().then((res) => {
        dispatch(loadTypeOptionsSuccess(res));
        dispatch(loadingAction(false));
        resolve(true);
      });
    });
  };
}

export function loadTableOptionsAction() {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return new Promise((resolve) => {
      loadDashboard().then((res) => {
        dispatch(loadTableOptionsSuccess(res));
        dispatch(loadingAction(false));
        resolve(true);
      });
    });
  };
}

export function fetchdashboardsAction(id) {
  return (dispatch) => {
    dispatch(loadingAction(true));
    dispatch(fetchDashboardsInit());
    return new Promise((resolve) => {
      loadDashboardView(id).then((res) => {
        dispatch(fetchDashboardsSuccess(res));
        dispatch(loadingAction(false));
        resolve(true);
      });
    });
  };
}

export function dashboardChangeAction(id) {
  return (dispatch) => {
    dispatch(loadingAction(true));
    return new Promise((resolve) => {
      loadDashboardView(id).then((res) => {
        dispatch(dashboardChangeSuccess(res));
        dispatch(loadingAction(false));
        resolve(true);
      });
    });
  };
}
