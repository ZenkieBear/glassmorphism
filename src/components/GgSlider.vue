<template>
    <input type="range"
        class="slider"
        ref="slider"
        v-model="innerValue"
        :max="props.max"
        :min="props.min"
        @input="$emit('update:modelValue', slider.valueAsNumber)"/>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

// vars
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
// this referenced to the element
const slider = ref();
// this var save inner value
const innerValue = ref(props.modelValue);

// hooks
onMounted(() => {
    innerValue.value = props.modelValue ?? 0;
});
watch(() => props.modelValue, value => {
    innerValue.value = value ?? 0;
});
</script>