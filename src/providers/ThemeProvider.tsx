import React, { createContext, useContext } from "react";
import { LocalStorageKey } from "../configs/consts";

interface IThemeProvider {
  modeTheme: "light" | "dark";
  colorTheme: string;
  navTheme: string;
  setModeTheme: (themeRequest: "light" | "dark") => void;
  setColorTheme: (themeRequest: string) => void;
  setNavTheme: (themeRequest: string) => void;
}
export const ThemeContext = createContext<IThemeProvider>({
  modeTheme: "light",
  colorTheme: "#0062cc",
  navTheme: "",
  setModeTheme: () => {},
  setColorTheme: () => {},
  setNavTheme: () => {},
});

export function ThemeProviderContext(props: any) {
  return (
    <ThemeContext.Provider value={useProviderTheme()}>
      {props.children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}

function useProviderTheme() {
  const getModeTheme = localStorage.getItem(LocalStorageKey.THEME) ?? "light";
  const getColorTheme =
    localStorage.getItem(LocalStorageKey.COLOR_THEME) ?? "#0062cc";
  const getNavTheme = localStorage.getItem(LocalStorageKey.NAV_THEME) ?? "";

  const [modeThemeId, setModeThemeId] = React.useState<"light" | "dark">(
    getModeTheme === "dark" ? "dark" : "light"
  );
  const [colorThemeId, setColorThemeId] = React.useState<string>(getColorTheme);
  const [navThemeId, setNavThemeId] = React.useState<string>(getNavTheme);

  const setModeTheme = (themeRequest: "light" | "dark") => {
   setModeThemeId(themeRequest);
  };
  const setColorTheme = (themeRequest: string) => {
    setColorThemeId(themeRequest);
  };
  const setNavTheme = (themeRequest: string) => {
    setNavThemeId(themeRequest);
  };

  return {
    modeTheme: modeThemeId,
    colorTheme: colorThemeId,
    navTheme: navThemeId,
    setModeTheme,
    setColorTheme,
    setNavTheme,
  };
}
