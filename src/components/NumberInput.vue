<template>
    <span>
        <input type="number"
            v-model="innerValue"
            class="number"
            @input="$emit('update:modelValue', innerValue)"/>    <!-- @input="$emit('changed', innerValue)" -->
    </span>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: Number
    }
});

const innerValue = ref(props.modelValue);

watch(() => props.modelValue,
(value, oldValue) => {
    innerValue.value = (value ?? 0);
})
</script>