import { createI18n } from "vue-i18n";
import zh from './zh.ts';
import en from './en.ts';

// create i18n component
const i18n = createI18n({
    globalInjection: true,
    locale: 'en',
    messages: {
        zh: zh,
        en: en
    }
});
// define all supported languages
const langs = [
    {
        name: '简体中文',
        value: 'zh'
    },
    {
        name: 'English',
        value: 'en'
    }
]

export default i18n;
export { langs };