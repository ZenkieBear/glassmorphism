<template>
    <gl-header />
    <main>
        <section class="how">
            <a name="how" href="#how" class="title">{{
                $t('about.how.title')
            }}</a>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="content" v-html="$t('about.how.content')"></div>
        </section>
        <section class="thanks">
            <a name="thanks" href="#thanks" class="title">{{
                $t('about.thanks.title')
            }}</a>
            <ul>
                <li v-for="(con, idx) in contributors" :key="idx">
                    <a :href="con.site">
                        <img
                            class="icon"
                            :src="con.avartars"
                            :title="con.name"
                        />
                    </a>
                    -
                    {{ $t('about.thanks.jobs.' + con.job) }}
                </li>
            </ul>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="tips" v-html="$t('about.thanks.tips')"></div>
        </section>
        <section class="vision">
            <a name="vision" href="#vision" class="title">{{
                $t('about.vision.title')
            }}</a>
            <div class="content">
                {{ $t('about.vision.content') }}
            </div>
        </section>
        <section class="contact">
            <a name="contact" href="#contact" class="title">{{
                $t('about.contact.title')
            }}</a>
            <div class="content">
                <ul>
                    <li v-for="(val, key) in contacts" :key="key">
                        <span class="label"
                            >{{ $t(`about.contact.contacts.${key}`) }}: </span
                        >{{ val }}
                    </li>
                </ul>
            </div>
            <div class="tips">{{ $t('about.contact.tips') }}</div>
        </section>
    </main>
    <gl-footer />
</template>

<script lang="ts" setup>
import GlHeader from '@/views/global/GlHeader.vue';
import GlFooter from '@/views/global/GlFooter.vue';
import { reactive } from 'vue';

type Contributor = {
    name: string;
    job: string;
    avartars: string;
    site: string;
};
const contributors = reactive<Array<Contributor>>([
    {
        name: 'John Pong',
        job: 'translate',
        avartars: 'https://avatars.githubusercontent.com/u/96033956?v=4',
        site: 'https://github.com/asdhuiashduias',
    },
]);
const contacts = reactive({
    email: 'zq@zenkie.cn',
    wechat: 'zenkiebear',
});
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
            color: white;
            font-size: 24px;
            line-height: 24px;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
                outline: none;
            }
            &:focus {
                outline: none;
            }
        }
        .content {
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
                    transition: all 0.3s ease;
                }
                &:hover::after {
                    top: 0;
                    border-radius: 5px;
                }
            }
        }
        .tips {
            color: fade(white, 70);
            font-size: 0.8rem;
        }
        & + section {
            margin-top: 50px;
        }
        &.thanks {
            ul {
                display: flex;
                flex-wrap: wrap;
                margin: 20px 0 10px;
                li {
                    white-space: nowrap;
                    margin: 10px;
                    .icon {
                        display: inline-block;
                        width: 35px;
                        height: 35px;
                        margin-right: 5px;
                        vertical-align: middle;
                        background-color: white;
                        border-radius: 50%;
                    }
                }
            }
        }
        &.contact {
            ul {
                display: inline-block;
                margin-bottom: 10px;
                li {
                    margin-top: 5px;
                    .label {
                        color: @primary-color;
                        background-color: white;
                        font-weight: bold;
                        border-radius: 5px;
                        padding: 0 5px;
                        vertical-align: baseline;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
