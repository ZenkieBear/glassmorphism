<template>
    <div>
        <gl-header/>
        <div class="space-lg"></div>
        <main>
            <div id="banner">
                <div class="title">
                    Glassmorphism Generator
                </div>
                <span class="desc">
                    {{ $t('welcome.desc') }}
                </span>
                <div class="panel">
                    <router-link to="/home">{{ $t("welcome.start") }}</router-link>
                </div>
            </div>
        </main>
        <div class="space"></div>
        <gl-footer />
    </div>
</template>

<script lang="ts" setup>
import GlHeader from '@/views/global/GlHeader.vue';
import GlFooter from '@/views/global/GlFooter.vue';
import { onMounted } from 'vue';
import i18n, { langs } from '@/assets/lang/index';
import gsap from 'gsap';

// get lang from localStorages
onMounted(() => {
    const lang = localStorage.getItem('lang');
    if (lang && lang) {
        i18n.global.locale = lang as ('zh' | 'en');
    } 
    
    gsap.from('#banner .title', {
        x: -100
    })
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
        width: 100%;
        padding: 5vw 3vw 3vw;
        background-color: rgba(255, 255, 255, .6);
        backdrop-filter: @default-filter;
        .title {
            font-family: "Kanit";
            font-weight: bold;
            font-size: 10vw;
            // -webkit-text-stroke: 2px @primary-color;
            color: transparent;
            line-height: 10vw * 1;
            background: linear-gradient(45deg, @primary-color, lighten(@primary-color, 10%));
            background-clip: text;
            -webkit-background-clip: text;
        }
        .desc {
            font-size: 1.2rem;
            color: darken(lighten(@primary-color, 10%), 10%);
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
</style>