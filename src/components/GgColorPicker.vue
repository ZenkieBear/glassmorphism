<template>
    <div class="color-picker">
        <!-- hue -->
        <div ref="colorBar"
            class="color-bar"
            @mousedown="setHue"></div>
        <!-- hue slider -->
        <div ref="colorSlider" class="color-slider"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

// vars
const props = defineProps({
    modelValue: {
        type: String
    }
})
const innerValue = ref(props.modelValue);
const colorSlider = ref();
const colorBar = ref();

// methods
const setHue = (e: MouseEvent) => {
    debugger
    let clientRect = colorSlider.value.getBoundingClientRect();
    let y = e.clientY - clientRect.top;
    let colorBarHeight = 200;
    y = y > colorBarHeight ? colorBarHeight : (y < 0 ? 0 : y);
    // set slider's top
    colorSlider.value.style.top =  y < 9 ? 0 : (y - 9);
}

// hooks
watch(() => props.modelValue, value => {
    innerValue.value = (value ?? '');
})
</script>

<style lang="less" scoped>
.color-picker {
    position: relative;
    width: 10px;
    height: 200px;
    margin-left: 15px;
    cursor: pointer;
    .color-bar {
        width: 20px;
        height: 200px;
        background: linear-gradient(180deg, #f00, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00);
        margin-left: 20px;
    }
    .color-slider {
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: white;
    }
}
</style>