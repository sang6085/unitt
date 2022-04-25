import { grey } from "@mui/material/colors";

export const AppURL = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  ERROR_404: "/not-found",
  LOGIN: "/login",
  ERROR_PERMISSION: "/error/permission-denied",
  RELEASE_VERSION: "/release-version",
};

export const Config = {
  APP_NAME: "UNIT-GTXN",
  BASE_URL: process.env.REACT_APP_BASE_URL,
  PREFIX_API: process.env.REACT_APP_PREFIX_API,
  DATE_TIME_FORMAT: "dd/MM/yyyy HH:mm",
  DATE_FORMAT: "dd/MM/yyyy",
  TIME_FORMAT: "HH:mm",

  DATE_FORMAT_BACKEND: "yyyyMMdd",
  DATE_TIME_FORMAT_BACKEND: "yyyyMMddHHmmss",

  NONE_OPTION: 0,

  DEBOUNCE_API: 350, //ms
  MAX_LENGTH_TEXT: 100,
  WARNING_TIMEOUT: 15, //minutes
  AUTOCOMPLETE_PAGE_SIZE: 10,
  TOUCH_DELAY: 400,
};

export const LocalStorageKey = {
  LANGUAGE: `${Config.APP_NAME}.LANGUAGE`,
  TOKEN: `${Config.APP_NAME}.TOKEN`,
  REFRESH_TOKEN: `${Config.APP_NAME}.REFRESH_TOKEN`,
  AAD_TOKEN: `${Config.APP_NAME}.AAD_TOKEN`,
  MODE_THEME: `${Config.APP_NAME}.MODE_THEME`,
  COLOR_THEME: `${Config.APP_NAME}.COLOR_THEME`,
  NAV_THEME: `${Config.APP_NAME}.NAV_THEME`,
  FONT_FAMILY: `${Config.APP_NAME}.FONT_FAMILY`,
  LAYOUT: `${Config.APP_NAME}.LAYOUT`,
};

export const colors = {
  bgColorHeader: "#1a73e8",
  bgPrimary: "#f4f5fa",
  bgColorMenu: "#ffffff",
  textColor: "#617182",
  primaryColor: "#5e77a7",
  defaultColor: "#4d5a68",
  borderColorTable: "#e6e6e6",
  sidebarColor: "#718EB1",
  boxShadow: "0 10px 40px 0 rgb(18 106 211 / 7%), 0 2px 9px 0 rgb(18 106 211 / 6%)",
  white: "#ffffff",
  black: "#000000",
};

export const Languages = [
  { id: 1, shortName: "vi", name: "vietnamese", icon: null },
  { id: 2, shortName: "en", name: "english", icon: null },
];

export const UserType = {
  STANDARD: "LDAP",
  VENDOR: "VENDER",
};

export const AADConfig = {
  clientId: "e78b1333-5d76-4d05-91dd-0ce8f945ee0f",
  tenantId: "5ebe5d1f-6ce7-4b79-a8a7-66e17e0f791e",
  scopes: ["openid", "profile", "User.Read"],
};

export const palette = {
	primary: '#1976d2',
	secondary: grey[600],
};

export const Theme = {
  Fonts: {
    RobotoMedium: require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    RobotoItalic: require("../assets/fonts/Roboto/Roboto-Italic.ttf"),
    RobotoLight: require("../assets/fonts/Roboto/Roboto-Light.ttf"),
  },
  FontSizes:{
    body1: "0.875rem",
    body2: "0.875rem"
  },
  FontWeights: {
    h6: 400,
  }
}

export const menu = [
  {
    icon: "fa-user-circle",
    title: "Account",
    type: "first",
    path: "",
    name: "SYSTEM MANAGEMENT",
    items: [
      {
        title: "Account setting",
        items: [],
        type: "seconds",
        path: "/account-settings",
      },

    ],
  },
  {
    icon: "fa-list-alt",
    title: "Management",
    type: "first",

    items: [
      {
        title: "Permission",
        type: "seconds",
        path: "/permission-manager",
        items: [],
      },
      {
        title: "Group",
        type: "seconds",
        path: "/group-manager",
        items: [],
      },
      {
        title: "Permission feature",
        type: "seconds",
        path: "/permission-feature",
        items: [],
      },
      {
        title: "Menu",
        type: "seconds",
        path: "/menu-manager",
        items: [],
      },
      {
        title: "Feature",
        type: "seconds",
        path: '/features',
        items: [],
      },
      {
        title: "User",
        type: "seconds",
        path: "/user-manager",
        items: [],
      },
      {
        title: "Job",
        type: "seconds",
        path: "/job-manager",
        items: [],
      },
      {
        title: "Job Logs",
        type: "seconds",
        path: "/jobLogs",
        items: [],
      },
      {
        title: "Email",
        type: "seconds",
        path: "/email-manager",
        items: [],
      },
      {
        title: "System setting",
        type: "seconds",
        path: "/system-settings",
        items: [],
      },
      {
        title: "Dynamic Form",
        type: "seconds",
        path: "/dynamic-form",
        items: [],
      }
    ],
  },
]