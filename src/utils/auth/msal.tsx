import * as msal from '@azure/msal-browser';
import { AADConfig, Config } from 'configs/consts';

const msalConfig = {
	auth: {
		...AADConfig,
		redirectUri: Config.BASE_URL ?? window.location.href,
	},
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export default msalInstance;
