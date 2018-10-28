import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ComparableComponents from '../components';
import {
  loadTypeOptionsAction,
  loadCountryOptionsAction,
  loadCountryGroupOptionsAction,
  loadSegmentOptionsAction,
  loadSectorOptionsAction,
  searchClientsAction,
  saveClientsAction,
  clearClientsAction,
} from '../modules/actions';

function mapStateToProps(state) {
  return {
    literals: state.i18n.literals.comparable || {},
    typeOptions: state.comparableView.typeOptions || [],
    segmentOptions: state.comparableView.segmentOptions || [],
    sectorOptions: state.comparableView.sectorOptions || [],
    countryOptions: state.comparableView.countryOptions || [],
    countryGroupOptions: state.comparableView.countryGroupOptions || [],
    clients: state.comparableView.clients || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadTypeOptions: bindActionCreators(loadTypeOptionsAction, dispatch),
    loadCountryOptions: bindActionCreators(loadCountryOptionsAction, dispatch),
    loadCountryGroupOptions: bindActionCreators(loadCountryGroupOptionsAction, dispatch),
    loadSegmentOptions: bindActionCreators(loadSegmentOptionsAction, dispatch),
    loadSectorOptions: bindActionCreators(loadSectorOptionsAction, dispatch),
    search: bindActionCreators(searchClientsAction, dispatch),
    save: bindActionCreators(saveClientsAction, dispatch),
    clear: bindActionCreators(clearClientsAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComparableComponents));