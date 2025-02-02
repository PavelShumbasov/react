import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LangType } from './LangType';
import en from './localization/en.json';
import ru from './localization/ru.json';

export const defaultNS = 'common';
export const resources = {
  ru: { translation: ru },
  en: { translation: en },
};

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: LangType.RU,
  compatibilityJSON: 'v4',
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
});

export const Localization = i18n;
export default i18n;
