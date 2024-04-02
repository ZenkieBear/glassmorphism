<template>
    <div>
        <gl-header />
        <section>
            <!-- side bar -->
            <aside class="side-bar">
                <div class="title">{{ $t('home.tools.title') }}</div>
                <div class="toolbar common">
                    <div class="title">{{ $t('home.tools.common.title') }}</div>
                    <ul class="tools">
                        <li>
                            <span class="label">{{
                                $t('home.tools.common.color')
                            }}</span>
                            <gg-color-picker
                                v-model="state.color"
                                tabindex="6"
                            />
                        </li>
                        <li>
                            <span class="label">{{
                                $t('home.tools.common.blur')
                            }}</span>
                            <gg-pop>
                                <template #content
                                    >{{ state.blur }} px</template
                                >
                                <gg-slider
                                    v-model="state.blur"
                                    tabindex="7"
                                    :min="0"
                                    :max="80"
                                />
                            </gg-pop>
                        </li>
                        <li>
                            <span class="label">{{
                                $t('home.tools.common.saturation')
                            }}</span>
                            <gg-pop>
                                <template #content
                                    >{{ state.saturation }} %</template
                                >
                                <gg-slider
                                    v-model="state.saturation"
                                    tabindex="8"
                                    :min="0"
                                    :max="100"
                                />
                            </gg-pop>
                        </li>
                        <li>
                            <span class="label">{{
                                $t('home.tools.common.radius')
                            }}</span>
                            <gg-pop>
                                <template #content
                                    >{{ state.radius }} px</template
                                >
                                <gg-slider
                                    v-model="state.radius"
                                    tabindex="8"
                                    :min="0"
                                    :max="35"
                                />
                            </gg-pop>
                        </li>
                    </ul>
                </div>
                <div class="toolbar other">
                    <div class="title">{{ $t('home.tools.other.title') }}</div>
                    <ul class="tools">
                        <li>
                            <span class="label">{{
                                $t('home.tools.other.bg.label')
                            }}</span>
                            <gg-pop>
                                <template #content>{{
                                    $t('home.tools.other.bg.pop')
                                }}</template>
                                <gg-upload @change="changeBackground" />
                            </gg-pop>
                        </li>
                    </ul>
                </div>
            </aside>
            <main>
                <div
                    id="code-box"
                    :style="{
                        backdropFilter: `blur(${state.blur}px) saturate(${state.saturation / 100})`,
                        background: state.color,
                        borderRadius: state.radius + 'px',
                    }"
                >
                    <button
                        id="copier"
                        class="copier"
                        data-clipboard-target="#code"
                        @click="copy"
                    >
                        <span class="fa-regular fa-clipboard"></span>
                        {{ copyMsg }}
                    </button>
                    <div class="title">{{ $t('home.code.title') }}</div>
                    <!-- 木有办法，prism会按照格式渲染 -->
                    <pre><code id="code" class="language-css">.glass {
    background-color: {{ state.color }};<template v-if="state.blur || state.saturation < 100">
    backdrop-filter:<template
        v-if="state.blur"> blur({{state.blur}}px)</template><template
        v-if="state.saturation < 100"> saturate({{ state.saturation / 100 }})</template>;</template><template
        v-if="state.radius">
    border-radius: {{ state.radius }}px;</template>
}</code></pre>
                </div>
            </main>
        </section>
        <gl-footer />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import GgSlider from '@/components/GgSlider.vue';
import GlHeader from '@/views/global/GlHeader.vue';
import GlFooter from '@/views/global/GlFooter.vue';
import GgColorPicker from '@/components/GgColorPicker.vue';
import GgPop from '@/components/GgPop.vue';
import GgUpload from '@/components/GgUpload.vue';
import 'prismjs/themes/prism-okaidia.min.css';
import clipboard from 'clipboard';
import i18n from '@/assets/lang/index.ts';

// vars
const state = reactive({
    blur: 8,
    color: 'rgba(55, 66, 250, .3)',
    saturation: 100,
    radius: 10,
});
const copyMsg = ref<string>('');
const codeClip = new clipboard('#copier');
const copy = () => {
    codeClip.on('success', () => {
        copyMsg.value = i18n.global.t('home.code.copied');
    });
    codeClip.on('error', () => {
        copyMsg.value = "Something wen't wrong...";
    });
    setTimeout(() => {
        copyMsg.value = '';
    }, 2000);
};
const changeBackground = (path: string) => {
    let html = document.querySelector('html');
    if (path) {
        html.style.backgroundImage = `url(${path})`;
    } else {
        html.style.backgroundImage = 'url(https://picsum.photos/1920/1080)';
    }
};
</script>

<style lang="less" scoped>
@primary-color: #5352ed;
@font-color: darken(@primary-color, 20%);
@hover-color: lighten(@primary-color, 20%);
// sider bar
@side-width: 450px;
section {
    display: flex;
}
.side-bar {
    width: @side-width;
    height: 100vh;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.6);
    z-index: 1;
    > .title {
        color: @font-color;
        font-size: 1.8rem;
        width: 80%;
    }
    .toolbar {
        width: 80%;
        color: @font-color;
        & + .toolbar {
            margin-top: 20px;
        }
        & > .title {
            position: relative;
            font-size: 0.8rem;
            &::after {
                position: absolute;
                left: -10px;
                top: calc((100% - 80%) / 2);
                width: 3px;
                height: 80%;
                border-radius: 2px;
                content: '';
                background-color: @hover-color;
                transition: all 0.3s ease-in-out;
            }
        }
        &:focus-within {
            & > .title::after {
                background-color: @primary-color;
            }
        }
        .tools {
            > li {
                & + li {
                    margin-top: 18px;
                }
                .label {
                    text-align: right;
                    margin-right: 10px;
                    font-size: 1.2rem;
                    color: @font-color;
                }
            }
        }
    }
}
main {
    min-width: calc(100% - @side-width);
    min-height: 100vh;
    padding-top: 100px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    #code-box {
        width: 450px;
        min-height: 250px;
        border-radius: 15px;
        background-color: rgba(255, 255, 255, 0.2);
        padding: 10px;
        > .title {
            color: white;
        }
        pre {
            margin-top: 10px;
        }
        .copier {
            position: absolute;
            right: 10px;
            padding: 5px;
            border: none;
            border-radius: 5px;
            color: white;
            font-family: 'Poppins';
            background-color: transparent;
            line-height: 1.2rem;
            outline-style: dashed;
            outline-width: 0;
            cursor: pointer;
            span:first-child {
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                font-size: 1.2rem;
                font-family: 'Font Awesome 6 Free';
            }
            &:hover {
                color: @hover-color;
            }
            &:focus {
                color: white;
                outline-width: 2px;
                outline-color: white;
            }
            &:active {
                color: @hover-color;
                outline-color: @primary-color;
            }
        }
    }
}
// footer
footer {
    box-shadow: 0 -10px 10px 0px rgba(0, 0, 0, 0.1);
}

// Prism DIV
.language-css {
    white-space: pre-wrap;
}

@media screen and (max-width: 786px) {
    .side-bar {
        padding: 20px;
    }
}
</style>
