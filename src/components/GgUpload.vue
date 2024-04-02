<template>
    <div class="upload-box">
        <label for="upload">
            {{ $t('components.upload') }}
            <button
                v-show="path"
                class="btn-clean fa-solid fa-xmark"
                @click="cancel"
            />
        </label>
        <input
            id="upload"
            ref="upload"
            type="file"
            class="upload"
            accept="image/*"
            @change="handleChange"
        />
        <!-- TODO 记得实现移除 -->
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// vars
const path = ref<string>('');
const upload = ref();
const emits = defineEmits(['change']);

// methods
const handleChange = () => {
    let file = upload.value.files[0];
    let url = getUrl(file);
    path.value = url;
    emits('change', url);
};
const getUrl = (file: File): string => {
    let url: string = '';
    if (window.createObjectURL) {
        url = window.createObjectURL(file);
    } else if (window.webkitURL) {
        url = window.webkitURL.createObjectURL(file);
    } else if (window.URL) {
        url = window.URL.createObjectURL(file);
    }
    return url;
};
const cancel = () => {
    upload.value.value = '';
    path.value = '';
    emits('change', '');
};
</script>

<style lang="less" scoped>
@primary-color: #5352ed;
@font-color: darken(@primary-color, 20%);
@hover-color: lighten(@primary-color, 20%);
.upload-box {
    label {
        display: inline-block;
        padding: 3px 5px;
        border: 2px solid white;
        border-radius: 5px;
        background-color: white;
        color: @primary-color;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        user-select: none;
    }
    &:hover label {
        border-color: @primary-color;
    }
    &:active {
        label {
            border-color: @font-color;
            color: @font-color;
            background-color: @hover-color;
        }
    }
    .upload {
        display: none;
    }
    .btn-clean {
        z-index: 2;
        position: relative;
        width: 0.8rem;
        height: 0.8rem;
        outline: 2px solid transparent;
        border: none;
        border-radius: 0.5rem;
        color: @primary-color;
        background: none;
        cursor: pointer;

        &::after {
            z-index: -1;
            position: absolute;
            top: -10%;
            left: -10%;
            display: block;
            width: 120%;
            height: 120%;
            border-radius: 0.8rem;
            content: '';
            background-color: @hover-color;
            clip-path: circle(0);
            transition: all 0.3s ease-in-out;
        }
        &:hover {
            &::after {
                clip-path: circle(100%);
            }
        }
    }
}
</style>
