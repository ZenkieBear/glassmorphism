<template>
    <span>
        <input
            ref="inner"
            v-model="innerValue"
            class="gg-input gg-number-input"
            type="number"
            :min="min"
            :max="max"
            @input="$emit('update:modelValue', innerValue ?? 0)"
        />
    </span>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 100,
    },
    min: {
        type: Number,
        default: 0,
    },
});

const innerValue = ref(props.modelValue);
const inner = ref();

watch(innerValue, (value) => {
    const max = (() => props.max)();
    const min = (() => props.min)();
    if (!value) {
        innerValue.value = 0;
    } else if (max && value > max) {
        innerValue.value = max;
    } else if (min && value < min) {
        innerValue.value = min;
    }
});
watch(
    () => props.modelValue,
    (value) => {
        innerValue.value = value ?? 0;
    },
);
</script>
