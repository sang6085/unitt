import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router } from "react-router-dom";
import { useTheme } from "./Contexts/ThemeContext";
import { grey } from "@mui/material/colors";
import "./styles/index.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./Contexts/AuthContext";
import RenderRouter from "./Routes/RenderRouter";
import { SnackbarProvider } from "notistack";

function App() {
  const themeContext = useTheme();

  let theme = createTheme({
    typography: {
      fontFamily: themeContext.fontFamily,
    },
    palette: {
      primary: {
        main: themeContext.colorTheme,
      },
      ...(themeContext.modeTheme === "light" && {
        background: {
          default: "#fbfafb",
        },
      }),
      mode: themeContext.modeTheme,
      text: {
        ...(themeContext.modeTheme === "light"
          ? {
              primary: grey[800],
            }
          : {
              primary: grey[400],
            }),
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
                <RenderRouter />
              </Router>
            </SnackbarProvider>
          </AuthProvider>
        </IntlProvider>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
