import { createContext, useReducer } from 'react';

const initialState = {
  city: null,
  dates: [],
  options: {
    adult: null,
    children: null,
    room: null,
  },
};

export const ACTION_TYPES = {
  NEW_SEARCH: 'NEW_SEARCH',
  RESET_SEARCH: 'RESET_SEARCH',
};

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.NEW_SEARCH:
      return { ...state, ...payload };
    case ACTION_TYPES.RESET_SEARCH:
      return state;
    default:
      return state;
  }
};

export const SearchContext = createContext({
  city: null,
  dates: [],
  options: {
    adult: null,
    children: null,
    room: null,
  },
});

export const SearchProvider = ({ children }) => {
  //   const [state, dispatch] = useReducer(searchReducer);
  const [{ city, dates, options }, dispatch] = useReducer(
    searchReducer,
    initialState
  );

  const value = { city, dates, options, dispatch };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
