import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import DashboardViewComponents from '../components';
import { fetchdashboardsAction, loadTypeOptionsAction, loadTableOptionsAction } from '../modules/actions';

function mapStateToProps(state) {
  return {
    dashboard: state.dashboardView.dashboard || {},
    literals: state.i18n.literals.dashboardview || {},
    typeOptions: state.dashboardView.typeOptions || [],
    tableOptions: state.dashboardView.tableOptions || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadDashboards: bindActionCreators(fetchdashboardsAction, dispatch),
    loadTypeOptions: bindActionCreators(loadTypeOptionsAction, dispatch),
    loadTableOptions: bindActionCreators(loadTableOptionsAction, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardViewComponents));
