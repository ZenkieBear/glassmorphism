<template>
    <!-- Global header -->
    <header>
        <a href="/" tabindex="0">
            <img src="/logo.png" alt="Logo" id="logo">
        </a>
        <nav>
            <router-link to="/home"
                class="gl-menu"
                tabindex="1">{{$t('nav.start')}}</router-link>
            <a href=""
                class="gl-menu"
                tabindex="2">{{$t('nav.download')}}</a>
            <a href=""
                class="gl-menu"
                tabindex="3">{{$t('nav.about')}}</a>
            <!-- this might be an single component future -->
            <span class="gl-sub-menu"
                tabindex="4">
                <i class="fa-solid fa-globe" />
                <ul>
                    <li v-for="lang in langs"
                        @click="toggleLang(lang.value)">
                        {{ lang.name }}
                    </li>
                </ul>
            </span>
            <a href="https://github.com/ZenkieBear/glassmorphism"
                class="gl-menu"
                tabindex="5">
                <i class="fa-brands fa-github" title="star"></i>
            </a>
        </nav>
    </header>
    <!-- the space moved to referencers -->
    <!-- <div id="space"></div> -->
</template>


<script lang="ts" setup>
import i18n, { langs } from '@assets/lang/index.ts';

const toggleLang = (lang: string) => {
    i18n.global.locale = lang;
    localStorage.setItem('lang', lang);
};
</script>

<style lang="less" scoped>
@primary-color: #5352ed;
@font-color: darken(@primary-color, 20%);
@transition-eased2s: .2s ease;
@transition-eased3s: .3s ease;
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
    z-index: 1;
    transition: @transition-eased2s;
    #logo {
        width: 60px;
        height: 60px;
        border-radius: 18px;
    }
    nav {
        padding-right: 10px;
        .gl-menu, .gl-sub-menu {
            color: white;
            text-decoration: none;
            display: inline-block;
            padding: 10px 15px;
            border-radius: 5px;
            transition: @transition-eased3s;
            &+.gl-menu, &+.gl-sub-menu {
                margin-left: 10px;
            }
        }
        ul {
            display: inline-block;
        }
        .gl-sub-menu {
            position: relative;
            display: inline-blocks;
            &>ul {
                display: none;
                position: absolute;
                top: calc(100%);
                right: 0;
                min-width: 100px;
                padding: 10px;
                border: 1px solid white;
                border-radius: 10px;
                background: rgba(255, 255, 255, .8);
                color: @primary-color;
                &>li {
                    padding: 5px;
                    border-radius: 5px;
                    cursor: pointer;
                    &:hover {
                        color: @font-color;
                        background: white;
                    }
                }
            }
            &:hover ul {
                display: block;
            }
        }
    }
    &:hover {
        backdrop-filter: @default-filter brightness(.8) saturate(.3);
        background: rgba(83, 82, 237, .5);
        border: none;
        nav {
            .gl-menu, .gl-sub-menu{
                background: rgba(255, 255, 255, .6);
                &:hover {
                    background: white;
                    color: @primary-color;
                }
                &:active {
                    background: rgba(255, 255, 255, .6);
                }
            }
        }
    }
}
</style>