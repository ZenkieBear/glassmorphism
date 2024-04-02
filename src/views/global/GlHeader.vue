<template>
    <!-- Global header -->
    <header ref="main">
        <router-link id="logo" to="/" tabindex="1">
            <img src="/logo.png" alt="Logo" />
        </router-link>
        <nav>
            <router-link to="/home" class="gl-menu" tabindex="2">{{
                $t('nav.start')
            }}</router-link>
            <router-link to="/about" class="gl-menu" tabindex="3">{{
                $t('nav.about')
            }}</router-link>
            <!-- this might be an single component future -->
            <!-- <span class="gl-sub-menu"
                tabindex="4"
                @click="toggleLangMenu()">
                <i class="fa-solid fa-globe" />
                <ul>
                    <li v-for="lang in langs"
                        @click="toggleLang(lang.value)">
                        {{ lang.name }}
                    </li>
                </ul>
            </span> -->
            <gg-sub-menu>
                <template #content>
                    <i class="fa-solid fa-language" />
                </template>
                <template #items>
                    <li
                        v-for="lang in langs"
                        :key="lang.value"
                        @click="toggleLang(lang.value)"
                    >
                        {{ lang.name }}
                    </li>
                </template>
            </gg-sub-menu>
            <a
                href="https://github.com/ZenkieBear/glassmorphism"
                class="gl-menu"
                tabindex="5"
            >
                <i class="fa-brands fa-github" title="star"></i>
            </a>
        </nav>
    </header>
</template>

<script lang="ts" setup>
import GgSubMenu from '@/components/GgSubMenu.vue';
import i18n, { langs } from '@/assets/lang/index';

type Lang = 'zh' | 'en';
const isLang = (lang: string): lang is Lang =>
    !!langs.find((option) => option.value === lang);

const toggleLang = (lang: string) => {
    if (!isLang(lang)) return;
    i18n.global.locale = lang;
    localStorage.setItem('lang', lang);
};
</script>

<style lang="less" scoped>
@primary-color: #5352ed;
@font-color: darken(@primary-color, 20%);
@transition-eased2s: 0.2s ease;
@transition-eased3s: 0.3s ease;
@default-filter: blur(8px);

header {
    @header-height: 100px;
    width: 100vw;
    height: @header-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid @primary-color;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    transition: @transition-eased2s;

    #logo {
        &:focus {
            outline: none;
            img {
                outline: 2px solid #5352ed;
            }
        }
        img {
            width: 60px;
            height: 60px;
            border-radius: 18px;
        }
    }
    nav {
        padding-right: 10px;
        .gl-menu,
        .gl-sub-menu {
            color: white;
            text-decoration: none;
            display: inline-block;
            padding: 10px 15px;
            border-radius: 5px;
            transition: @transition-eased3s;
            & + .gl-menu,
            & + .gl-sub-menu {
                margin-left: 10px;
            }
        }
        ul {
            display: inline-block;
        }
        .gl-sub-menu {
            position: relative;
            display: inline-blocks;
            & > ul {
                display: none;
                position: absolute;
                top: calc(100%);
                right: 0;
                min-width: 100px;
                padding: 10px;
                border: 1px solid white;
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.8);
                color: @primary-color;
                & > li {
                    padding: 5px;
                    border-radius: 5px;
                    cursor: pointer;
                    &:hover {
                        color: @font-color;
                        background: white;
                    }
                }
            }
        }
    }
    &:hover {
        backdrop-filter: @default-filter brightness(0.8) saturate(0.3);
        background: rgba(83, 82, 237, 0.5);
        border: none;
        nav {
            .gl-menu,
            .gl-sub-menu {
                background: rgba(255, 255, 255, 0.6);
                &:hover {
                    background: white;
                    color: @primary-color;
                }
                &:active {
                    background: rgba(255, 255, 255, 0.6);
                }
            }
        }
    }
}
</style>
