import {
  SET_AUTH,
  SET_USER,
  SET_DIRECTORY,
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR
} from '../constants';

const initialState = {
  session: {},
  error: '',
  currentlySending: false,
  userProfile: {},
  userDirectory: {}
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, session: action.payload };
    case SET_USER:
      return { ...state, userProfile: action.payload };
    case SET_DIRECTORY:
      return { ...state, userDirectory: action.payload };
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    case REQUEST_ERROR:
      return { ...state, error: action.error };
    case CLEAR_ERROR:
      return { ...state, error: '' };
    default:
      return state;
  }
}
