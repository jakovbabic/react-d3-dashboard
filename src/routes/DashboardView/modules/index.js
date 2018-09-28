import initialState from '../../../store/globalState/initialState';

import {
  FETCH_DASHBOARD_INIT,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
  FETCH_TYPEOPTIONS_SUCCESS,
  FETCH_TABLEOPTIONS_SUCCESS,
  DASHBOARD_CHANGED_SUCCESS,
} from './types';

import { DASHBOARD_TYPE_TABLE } from '../../../constants/dashboard';

export default function dashboardViewReducer(state = initialState.dashboard, action) {
  switch (action.type) {
    case FETCH_DASHBOARD_INIT:
      return { ...state, dashboard: {}, error: '' };
    case FETCH_DASHBOARD_SUCCESS:
      return { ...state, dashboard: action.payload, error: '' };
    case DASHBOARD_CHANGED_SUCCESS:
      console.log(action.payload);
      return { ...state, selectedTable: action.payload };
    case FETCH_DASHBOARD_FAILURE:
      return { ...state, dashboard: {} };
    case FETCH_TYPEOPTIONS_SUCCESS: {
      const data = action.payload.map((item) => {
        return {
          label: item.name,
          value: item.typeId,
        };
      });
      return { ...state, typeOptions: data };
    }
    case FETCH_TABLEOPTIONS_SUCCESS: {
      const data = [];
      action.payload.forEach((item) => {
        if (item.type === DASHBOARD_TYPE_TABLE) {
          data.push({
            label: item.name,
            value: item.viewId,
          });
        }
      });
      return { ...state, tableOptions: data };
    }
    default:
      return state;
  }
}
