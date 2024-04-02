import { createI18n } from 'vue-i18n';
import zh from './zh';
import en from './en';

// create i18n component
const i18n = createI18n({
    globalInjection: true,
    locale: localStorage.getItem('lang') || 'en',
    messages: {
        zh: zh,
        en: en,
    },
});
// define all supported languages
export const langs = [
    {
        name: '简体中文',
        value: 'zh',
    },
    {
        name: 'English',
        value: 'en',
    },
];

export default i18n;
