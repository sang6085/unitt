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

export const menu = [
    {
        icon: "fa-user-circle",
        title: "Account",
        type: "first",
        path:"",
        name: "SYSTEM MANAGEMENT",
        items: [
          {
            title: "Account setting",
            items: [],
            type: "seconds",
            path:"/account-settings",
          },
         
        ],
      },
      {
        icon:"fa-list-alt",
        title: "Management",
        type: "first",
       
        items: [
          {
            title: "Permission",
            type: "seconds",
            path :"/permission-manager",
            items: [],
          },
          {
            title: "Group",
            type: "seconds",
            path :"/group-manager",
            items: [],
          },
          {
            title: "Permission feature",
            type: "seconds",
            path :"/permission-feature",
            items: [],
          },
          {
            title: "Menu",
            type: "seconds",
            path :"/menu-manager",
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
            path :"/account/list",
            items: [],
          },
        ],
      },
]