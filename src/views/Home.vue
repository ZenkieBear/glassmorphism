<template>
    <div>
        <input type="range"/>
    </div>
</template>

<style lang="less" scoped>
@primary-color: rgb(83, 82, 237);
input[type="range"] {
    // the diameter of thumb
    @thumb-diameter: 18px;
    appearance: none;
    width: 200px;
    height: calc(@thumb-diameter * 2);
    outline: none;
    overflow: hidden;
    cursor: pointer;
    &::-webkit-slider-thumb {
        appearance: none;
        width: @thumb-diameter;
        height: @thumb-diameter;
        border-radius: 50%;
        position: relative;
        top: calc(-18px / 2 + 5px / 2);
        background-color: @primary-color;
        transition: .2s ease;
    }
    &::-webkit-slider-runnable-track {
        height: 5px;
        background-color: lighten(@primary-color, 25%);
    }
    &:hover::-webkit-slider-thumb {
        width: calc(@thumb-diameter * 1.5);
        height: calc(@thumb-diameter * 1.5);
        top: calc((@thumb-diameter / -2 + 5px / 2) * 1.5);
    }
}

</style>