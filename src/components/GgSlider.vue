<template>
    <input type="range"
        class="slider"
        v-model="innerValue"
        ref="slider"
        :max="props.max"
        :min="props.min"
        @input="$emit('update:modelValue', slider.valueAsNumber)"/>
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
// this var save inner value
const innerValue = ref(0);
// this referenced to the element
const slider = ref();

watch(() => props.modelValue, value => {
    innerValue.value = value ?? 0;
})
</script>