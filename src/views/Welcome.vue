<template>
    <div>
        <gl-header/>
        <main>
            <div id="banner">
                <div class="title">
                    Glassmorphism Generator
                </div>
                <span class="slogan">
                    {{ $t('welcome.desc') }}
                </span>
                <div class="panel">
                    <a href="">{{$t("welcome.start")}}</a>
                </div>
            </div>
        </main>
        <footer>
            <nav>
                <span>
                    Star on 
                    <a href="" class="link">
                        <i class="fa-brands fa-github"></i>
                    </a>
                </span>
            </nav>
            <div class="copyright">
                Copyright 2022 <a href="https://github.com/ZenkieBear" class="link">Zenkie Bear</a> .
            </div>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import GlHeader from '@views/GlHeader.vue';
import { onMounted } from 'vue';
import i18n from '@assets/lang/index';

// get lang from localStorages
onMounted(() => {
    const lang = localStorage.getItem('lang');
    if (lang) {
        i18n.global.locale = lang;
    } 
    
});
</script>

<style lang="less" scoped>
@primary-color: #5352ed;
@font-color: darken(@primary-color, 20%);
@default-filter: blur(8px);
@transition-eased2s: .2s ease;
@transition-eased3s: .3s ease;

main {
    #banner {
        width: 100vw;
        padding: 5vw 3vw 3vw;
        background-color: rgba(255, 255, 255, .6);
        backdrop-filter: @default-filter;
        .title {
            font-family: "Kanit";
            font-weight: bold;
            font-size: 10vw;
            -webkit-text-stroke: 2px @primary-color;
            color: transparent;
            line-height: 10vw * 1;
        }
        .slogan {
            font-size: 1.2rem;
            color: @font-color;
        }
        .panel {
            margin-top: 40px;
            a {
                text-decoration: none;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                display: inline-block;
                transition: background-position .3s ease;
                background: linear-gradient(134deg, @primary-color, @primary-color,
                spin(@primary-color, -20%));
                background-size: 200%;
                background-position: 0 0;
                &:hover {
                    background-position: 100% 100%;
                }
            }
        }
    }
}
footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100px;
    // margin-top: calc(100vh - 100px - 5vw - 20vw - 1.2rem - 40px - 20px - 1.5rem - 3vw );
    margin-top: clamp(50px, calc(100vh - 160px - 28vw - 2.7rem), 100px);
    padding: 30px 50px 50px;
    background-color: rgba(255, 255, 255, .6);
    backdrop-filter: @default-filter;
    color: @font-color;
    a.link {
        margin: 0 5px;
        text-decoration: none;
        color: @font-color;
        position: relative;
        overflow: hidden;
        display: inline-block;
        line-height: 1.2rem;
        padding: 0 3px;
        &::after {
            content: '';
            position: absolute;
            top: 70%;
            left: 0;
            z-index: -1;
            background-color: white;
            width: 100%;
            height: 100%;
            transition: all .3s ease;
        }
        &:hover::after {
            top: 0;
            border-radius: 5px;
        }
    }
    nav {
        >span {
            display: flex;
            align-items: center;
        }
    }
    .copyright {
        display: flex;
        align-items: center;
        margin-top: 1rem;
    }
}
</style>