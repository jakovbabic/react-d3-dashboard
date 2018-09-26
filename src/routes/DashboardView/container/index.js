import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import DashboardViewComponents from '../components';
import fetchdashboardsAction from '../modules/actions';

function mapStateToProps(state) {
  return {
    dashboard: state.dashboardView.dashboard || {},
    literals: state.i18n.literals.dashboardview || {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadDashboards: bindActionCreators(fetchdashboardsAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardViewComponents));
