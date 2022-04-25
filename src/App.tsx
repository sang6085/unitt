import { I18nextProvider } from "react-i18next";
import i18n from "locales/i18n";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router } from "react-router-dom";
import "styles/index.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "contexts/AuthContext";
import RenderRouter from "routes/RenderRouter";
import { SnackbarProvider } from "notistack";
import BaseLayout from "pages/BaseLayout/BaseLayout";
import { grey } from "@mui/material/colors";
import { Theme, palette } from "configs/consts";

function App() {
  let theme = createTheme({
    typography: {
      fontFamily: `Roboto, "Helvetica", "Arial", sans-serif`,
      h6: {
        fontWeight: Theme.FontWeights.h6,
      },

      body1: {
        fontSize:Theme.FontSizes.body1,
      },
      body2: {
        fontSize: Theme.FontSizes.body2,
      },
      button: {
        textTransform: "inherit",
      },
    },
    palette: {
      action: {
        selected: "#f7fafc",
        hover: "#f7fafc",
      },
      text: {
        primary: "#4d5a68",
      },
      primary:{
        main: palette.primary
      },
      secondary: {
        main: palette.secondary,
      },
    },

    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: "13px",
            fontWeight: "500",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          "@font-face": {
            fontFamily: '"Roboto"',
            fontStyle: "normal",
            fontWeight: 400,
            src: `local('Roboto'), local('Roboto-Regular'),
                  url(${Theme.Fonts.RobotoRegular}) format('truetype'), url(${Theme.Fonts.RobotoItalic}) format('truetype')`,
          },
          fallbacks: [
            {
              "@font-face": {
                fontFamily: '"Roboto"',
                fontStyle: "normal",
                fontWeight: 500,
                src: `local('Roboto Medium'), local('Roboto-Medium'),
                          url(${Theme.Fonts.RobotoMedium}) format('truetype')`,
              },
            },
            {
              "@font-face": {
                fontFamily: '"Roboto"',
                fontStyle: "normal",
                fontWeight: 600,
                src: `local('Roboto Bold'), local('Roboto-Bold'),
                        url(${Theme.Fonts.RobotoBold}) format('truetype')`,
              },
            },
            {
              "@font-face": {
                fontFamily: '"Roboto"',
                fontStyle: "normal",
                fontWeight: 300,
                src: `local('Roboto Light'), local('Roboto-Light'),
                        url(${Theme.Fonts.RobotoLight}) format('truetype')`,
              },
            },
          ],
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <IntlProvider locale="en">
          <AuthProvider>
            <SnackbarProvider maxSnack={5}>
              <Router>
                <BaseLayout>
                  <RenderRouter />
                </BaseLayout>
              </Router>
            </SnackbarProvider>
          </AuthProvider>
        </IntlProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
