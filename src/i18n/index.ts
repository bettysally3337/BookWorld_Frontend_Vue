import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import zhTW from './locales/zh-TW.json';
import ja from './locales/ja.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

const messages = {
  en,
  'zh-TW': zhTW,
  ja,
  fr,
  es
};

export const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: 'en', // Default language
  fallbackLocale: 'en',
  messages,
});
