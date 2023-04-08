import React, { createContext, useReducer } from "react";

export const storeContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES'
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return {
        ...state,
        latLong: action.payload.latLong
      };
    }

    case ACTION_TYPES.SET_COFFEE_STORES: {
      return {
        ...state,
        coffeeStores: action.payload.coffeeStores
      };
    }

    default:
      throw new Error(`Unknown action ${action.type}`);
  };
};

export const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: []
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <storeContext.Provider value={{ state, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};