import { createSelector } from 'reselect';
import { get } from 'lodash';

export const getAuthState = state => get(state, 'auth');

export const getSession = createSelector([getAuthState], auth =>
  get(auth, 'session')
);

export const getAccessToken = createSelector(getSession, session =>
  get(session, 'access_token', '')
);

export const getRefreshToken = createSelector(getSession, session =>
  get(session, 'refresh_token')
);

export const isAuthenticated = createSelector(
  [getAccessToken],
  accessToken => !!accessToken
);

export const isSending = createSelector([getAuthState], auth =>
  get(auth, 'currentlySending')
);
export const hasError = createSelector([getAuthState], auth =>
  get(auth, 'error')
);

export const isLoggedIn = createSelector([getAccessToken], token => !!token);
