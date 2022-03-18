import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from 'notistack';
import React, { PropsWithChildren } from "react";
import { SWRConfig } from "swr";
import { CustomThemeProvider } from "theme";
import { fetcher } from 'utils';
import { AuthProvider } from "./auth/use-auth";
import { CartProvider } from "./cart";
import { LanguageProvider } from "./language";
import { UiProvider } from "./ui";

export type GlobalContextProviderProps = {};

export const GlobalContextProvider = ({ children }: PropsWithChildren<GlobalContextProviderProps>) => {
  return (
    <CustomThemeProvider>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <LanguageProvider>
        <UiProvider>
          <CartProvider>
            <AuthProvider>
              <SWRConfig
                value={{
                  fetcher,
                  onError: (error, key) => {
                    console.log(error, key);
                  }
                }}
              >
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {children}
                </SnackbarProvider>
              </SWRConfig>
            </AuthProvider>
          </CartProvider>
        </UiProvider>
      </LanguageProvider>
    </CustomThemeProvider >
  );
}