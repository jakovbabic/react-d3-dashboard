import initialState from '../../../store/globalState/initialState';

import {
  FETCH_DASHBOARD_INIT,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
} from './types';

export default function dashboardViewReducer(state = initialState.dashboard, action) {
  switch (action.type) {
    case FETCH_DASHBOARD_INIT:
      return {
        error: '',
        dashboard: {},
      };
    case FETCH_DASHBOARD_SUCCESS:
      return {
        error: '',
        dashboard: action.payload,
      };
    case FETCH_DASHBOARD_FAILURE:
      return {
        error: action.payload,
        dashboard: {},
      };
    default:
      return state;
  }
}
