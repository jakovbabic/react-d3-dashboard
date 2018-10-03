import initialState from '../../../store/globalState/initialState';

import {
  FETCH_DASHBOARD_INIT,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
  FETCH_TYPEOPTIONS_SUCCESS,
  FETCH_TABLEOPTIONS_SUCCESS,
  DASHBOARD_CHANGED_SUCCESS,
  MODAL_CANCELLED,
  SAVE_GRAPH_SUCCESS,
  DELETE_GRAPH_SUCCESS,
  LAYOUT_CHANGED_SUCCESS,
} from './types';

import { DASHBOARD_TYPE_TABLE } from '../../../constants/dashboard';

export default function dashboardViewReducer(state = initialState.dashboard, action) {
  switch (action.type) {
    case FETCH_DASHBOARD_INIT:
      return { ...state, dashboard: {}, error: '' };
    case FETCH_DASHBOARD_SUCCESS:
      return { ...state, dashboard: action.payload, error: '' };
    case DASHBOARD_CHANGED_SUCCESS:
      return { ...state, selectedTable: action.payload };
    case MODAL_CANCELLED:
      return { ...state, selectedTable: {} };
    case FETCH_DASHBOARD_FAILURE:
      return { ...state, dashboard: {} };
    case SAVE_GRAPH_SUCCESS: {
      const dashboard = state.dashboard;
      const dash = dashboard;
      dash.graph.push(action.payload);
      console.log(dash);
      return { ...state, dashboard: dash };
    }
    case DELETE_GRAPH_SUCCESS: {
      const dashboard = state.dashboard;
      const dash = dashboard;
      dash.graph = dash.graph.filter((e) => {
        return e.graphId !== action.payload.graphId;
      });
      return { ...state, dashboard: dash };
    }
    case FETCH_TYPEOPTIONS_SUCCESS: {
      const data = action.payload.map((item) => {
        return {
          label: item.name,
          value: item.typeId,
        };
      });
      return { ...state, typeOptions: data };
    }
    case LAYOUT_CHANGED_SUCCESS: {
      const dashboard = state.dashboard;
      const dash = dashboard;
      action.payload.forEach((item) => {
        for (let i = 0; i < dash.graph.length; i += 1) {
          if (parseInt(dash.graph[i].graphId, 10) === parseInt(item.i, 10)) {
            dash.graph[i].width = item.w;
            dash.graph[i].height = item.h;
            dash.graph[i].position_x = item.x;
            dash.graph[i].position_y = item.y;
            break;
          }
        }
      });
      return { ...state, dashboard: dash };
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
