<template>
    <div>
        <gl-header />
        <section>
            <!-- side bar -->
            <aside class="side-bar">
                <div class="toolbar">
                    <div class="title">Try some changes</div>
                    <ul class="tools">
                        <li>
                            <span class="label">Color</span>
                            <gg-color-picker v-model="state.color"
                                tabindex="6"/>
                        </li>
                        <li>
                            <span class="label">Blur</span>
                            <gg-pop>
                                <template #content>{{ state.blur }} px</template>
                                <gg-slider v-model="state.blur"
                                    tabindex="7"
                                    :min="0"
                                    :max="80"/>
                            </gg-pop>
                        </li>
                        <li>
                            <span class="label">Saturation</span>
                            <gg-pop>
                                <template #content>{{ state.saturation }} %</template>
                                <gg-slider v-model="state.saturation"
                                    tabindex="8"
                                    :min="0"
                                    :max="100"/>
                            </gg-pop>
                        </li>
                        <li>
                            <span class="label">Radius</span>
                            <gg-pop>
                                <template #content>{{ state.radius }} px</template>
                                <gg-slider v-model="state.radius"
                                    tabindex="8"
                                    :min="0"
                                    :max="35"/>
                            </gg-pop>
                        </li>
                    </ul>
                </div>
            </aside>
            <main>
                <div id="code-box"
                    :style="{
                        backdropFilter: `blur(${state.blur}px) saturate(${state.saturation / 100})`,
                        background: state.color,
                        borderRadius: state.radius + 'px'
                    }">
                    <button id="copier"
                        class="copier"
                        data-clipboard-target="#code"
                        @click="copy">
                        <span class="fa-regular fa-clipboard" ></span> {{ copyMsg }}
                    </button>
                    <div class="title">CSS Code</div>
                    <!-- 木有办法，prism会按照格式渲染 -->
<pre><code class="language-css" id="code">.glass {
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
import GgSlider from '@components/GGSlider.vue';
import GlHeader from '@views/global/GlHeader.vue';
import GlFooter from '@views/global/GlFooter.vue';
import GgColorPicker from '@components/GgColorPicker.vue';
import GgPop from '@components/GgPop.vue';
import 'prismjs/themes/prism-okaidia.min.css';
import clipboard from 'clipboard';

// vars
const state = reactive({
    blur: 8,
    color: 'rgba(55, 66, 250, .3)',
    saturation: 100,
    radius: 10
});
const copyMsg = ref<string>(' ');
const codeClip = new clipboard('#copier');

// methods
const copy = () => {
    codeClip.on('success', () => {
        copyMsg.value = 'Copied!';
    });
    codeClip.on('error', () => {
        copyMsg.value = 'Something wen\'t wrong...';
    });
    setTimeout(() => {
        copyMsg.value = '';
    }, 2000);
}
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
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, .6);
    z-index: 1;
    .toolbar {
        color: @font-color;
        > .title {
            font-size: 1.8rem;
        }
        .tools {
            > li {
                margin-top: 18px;
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
        height: 250px;
        border-radius: 15px;
        background-color: rgba(255, 255, 255, .2);
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
    box-shadow: 0 -10px 10px 0px rgba(0, 0, 0, .1);
}

// Prism DIV
.language-css {
    white-space: pre-wrap;
}
</style>