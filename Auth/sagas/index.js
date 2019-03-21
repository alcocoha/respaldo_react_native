import {
  all,
  call,
  put,
  race,
  takeLatest,
  take,
  select
} from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import { get } from 'lodash';
import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  LOGIN_REQUEST,
  LOGOUT,
  SET_AUTH,
  SET_USER,
  REGISTER_REQUEST,
  RESET_REQUEST,
  SET_DIRECTORY
} from '../constants';
import api from 'services/api';
import {
  resetToWelcome,
  navigateToPassengerData,
  navigateToPassengerDirectory
} from '../../../navigation/actions';
import {
  getErrorMessage,
  getErrorMessage503,
  getErrorMessageNoFoundEmail,
  getErrorMessageNoSMTP,
  getErrorMessageDuplicateUsername
} from 'features/LanguageProvider/selectors';
import { getActualShoppingLeg } from '../../Bargain/selectors';

export function* authorize(payload, isRegistering) {
  yield put({ type: SENDING_REQUEST, sending: true });

  try {
    const endPoint = isRegistering ? api.register : api.login;
    const response = yield call(endPoint, payload);

    return response;
  } catch (error) {
    const statusCode = get(error, ['response', 'status']);
    const errorUsername = get(error, [
      'response',
      'data',
      'errors',
      'username'
    ]);

    if (statusCode === 503) {
      const COPY_MESSAGE = yield select(getErrorMessage503);
      Toast.show(COPY_MESSAGE, Toast.SHORT);
    } else if (errorUsername) {
      const COPY_MESSAGE = yield select(getErrorMessageDuplicateUsername);
      Toast.show(COPY_MESSAGE, Toast.SHORT);
    } else {
      const COPY_MESSAGE = yield select(getErrorMessage);
      Toast.show(COPY_MESSAGE, Toast.SHORT);
    }

    yield put({ type: REQUEST_ERROR, error: error.message });

    return false;
  } finally {
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

export function* getUser(access_token) {
  try {
    const response = yield call(api.getUser, access_token);
    const {
      data: { result }
    } = response;
    yield put({ type: SET_USER, payload: result });
    return result;
  } catch (error) {
    const COPY_MESSAGE = yield select(getErrorMessage);
    Toast.show(COPY_MESSAGE, Toast.SHORT);
    return false;
  }
}

export function* getUserDirectory(access_token) {
  try {
    const response = yield call(api.getUserDirectory, access_token);
    const { data } = response;
    yield put({ type: SET_DIRECTORY, payload: data });
    return data;
  } catch (error) {
    const COPY_MESSAGE = yield select(getErrorMessage);
    Toast.show(COPY_MESSAGE, Toast.SHORT);
    return false;
  }
}

export function* logout() {
  yield put({ type: SENDING_REQUEST, sending: true });

  try {
    const response = yield call(api.logout);
    yield put({ type: SENDING_REQUEST, sending: false });

    return response;
  } catch (error) {
    yield put({ type: REQUEST_ERROR, error: error.message });
  } finally {
    yield put({ type: SENDING_REQUEST, sending: false });
  }
}

export function* loginFlow(action) {
  const { payload } = action;

  const winner = yield race({
    auth: call(authorize, payload, false),
    logout: take(LOGOUT)
  });

  if (winner.auth) {
    const { data } = winner.auth;
    const { access_token } = data;

    yield put({ type: SET_AUTH, payload: data });
    api.setAuthorizationHeader(access_token);

    yield call(getUserDirectory, access_token);
      
    if (yield call(getUser, access_token)) {
      const BARGAIN = yield select(getActualShoppingLeg);
      if (BARGAIN > 0) {
        yield put(navigateToPassengerDirectory());
      } else {
        yield put(resetToWelcome());
      }

    }
  }
}

export function* logoutFlow() {
  yield put({ type: SET_AUTH, payload: {} });
  yield call(logout);
  api.setAuthorizationHeader();
}

export function* registerFlow(action) {
  const { payload } = action;

  const wasSuccessfull = yield call(authorize, payload, true);

  if (wasSuccessfull) {
    const session = get(wasSuccessfull, ['data', 'results', 'session']);
    const { access_token } = session;

    yield put({ type: SET_AUTH, payload: session });
    api.setAuthorizationHeader(access_token);
    if (yield call(getUser, access_token)) {
      const BARGAIN = yield select(getActualShoppingLeg);
      if (BARGAIN > 0) {
        yield put(navigateToPassengerData());
      } else {
        yield put(resetToWelcome());
      }
    }
  }
}

export function* resetFlow(action) {
  const { payload } = action;

  try {
    const response = yield call(api.resetPassword, payload);
  } catch (error) {
    const {
      response: { data }
    } = error;

    const statusCode = get(error, ['response', 'status']);
    if (statusCode === 500) {
      const COPY_MESSAGE = yield select(getErrorMessageNoSMTP);
      Toast.show(COPY_MESSAGE, Toast.SHORT);
    } else if (data.errors.email) {
      const COPY_MESSAGE = yield select(getErrorMessageNoFoundEmail);
      Toast.show(COPY_MESSAGE, Toast.SHORT);
    }
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(LOGOUT, logoutFlow),
    takeLatest(LOGIN_REQUEST, loginFlow),
    takeLatest(REGISTER_REQUEST, registerFlow),
    takeLatest(RESET_REQUEST, resetFlow)
  ]);
}
