import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withNavigation } from 'react-navigation';

import AuthButton from '../../components/AuthButton';
import { isLoggedIn } from '../../selectors';

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state)
});

export default compose(
  injectIntl,
  withNavigation,
  connect(mapStateToProps)
)(AuthButton);
