<template>
    <input v-model="innerValue"
        ref="inner"
        class="gg-input"
        @input="$emit('update:modelValue', innerValue ?? ''), $emit('change', innerValue ?? '')"/>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: String
    }
});

const inner = ref();
const innerValue = ref(props.modelValue);

// hooks
watch(() => props.modelValue, value => {
    innerValue.value = value ?? '';
});
</script>