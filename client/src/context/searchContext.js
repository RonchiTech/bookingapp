import { createContext, useReducer } from 'react';

const initialState = {
  city: null,
  dates: [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
  openDate: false,
  openOptions: false,
  destination: '',
};

export const ACTION_TYPES = {
  NEW_SEARCH: 'NEW_SEARCH',
  RESET_SEARCH: 'RESET_SEARCH',
  OPEN_DATE: 'OPEN_DATE',
  OPEN_OPTIONS: 'OPEN_OPTIONS',
  SET_DESTINATION: 'SET_DESTINATION',
  SET_DATE: 'SET_DATE',
  SET_OPTIONS: 'SET_OPTIONS',
};

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.NEW_SEARCH:
      return { ...state, ...payload };
    case ACTION_TYPES.RESET_SEARCH:
      return state;
    case ACTION_TYPES.OPEN_DATE:
      return { ...state, openDate: payload };
    case ACTION_TYPES.SET_DESTINATION:
      return { ...state, destination: payload };
    case ACTION_TYPES.SET_DATE:
      return { ...state, dates: payload };
    case ACTION_TYPES.SET_OPTIONS:
      return { ...state, options: payload };
    case ACTION_TYPES.OPEN_OPTIONS:
      return { ...state, openOptions: payload };
    default:
      return state;
  }
};

export const SearchContext = createContext({
  city: null,
  dates: [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
  openDate: false,
  openOptions: false,
  destination: '',
});

export const SearchProvider = ({ children }) => {
  //   const [state, dispatch] = useReducer(searchReducer);
  const [
    { city, dates, options, openDate, destination, openOptions },
    dispatch,
  ] = useReducer(searchReducer, initialState);

  const value = {
    city,
    dates,
    options,
    openDate,
    dispatch,
    destination,
    openOptions,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
