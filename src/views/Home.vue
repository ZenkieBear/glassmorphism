<template>
    <div>
        <gl-header />
        <main>
            <!-- side bar -->
            <aside class="side-bar">
                <div class="space-lg"></div>
                <gg-slider v-model="shared"/>
                <gg-number-input v-model="shared"
                    type="number"
                    :max="100"
                    :min="0"
                    @changed="handleChange"/>
                value: {{shared}}
            </aside>
        </main>
        <gl-footer />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import GgNumberInput from '@components/GgNumberInput.vue';
import GgSlider from '@components/GGSlider.vue';
import GlHeader from '@views/global/GlHeader.vue';
import GlFooter from '@views/global/GlFooter.vue';

const shared = ref(0);
const handleChange = (value: number) => {
    console.log('value', value)
}
</script>

<style lang="less" scoped>
span {
    color: black
}
.side-bar {
    width: 450px;
    height: calc(100vh);
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, .6);
}
footer {
    box-shadow: 0 -10px 10px 0px rgba(0, 0, 0, .1);
}
</style>