<template>
    <span class="pop">
        <!-- label -->
        <span class="content">
            <slot name="content">
                Please put your content with slot named 'content';
            </slot>
        </span>
        <!-- content -->
        <slot></slot>
    </span>
</template>

<style lang="less" scoped>
@primary-color: #5352ed;
.pop {
    position: relative;
    display: inline-flex;
    align-items: center;
    text-align: center;
    vertical-align: middle;
    z-index: 1000;
    .content {
        position: absolute;
        top: calc(-1 * (0.8rem + 5px + 10px));
        padding: 5px 10px;
        display: none;
        background: lighten(@primary-color, 50%);
        color: @primary-color;
        font-size: 0.8rem;
        white-space: nowrap;
        border-radius: 15px;
        border-bottom-left-radius: 4px;
        border: 2px solid @primary-color;
        box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.4);
    }
    &:hover .content {
        display: inline-block;
    }
}
</style>
