import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";
import { IntlProvider } from "react-intl";
import { ProvideAuth } from "./providers/AuthProvider";
import { useAppSelector } from "./stores/Store";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RenderRouter from "./routes/RenderRouter";
import { useTheme } from "./providers/ThemeProvider";

const App: React.FC = () => {
  const locale = useAppSelector((state) => state.user.locale) || "1";

  React.useEffect(() => {}, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <IntlProvider locale="en">
        <ProvideAuth>
          <Router>
            <RenderRouter />
          </Router>
        </ProvideAuth>
      </IntlProvider>
    </I18nextProvider>
  );
};

export default App;
