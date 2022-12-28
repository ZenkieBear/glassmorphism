<template>
    <div>
        <gl-header />
        <section>
            <!-- side bar -->
            <aside class="side-bar">
                <div class="toolbar">
                    <ul>
                        <li>
                            <span class="label">Blur</span>
                            <gg-slider v-model="state.blur" max="80"/>
                        </li>
                        <li>
                            <span class="label">Color</span>
                            <gg-color-picker v-model="state.color"/>
                        </li>
                    </ul>
                </div>
            </aside>
            <main>
                <div id="code"
                    :style="{
                        backdropFilter: `blur(${state.blur}px)`
                    }">

                </div>
            </main>
        </section>
        <gl-footer />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import GgNumberInput from '@components/GgNumberInput.vue';
import GgSlider from '@components/GGSlider.vue';
import GlHeader from '@views/global/GlHeader.vue';
import GlFooter from '@views/global/GlFooter.vue';
import GgColorPicker from '@components/GgColorPicker.vue';

// vars
const state = reactive({
    blur: 8,
    color: 'rgba(255, 255, 255, .6)'
})

// methods
const handleChange = (value: number) => {
    console.log('value', value)
}
</script>

<style lang="less" scoped>
span {
    color: black
}
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
    .toolbar {
        .label {
            text-align: right;
            margin-right: 10px;
            font-size: 1.2rem;
        }
    }
}
// main(css card)
main {
    width: calc(100% - @side-width);
    height: 100vh;
    padding-top: 100px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    #code {
        width: 400px;
        height: 250px;
        border-radius: 15px;
        background-color: rgba(255, 255, 255, .2);
    }
}
// footer
footer {
    box-shadow: 0 -10px 10px 0px rgba(0, 0, 0, .1);
}
</style>