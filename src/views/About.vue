<template>
    <gl-header />
    <main>
        <section class="vision">
            <h1 class="title">{{ $t('about.vision.title') }}</h1>
            <div class="content">
                {{ $t('about.vision.content') }}
            </div>
        </section>
        <section>
            <h1 class="title">{{ $t('about.background.title') }}</h1>
            <div class="content" v-html="$t('about.background.content')"></div>
        </section>
    </main>
    <gl-footer />
</template>

<script lang="ts" setup>
import GlHeader from '@views/global/GlHeader.vue';
import GlFooter from '@views/global/GlFooter.vue';
</script>

<style lang="less" scoped>
@primary-color: rgb(83, 82, 237);
@font-color: darken(@primary-color, 20%);
main {
    margin-top: 100px;
    padding: 100px;
    background-color: fade(@primary-color, 80%);
    min-height: 50vh;
    section {
        color: white;
        .title {
            text-align: center;
        }
        .content {
            text-align: center;
            :deep(a) {
                position: relative;
                overflow: hidden;
                display: inline-block;
                margin: 0 5px;
                padding: 0 3px;
                color: white;
                text-decoration: none;
                vertical-align: bottom;
                z-index: 1;
                &::after {
                    content: '';
                    position: absolute;
                    top: 70%;
                    left: 0;
                    z-index: -1;
                    background-color: @font-color;
                    width: 100%;
                    height: 100%;
                    transition: all .3s ease;
                }
                &:hover::after {
                    top: 0;
                    border-radius: 5px;
                }
            }
        }
        &+section {
            margin-top: 50px;
        }
    }
}
</style>