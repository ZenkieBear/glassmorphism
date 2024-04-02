<template>
    <input
        ref="slider"
        v-model="innerValue"
        type="range"
        class="slider"
        :max="props.max"
        :min="props.min"
        @input="$emit('update:modelValue', slider.valueAsNumber)"
    />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
defineEmits(['update:modelValue']);

// vars
const props = defineProps({
    modelValue: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 0,
    },
    min: {
        type: Number,
        default: 100,
    },
});
// this referenced to the element
const slider = ref();
// this var save inner value
const innerValue = ref(props.modelValue);

// hooks
onMounted(() => {
    innerValue.value = props.modelValue ?? 0;
});
watch(
    () => props.modelValue,
    (value) => {
        innerValue.value = value ?? 0;
    },
);
</script>
