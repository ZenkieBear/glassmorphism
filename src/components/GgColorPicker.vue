<template>
    <div
        class="previewer"
        :style="{ backgroundColor: props.modelValue }"
        tabindex="0"
        @click="showPicker"
    >
        <div v-show="pickerVisible" ref="picker" class="picker">
            <!-- hue -->
            <div ref="hueBar" class="hue-bar" @mousedown="handleHuePick">
                <!-- hue slider -->
                <div
                    ref="huePicker"
                    class="hue-picker"
                    :style="{
                        top:
                            ((hueHeight * color.hue) / 360 > hueHeight - 6
                                ? (hueHeight * color.hue) / 360 - 6
                                : (hueHeight * color.hue) / 360) + 'px',
                    }"
                />
            </div>
            <!-- color panel -->
            <div
                ref="svBar"
                class="sv-bar"
                :style="{ backgroundColor: colorBg }"
                @mousedown="handleSVPick"
            >
                <!-- its border color should be the inverse of picked color -->
                <div
                    ref="svPicker"
                    class="sv-picker"
                    :style="{
                        top:
                            ((100 - color.value) / 100) * panelHeight -
                            6 +
                            'px',
                        left: (color.saturation / 100) * panelWidth - 6 + 'px',
                    }"
                />
            </div>
            <div ref="alphaBar" class="alpha-bar">
                <div
                    class="alpha-cover"
                    :style="{
                        background: `linear-gradient(to right, transparent, rgb(${color.red}, ${color.green}, ${color.blue}))`,
                    }"
                    @mousedown="handleAlphaPick"
                />
                <!-- Responsive style -->
                <div
                    ref="alphaPicker"
                    class="alpha-picker"
                    :style="{
                        left:
                            (color.alpha * 340 > 340 - 6
                                ? 340 - 6
                                : color.alpha * 340) + 'px',
                    }"
                />
            </div>
            Value:
            <gg-input ref="editor" v-model="innerValue" @change="handleValue" />
            <span class="warning">{{ warning }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, onMounted } from 'vue';
import { hsv2rgb, str2rgb, str2rgba, rgb2hsv } from '@/assets/js/color';
import GgInput from '@/components/GgInput.vue';

// vars
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});
const innerValue = ref(props.modelValue);
const picker = ref();
const huePicker = ref();
const hueBar = ref();
const svBar = ref();
const svPicker = ref();
const color = reactive({
    hue: 236.63,
    saturation: 78,
    value: 98.04,
    alpha: 1,
    red: 0,
    green: 0,
    blue: 0,
});
const colorBg = ref('#f00');
const alphaBar = ref();
const alphaPicker = ref();
const emit = defineEmits(['update:modelValue']);
// eslint-disable-next-line no-undef
const removers = ref<Map<EventListener, EventListener>>(new Map());
const pickerVisible = ref<boolean>(false);
const editor = ref();
// style params
const panelHeight = 200;
const panelWidth = panelHeight * 1.5;
const hueHeight = 200;
const warning = ref('');

// methods
// eslint-disable-next-line no-undef
const getRemover = (el: EventListener): EventListener => {
    let result = removers.value.get(el);
    if (!result) {
        result = () => {
            document.removeEventListener('selectstart', prevent);
            document.removeEventListener('mousemove', el);
        };
        removers.value.set(el, result);
    }
    return result;
};
const prevent = (e: Event) => e.preventDefault();
const setHue = (e: Event) => {
    if (e instanceof MouseEvent) {
        // rectangle
        const rect = hueBar.value.getBoundingClientRect();
        let y = e.clientY - rect.top;
        y = y > hueHeight ? hueHeight : y < 0 ? 0 : y;
        // count hue
        color.hue = (Math.round((y / hueHeight) * 360 * 100) / 100) | 0;
        // change panel background
        let rgb = hsv2rgb(color.hue, 100, 100);
        colorBg.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        // generate color
        generateColor();
    }
};
const handleHuePick = (e: MouseEvent) => {
    setHue(e);
    document.addEventListener('selectstart', prevent);
    document.addEventListener('mousemove', setHue);
    let remover = getRemover(setHue);
    document.removeEventListener('mouseup', remover);
    document.addEventListener('mouseup', remover);
};
/**
 * 设置饱和度和明亮度
 * @param e 鼠标事件
 */
const setSV = (e: Event) => {
    if (e instanceof MouseEvent) {
        // rectangle
        const rect = svBar.value.getBoundingClientRect();
        // count x & y
        let x = e.clientX - rect.left;
        x = x > panelWidth ? panelWidth : x < 0 ? 0 : x;
        let y = e.clientY - rect.top;
        y = y > panelHeight ? panelHeight : y < 0 ? 0 : y;
        // count saturation & value
        color.saturation = Math.round((x / panelWidth) * 100);
        color.value = Math.round((1 - y / panelHeight) * 100);
        generateColor();
    }
};
const handleSVPick = (e: MouseEvent) => {
    setSV(e);
    document.addEventListener('selectstart', prevent);
    document.addEventListener('mousemove', setSV);
    let remover = getRemover(setSV);
    document.removeEventListener('mouseup', remover);
    document.addEventListener('mouseup', remover);
};
const setAlpha = (e: Event) => {
    if (e instanceof MouseEvent) {
        // initial params
        const width = 340;
        // rectangle
        let rect = alphaBar.value.getBoundingClientRect();
        let x = e.clientX - rect.left;
        x = x > width ? width : x < 0 ? 0 : x;
        // synchronize color
        color.alpha = Math.round((x / width) * 100) / 100.0;
        // generator color
        generateColor();
    }
};
const handleAlphaPick = (e: MouseEvent) => {
    setAlpha(e);
    document.addEventListener('selectstart', prevent);
    document.addEventListener('mousemove', setAlpha);
    let remover = getRemover(setAlpha);
    document.removeEventListener('mouseup', remover);
    document.addEventListener('mouseup', remover);
};
const generateColor = () => {
    let rgb = hsv2rgb(color.hue, color.saturation, color.value);
    color.red = rgb.r;
    color.green = rgb.g;
    color.blue = rgb.b;
    if (color.alpha < 1) {
        // rgba
        let result = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${color.alpha})`;
        emit('update:modelValue', result);
    } else {
        // rgb
        let result = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        emit('update:modelValue', result);
    }
};
const handleValue = (value: string) => {
    value = value.trim();
    // debugger
    if (value.startsWith('rgba')) {
        // rgb to hsv
        let rgba = str2rgba(value);
        let hsv = rgb2hsv(rgba.r, rgba.g, rgba.b);
        color.hue = hsv.h;
        color.saturation = hsv.s;
        color.value = hsv.v;
        color.alpha = rgba.a;
        // get alpha from rgba
        warning.value = '';
    } else if (value.startsWith('rgb')) {
        // rgb to hsv
        try {
            let rgb = str2rgb(value);
            let hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
            color.hue = hsv.h;
            color.saturation = hsv.s;
            color.value = hsv.v;
        } catch (e) {
            warning.value = e.message;
        }
        // alpha to 1
        color.alpha = 1;
        warning.value = '';
    } else {
        warning.value = 'Invalid color...';
    }
};
const closeListener = (e: MouseEvent) => {
    if (!picker.value.contains(e.target)) {
        pickerVisible.value = false;
    }
};
const showPicker = () => {
    pickerVisible.value = true;
    document.addEventListener('mousedown', closeListener);
};

// hooks
onMounted(() => {
    // init colors
    handleValue(props.modelValue ?? 'rgba(55, 66, 250, .3)');
    // change sv background
    let rgb = hsv2rgb(color.hue, 100, 100);
    colorBg.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
});
watch(
    () => props.modelValue,
    (value) => {
        let newVal = value ?? '';
        innerValue.value = newVal;
    },
);
watch(innerValue, (value) => {
    emit('update:modelValue', value);
});
</script>

<style lang="less" scoped>
@hue-bar-height: 200px;
@panel-width: calc(@hue-bar-height * 1.5);
@primary-color: #3742fa;
@help-color: #5352ed;
.previewer {
    position: relative;
    width: 24px;
    height: 24px;
    background-color: red;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    &:focus {
        outline: 2px solid @primary-color;
    }
    .picker {
        position: absolute;
        top: 18px;
        left: 18px;
        z-index: 2000;
        width: calc(300px + 30px + 10px + 10px * 2);
        padding: 10px;
        background-color: white;
        border-radius: 5px;
        .hue-bar {
            position: relative;
            width: 30px;
            height: 200px;
            display: inline-block;
            background: linear-gradient(
                180deg,
                #f00,
                #ff0 17%,
                #0f0 33%,
                #0ff 50%,
                #00f 67%,
                #f0f 83%,
                #f00
            );
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
            background: linear-gradient(to top, black, transparent),
                linear-gradient(to right, white, transparent);
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
            position: relative;
            width: 340px;
            height: 30px;
            @grey: #bbb;
            background:
                linear-gradient(
                        45deg,
                        @grey 25%,
                        transparent 25%,
                        transparent 75%,
                        @grey 25%
                    )
                    0 0,
                linear-gradient(
                        45deg,
                        @grey 25%,
                        transparent 25%,
                        transparent 75%,
                        @grey 25%
                    )
                    8px 8px;
            background-size: 16px 16px;
            .alpha-cover {
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
            .alpha-picker {
                position: absolute;
                width: 8px;
                height: calc(100% + 4px);
                border: 2px solid black;
                top: -2px;
                border-radius: 5px;
                pointer-events: none;
            }
        }
        .gg-input {
            margin-top: 6px;
        }
        .warning {
            font-size: 0.8rem;
            color: red;
            margin-left: 5px;
        }
    }
}
</style>
