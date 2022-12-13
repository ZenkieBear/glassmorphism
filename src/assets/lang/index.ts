import { createI18n } from "vue-i18n";
import zh from './zh.ts';
import en from './en.ts';

const i18n = createI18n({
    globalInjection: true,
    locale: 'zh',
    messages: {
        zh: zh,
        en: en
    }
});

export default i18n;