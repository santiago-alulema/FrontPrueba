import { alpha, createTheme, responsiveFontSizes, Theme, ThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

export const theme: Theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#599FD8',
        contrastText: 'white',
      },
      secondary: {
        main: '#8D1519',
      },
    },
    spacing: 8,
    typography: {
      fontFamily: [
        'panton',
        'sans-serif',
      ].join(','),
      h1: {
        fontFamily: 'coconbold',
      },
      h2: {
        fontFamily: 'coconbold',
      },
      h3: {
        fontFamily: 'coconbold',
      },
      h4: {
        fontFamily: 'coconbold',
      },
      h5: {
        fontFamily: 'coconbold',
      },
      h6: {
        fontFamily: 'panton',
      },
      subtitle2: {
        fontFamily: 'panton',
      },
      button: {
        fontFamily: 'panton',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "@font-face": {
            fontFamily: 'coconbold',
            src: `url('/fonts/cocon/cocon-bold-font-webfont.woff2') format('woff2'),
                  url('/fonts/cocon/cocon-bold-font-webfont.woff') format('woff')`,
            fontWeight: 'bold',
            fontStyle: 'normal',
            fontDisplay: 'swap',
          },
          fallbacks: [
            {
              "@font-face": {
                fontFamily: 'panton',
                src: `url('/fonts/panton/panton-bold-webfont.woff2') format('woff2'),
                      url('/fonts/panton/panton-bold-webfont.woff') format('woff')`,
                fontWeight: 'bold',
                fontStyle: 'normal',
                fontDisplay: 'swap',
              },
            },
            {
              "@font-face": {
                fontFamily: 'panton',
                src: `url('/fonts/panton/panton-bolditalic-webfont.woff2') format('woff2'),
                      url('/fonts/panton/panton-bolditalic-webfont.woff') format('woff')`,
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontDisplay: 'swap',
              },
            },
            {
              "@font-face": {
                fontFamily: 'panton',
                src: `url('/fonts/panton/panton-semibold-webfont.woff2') format('woff2'),
                      url('/fonts/panton/panton-semibold-webfont.woff') format('woff')`,
                fontWeight: '600',
                fontStyle: 'normal',
                fontDisplay: 'swap',
              },
            },
          ],
          'html, body': {
            margin: 0,
            width: '100%',
            height: '100%',
          },
          // SCROLLBAR STYLES
          '::-webkit-scrollbar': {
            width: 5,
          },
          '::-webkit-scrollbar-track': {
            background: alpha('#599FD8', 0.5),
          },
          '::-webkit-scrollbar-thumb': {
            background: alpha('#8D1519', 0.7),
            borderRadius: 5,
            '&:hover': {
              background: '#8D1519',
            },
          },
        },
      },
    },
  })
);

export function CustomThemeProvider({ children }: PropsWithChildren<{}>) {

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}