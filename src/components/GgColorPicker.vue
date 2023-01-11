<template>
    <div class="previewer"
        :style="{backgroundColor: props.modelValue}">
        <div class="picker">
            <!-- hue -->
            <div ref="hueBar"
                class="hue-bar"
                @mousedown="handleHuePick">
                <!-- hue slider -->
                <div ref="huePicker" class="hue-picker"></div>
            </div>
            <!-- color panel -->
            <div ref="svBar"
                class="sv-bar"
                :style="{backgroundColor: colorBg}"
                @mousedown="handlePanelPick">
                <!-- its border color should be the inverse of picked color -->
                <div ref="svPicker" class="sv-picker"></div>
            </div>
            <div class="alpha-bar"
                :style="{background: `linear-gradient(to right, transparent, ${props.modelValue})`}">
                <div ref="alphaPicker" class="alpha-picker"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import { hsv2rgb } from '@assets/js/color.ts';

// vars
const props = defineProps({
    modelValue: {
        type: String
    }
});
const innerValue = ref(props.modelValue);
const huePicker = ref();
const hueBar = ref();
const svBar = ref();
const svPicker = ref();
const color = reactive({
    hue: 0,
    saturation: 0,
    value: 0
});
const colorBg = ref('#f00');
const value = ref('#f00');
const emit = defineEmits(["update:modelValue"]);

// methods
const setHue = (e: MouseEvent) => {
    const barHeight = 200;
    // rectangle
    const rect = hueBar.value.getBoundingClientRect();
    let y = e.clientY - rect.top;
    y = y > barHeight ? barHeight : (y < 0 ? 0 : y);
    // move the slider
    let top = y < 4 ? 0 : (y > (barHeight - 4) ? barHeight - 8 : y - 4);
    huePicker.value.style.top = top + 'px';
    // count hue
    color.hue = Math.round(y / barHeight * 360 * 100) / 100 | 0;
    // change hue
    let rgb = hsv2rgb(color.hue, 100, 100);
    colorBg.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    // generate color
    generateColor();
};
const prevent = (e: Event) => e.preventDefault();
const handleHueUp = () => {
    document.removeEventListener('mousemove', setHue);
    document.removeEventListener('selectstart', prevent);
}
const handleHuePick = (e: MouseEvent) => {
    setHue(e);
    document.addEventListener('selectstart', prevent);
    document.addEventListener('mousemove', setHue);
    document.removeEventListener('mouseup', handleHueUp);
    document.addEventListener('mouseup', handleHueUp);
};
/**
 * 设置饱和度和明亮度
 * @param e 鼠标事件
 */
const setSV = (e: MouseEvent) => {
    // initial params
    const panelHeight = 200;
    const panelWidth = panelHeight * 1.5;
    // rectangle
    const rect = svBar.value.getBoundingClientRect();
    // count x & y
    let x = e.clientX - rect.left;
    x = x > panelWidth ? panelWidth : (x < 0 ? 0 : x);
    let y = e.clientY - rect.top;
    y = y > panelHeight ? panelHeight : (y < 0 ? 0 : y);
    // leave half of the picker in panel
    svPicker.value.style.top = y - 6 + 'px';
    svPicker.value.style.left = x - 6 + 'px';
    // count saturation & value
    color.saturation = Math.round(x / panelWidth * 100);
    color.value = Math.round((1 - y / panelHeight) * 100);
    generateColor();
};
const handlePanelUp = () => {
    document.removeEventListener('mousemove', setSV);
    document.removeEventListener('selectstart', prevent);
};
const handlePanelPick = (e: MouseEvent) => {
    setSV(e);
    document.addEventListener('selectstart', prevent);
    document.addEventListener('mousemove', setSV);
    document.removeEventListener('mouseup', handlePanelUp);
    document.addEventListener('mouseup', handlePanelUp);
};
const generateColor = () => {
    let rgb = hsv2rgb(color.hue, color.saturation, color.value);
    let result = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    value.value = result;
    emit('update:modelValue', result);
}

// hooks
watch(() => props.modelValue, value => {
    innerValue.value = (value ?? '');
})
</script>

<style lang="less" scoped>
@hue-bar-height: 200px;
@panel-width: calc(@hue-bar-height * 1.5);
@help-color: #3742fa;
.previewer {
    width: 24px;
    height: 24px;
    background-color: red;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    vertical-align: bottom;
    .picker {
        position: absolute;
        top: 12px;
        left: 12px;
        width: calc(300px + 30px + 10px + 10px * 2);
        padding: 10px;
        background-color: white;
        border-radius: 5px;
        .hue-bar {
            position: relative;
            width: 30px;
            height: 200px;
            display: inline-block;
            background: linear-gradient(180deg, #f00, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00);
            cursor: pointer;
            .hue-picker {
                width: 34px;
                height: 8px;
                position: absolute;
                top: calc(@hue-bar-height - 8px);
                left: -2px;
                border: 2px solid black;
                border-radius: 5px;
                pointer-events: none;
            }
        }
        .sv-bar {
            position: relative;
            width: @panel-width;
            height: @hue-bar-height;
            display: inline-block;
            overflow: hidden;
            margin-left: 10px;
            background: linear-gradient(to top, black, transparent), linear-gradient(to right, white, transparent);
            cursor: pointer;
            .sv-picker {
                position: absolute;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid white;
                pointer-events: none;
            }
        }
        .alpha-bar {
            width: 100%;
            height: 30px;
        }
    }
}
</style>