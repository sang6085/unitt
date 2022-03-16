import i18next from 'i18next';
import { Languages, LocalStorageKey } from '../configs/consts';
import merge from 'lodash/merge';

import viLocale from 'date-fns/locale/vi';
import enLocale from 'date-fns/locale/en-US';

import viCommon from './vi.json';
import enCommon from './en.json';
import viGTXN from './vi.json';
import enGTXN from './en.json';

const en = { translation: merge(enGTXN, enCommon) };
const vi = { translation: merge(viGTXN, viCommon) };

const languageId = parseInt(localStorage.getItem(LocalStorageKey.LANGUAGE) || '1');
const languageName = Languages.find((l) => l.id === languageId)?.shortName;

i18next
	// .use(Backend)
	.init({
		lng: languageName,
		fallbackLng: 'en',
		debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
		backend: {
			loadPath: '/locales/{{lng}}.json',
		},
		resources: { en, vi },
	});

export default i18next;

export const DateTimeLocaleMap: { [id: string]: Locale } = {
	en: enLocale,
	vi: viLocale,
};
