import React, { createContext, useContext, useState } from "react";
import { LocalStorageKey } from "../configs/consts";

interface ThemeProviderProps  {
  children: React.ReactNode;
}
interface ThemeContextData {
  modeTheme: "light" | "dark";
  colorTheme: string;
  navTheme: string;
  fontFamily: string;
  layout: "boxed" | "collapsed" | "topNav";
  setModeTheme: (themeRequest: "light" | "dark") => void;
  setColorTheme: (themeRequest: string) => void;
  setNavTheme: (themeRequest: string) => void;
  setFontFamily: (themeRequest: string) => void;
  setLayout: (layoutRequest: "boxed" | "collapsed" | "topNav") => void;
}

export const ThemeContext = createContext<ThemeContextData>({
  modeTheme: "light",
  colorTheme: "#349eff",
  navTheme: "",
  fontFamily: "",
  layout: "boxed",
  setModeTheme: () => {},
  setColorTheme: () => {},
  setNavTheme: () => {},
  setFontFamily: () => {},
  setLayout: () => {},
});

export function ThemesProvider({ children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={useThemesProvider()}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

const useThemesProvider = () => {
  const getModeTheme = localStorage.getItem(LocalStorageKey.MODE_THEME) ?? "light";
  const getColorTheme = localStorage.getItem(LocalStorageKey.COLOR_THEME) ?? "#349eff";
  const getNavTheme = localStorage.getItem(LocalStorageKey.NAV_THEME) ?? "";
  const getFontFamily = localStorage.getItem(LocalStorageKey.FONT_FAMILY) ?? "0";
  const getLayout = localStorage.getItem(LocalStorageKey.LAYOUT) ?? "boxed";

  const [modeThemeId, setModeThemeId] = useState<"light" | "dark">(
    getModeTheme === "dark" ? "dark" : "light"
  );
  const [colorThemeId, setColorThemeId] = useState<string>(getColorTheme);
  const [navThemeId, setNavThemeId] = useState<string>(getNavTheme);
  const [fontFamilyId, setFontFamilyId] = useState<string>(getFontFamily);
  const [layoutId, setLayoutId] = useState<"boxed" | "collapsed" | "topNav">(
    getLayout === "collapsed" ? "collapsed" : getLayout === "topNav" ? "topNav" : "boxed"
  );

  const setModeTheme = (themeRequest: "light" | "dark") => {
    setModeThemeId(themeRequest);
  };
  const setColorTheme = (themeRequest: string) => {
    setColorThemeId(themeRequest);
  };

  const setNavTheme = (themeRequest: string) => {
    setNavThemeId(themeRequest);
  };

  const setFontFamily = (themeRequest: string) => {
    setFontFamilyId(themeRequest);
  };

  const setLayout = (layoutRequest: "boxed" | "collapsed" | "topNav") => {
    setLayoutId(layoutRequest);
  };

  return {
    modeTheme: modeThemeId,
    colorTheme: colorThemeId,
    navTheme: navThemeId,
    fontFamily: fontFamilyId,
    layout: layoutId,
    setModeTheme,
    setColorTheme,
    setNavTheme,
    setFontFamily,
    setLayout,
  };
};
