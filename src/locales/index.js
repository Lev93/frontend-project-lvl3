import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import rusTranslation from './rus.json';
import enTranslation from './en.json';

const resources = {
  ru: {
    translation: rusTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

const localize = (cb) => i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    resources,
  })
  .then(cb);

export default localize;
