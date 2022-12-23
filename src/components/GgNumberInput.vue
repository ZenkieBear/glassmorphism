<template>
    <span>
        <input v-model="innerValue"
            class="number"
            ref="inner"
            type="number" :min="min" :max="max"
            @input="$emit('update:modelValue', innerValue ?? 0)"/>
    </span>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: Number
    },
    max: {
        type: Number
    },
    min: {
        type: Number
    }
});

const innerValue = ref(props.modelValue);
const inner = ref();

watch(innerValue, value => {
    const max = (() => props.max)();
    const min = (() => props.min)();
    if (!value) {
        innerValue.value = 0;
    } else if (max && value > max) {
        innerValue.value = max;
    } else if (min && value < min){
        innerValue.value = min;
    }
});
watch(() => props.modelValue, value => {
    innerValue.value = (value ?? 0);
})
</script>