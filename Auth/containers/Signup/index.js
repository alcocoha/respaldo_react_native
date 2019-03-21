import Signup from "../../components/Signup";
import { connect } from "react-redux";
import { registerRequest } from "../../actions";

import { isSending, hasError } from "../../selectors";

const mapStateToProps = state => ({
  sending: isSending(state)
});

const mapDispatchToProps = dispatch => ({
  registerRequest: payload => dispatch(registerRequest(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
