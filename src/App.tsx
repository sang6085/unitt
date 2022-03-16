import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";
import RenderRouter from "./routes/RenderRouter";
import { SnackbarProvider } from "notistack";
import BaseLayout from "./pages/BaseLayout/BaseLayout";

function App() {
  let theme = createTheme({
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: 13,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      // h1: {
      //   fontSize: '2.25rem'
      // },
      // h2: {
      //   fontSize: '2rem'
      // },
      // h3: {
      //   fontSize: '1.75rem'
      // },
      // h4: {
      //   fontSize: '1.5rem'
      // },
      // h5: {
      //   fontSize: '1.25rem'
      // },
      // h6: {
      //   fontSize: '1rem'
      // },
      // subtitle1: {
      //   // custom here
      // },
      // subtitle2: {
      //   // custom here
      // },
      body1: {
        fontSize: '0.875rem'
      },
      body2: {
        fontSize: '0.875rem'
      },
      button: {
        textTransform: "inherit"
      },

    },
    palette: {
      action: {
        selected: "#f0f6ff",
        hover: "#f0f6ff",
      },
      text: {
        primary: "#4d5a68",
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
