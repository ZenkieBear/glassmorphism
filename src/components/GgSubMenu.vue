<template>
  <span ref="main"
      class="gl-sub-menu"
      tabindex="4"
      @click="toggleLangMenu()"
  >
      <slot name="content"></slot>
      <ul id="items" style="transform-origin: top;">
        <slot name="items" />
      </ul>
  </span>
</template>

<script lang="ts" setup>
import gsap from 'gsap';
import { onMounted, reactive, ref } from 'vue';

const main = ref();
const visible = reactive({
  value: true
});
let ctx;

const renderMenu = (visible: boolean, ul) => {
    if (visible) {
        gsap.set(ul, {
            scaleY: 1,
            opacity: 1
        })
    } else {
        gsap.to(ul, {
            scaleY: 0,
            opacity: 0,
            duration: .3,
            ease: 'power4.out'
        })
    }
}
const toggleLangMenu = () => {
    gsap.context(self => {
        const ul = self.selector?.('ul')
        renderMenu(visible.value, ul)
    }, main.value)
    visible.value = !visible.value;
}
</script>

<style lang="less">
@primary-color: #5352ed;
@font-color: darken(@primary-color, 20%);

.gl-sub-menu {
  position: relative;
  display: inline-blocks;
  cursor: pointer;

  &>ul {
      display: block;
      position: absolute;
      top: calc(100%);
      right: 0;
      min-width: 100px;
      padding: 10px;
      border: 1px solid white;
      border-radius: 10px;
      background: rgba(255, 255, 255, .8);
      color: @primary-color;

      &>li {
          padding: 5px;
          border-radius: 5px;
          cursor: pointer;
          &:hover {
              color: @font-color;
              background: white;
          }
      }
  }
  &:hover ul {
      // display: block;
  }
}
</style>