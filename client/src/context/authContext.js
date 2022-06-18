import { createContext, useEffect, useReducer } from 'react';

export const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
};

export const ACTION_TYPES = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.LOGIN_START:
      return { loading: true };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return { user: payload, loading: false, error: null };
    case ACTION_TYPES.LOGIN_FAILED:
      return { error: payload, user: null, loading: false };
    case ACTION_TYPES.LOGOUT:
      return state;
    default:
      return state;
  }
};

export const AuthContext = createContext({
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
});

export const AuthProvider = ({ children }) => {
  const [{ user, loading, error }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const value = { user, loading, error, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
