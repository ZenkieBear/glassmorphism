<template>
    <div>
        <header>
            Glassmorphism Generator
        </header>
        <main>
            <input type="range"
                class="slider"
                v-model="b"/>
            <NumberInput v-model="b"
                @changed="handleChange"/>
            value: {{b}}
        </main>
        <footer>
            Copyright Zenkie Bear
            <span>dsvgdfhjkjh1s11qwerthyjuiyjhgbzswar5urhfdv rsd</span>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NumberInput from '@components/NumberInput.vue';

const b = ref(0);
const handleChange = (value: number) => {
    console.log('value', value)
}
</script>

<style lang="less" scoped>
span {
    color: black
}
</style>