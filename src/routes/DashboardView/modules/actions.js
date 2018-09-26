// import apiFetch from 'utils/apiFetch';
import {
  loadingAction,
} from 'store/globalState/global';

import {
  loadDashboardView,
} from '../../../services/DashboardService';

import {
  FETCH_DASHBOARD_INIT,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
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

export default function fetchdashboardsAction(id) {
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
