import { routerReducer as router } from 'react-router-redux';
import { sessionReducer as session } from 'redux-react-session';
import i18n from 'components/LanguageSelector/modules';
import { reducer as idle } from 'modules/idleMonitor';
import login from 'routes/Login/modules';
import signup from 'routes/Signup/modules';
import global from '../global';

export default {
  router,
  session,
  i18n,
  idle,
  login,
  signup,
  global,
};
