import { connect } from 'react-redux';
import ResetPassword from '../../components/ResetPassword';

import { resetRequest } from '../../actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  resetRequest: payload => dispatch(resetRequest(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
