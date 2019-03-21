import { connect } from 'react-redux';
import Login from '../../components/Login';
import { loginRequest } from '../../actions';
import { isSending, hasError } from '../../selectors';
import { getActualShoppingLeg } from '../../../Bargain/selectors';

const mapStateToProps = state => ({
  sending: isSending(state),
  error: hasError(state),
  shoppingCart: getActualShoppingLeg(state)
});

const mapDispatchToProps = dispatch => ({
  loginRequest: payload => dispatch(loginRequest(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
