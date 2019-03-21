import {
  SENDING_REQUEST,
  REGISTER_REQUEST,
  LOGOUT,
  SET_AUTH,
  SET_DIRECTORY,
  LOGIN_REQUEST,
  REQUEST_ERROR,
  RESET_REQUEST
} from '../constants';
import api from 'services/api';
import { createAction } from 'redux-actions';

export const setAuthState = createAction(SET_AUTH);

export const sendingRequest = createAction(SENDING_REQUEST);

export const loginRequest = createAction(LOGIN_REQUEST);

export const logout = createAction(LOGOUT);

export const registerRequest = createAction(REGISTER_REQUEST);

export const requestError = createAction(REQUEST_ERROR);

export const resetRequest = createAction(RESET_REQUEST);
