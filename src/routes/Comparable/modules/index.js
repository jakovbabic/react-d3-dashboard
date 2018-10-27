import initialState from '../../../store/globalState/initialState';

import {
  FETCH_TYPEOPTIONS_SUCCESS,
  FETCH_SECTOROPTIONS_SUCCESS,
  FETCH_SEGMENTOPTIONS_SUCCESS,
  FETCH_COUNTRYOPTIONS_SUCCESS,
  FETCH_COUNTRYGROUPOPTIONS_SUCCESS,
  SEARCH_CLIENTS_SUCCESS,
} from './types';

export default function dashboardViewReducer(state = initialState.dashboard, action) {
  switch (action.type) {
    case FETCH_TYPEOPTIONS_SUCCESS: {
      const data = action.payload;
      return { ...state, typeOptions: data };
    }
    case FETCH_SECTOROPTIONS_SUCCESS: {
      return { ...state, sectorOptions: action.payload };
    }
    case FETCH_SEGMENTOPTIONS_SUCCESS: {
      const data = action.payload;
      return { ...state, segmentOptions: data };
    }
    case FETCH_COUNTRYOPTIONS_SUCCESS: {
      const data = action.payload;
      return { ...state, countryOptions: data };
    }
    case FETCH_COUNTRYGROUPOPTIONS_SUCCESS: {
      const data = action.payload;
      return { ...state, countryGroupOptions: data };
    }
    case SEARCH_CLIENTS_SUCCESS: {
      const data = action.payload;
      return { ...state, clients: data };
    }
    default:
      return state;
  }
}
