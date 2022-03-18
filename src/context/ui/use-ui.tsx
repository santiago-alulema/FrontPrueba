import React, { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { reducer, UiState } from './ui.reducer';

export type UiContextType = {
  isCategoriesOpen: boolean;
  toggleCategoriesDrawer: () => void;
}

const UiContext = createContext({} as UiContextType);

const INITIAL_STATE: UiState = {
  isCategoriesDrawerOpen: false,
};

export type UiProviderProps = {}

export const UiProvider = ({ children }: PropsWithChildren<UiProviderProps>) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const toggleCategoriesDrawer = () => {
    dispatch({ type: 'TOGGLE_CATEGORIES_DRAWER' });
  };

  return (
    <UiContext.Provider
      value={{
        isCategoriesOpen: state.isCategoriesDrawerOpen,
        toggleCategoriesDrawer,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => useContext(UiContext);
