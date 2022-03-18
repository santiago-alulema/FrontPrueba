import { useStorage } from 'hooks/use-storage';
import React, { createContext, PropsWithChildren, useContext, useMemo, useReducer } from 'react';
import { StorageConfigType } from 'types';
import { UserLoggedDto } from "types/dtos";
import { AuthState, reducer } from "./auth.reducer";

export type AuthContextType = {
  completeName: string;
  isLogged: boolean;
  token: string;
  rehydrateError: any;
  rehydrated: boolean;
  setAuthState: (UserLoggedDto: UserLoggedDto) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextType);

const INITIAL_STATE: AuthState = {
  firstName: '',
  lastName: '',
  token: '',
}

export type AuthProviderProps = {}

export const AuthProvider = ({ children }: PropsWithChildren<AuthProviderProps>) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const rehydrateLocalState = (payload: AuthState) => {
    dispatch({ type: 'REHYDRATE', payload })
  };

  const setAuthState = (payload: UserLoggedDto) => {
    dispatch({
      type: 'REHYDRATE', payload: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        token: payload.token,
      }
    })
  }
  const config = useMemo<StorageConfigType<AuthState>>(() => (
    {
      key: 'token',
      version: 1,
      migrate: (state) => ({ ...state })
    }
  ), []);

  const loginVerified = () => {
    if (state.token === null || state.token === "" || state.token === undefined) {
      return false;
    }
    else {
      return true
    }
  };

  const logout = () => {
    const payload: AuthState = INITIAL_STATE;
    dispatch({ type: 'REHYDRATE', payload })
  }

  const { error: rehydrateError, rehydrated } = useStorage({ state, setState: rehydrateLocalState, config });

  return (
    <AuthContext.Provider
      value={{
        completeName: state.firstName + ' ' + state.lastName,
        token: state.token,
        isLogged: loginVerified(),
        rehydrateError,
        rehydrated,
        setAuthState,
        logout,
      }}>{children}</AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
