<template>
    <footer>
        <nav>
            <span>
                Star on 
                <a href="" class="link">
                    <i class="fa-brands fa-github"></i>
                </a>
            </span>
        </nav>
        <div class="copyright">
            Copyright 2022 <a href="https://github.com/ZenkieBear" class="link">Zenkie Bear</a> .
        </div>
    </footer>
</template>

<style lang="less" scoped>
@default-filter: blur(8px);
@primary-color: #5352ed;
@font-color: darken(@primary-color, 20%);

footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: clamp(100px, 50vh, 50vh);
    padding: 30px 50px 50px;
    background-color: rgba(255, 255, 255, .6);
    backdrop-filter: @default-filter;
    color: @font-color;
    position: relative;
    z-index: 0;
    a.link {
        margin: 0 5px;
        text-decoration: none;
        color: @font-color;
        position: relative;
        overflow: hidden;
        display: inline-block;
        line-height: 1.2rem;
        padding: 0 3px;
        &::after {
            content: '';
            position: absolute;
            top: 70%;
            left: 0;
            z-index: -1;
            background-color: white;
            width: 100%;
            height: 100%;
            transition: all .3s ease;
        }
        &:hover::after {
            top: 0;
            border-radius: 5px;
        }
    }
    nav {
        >span {
            display: flex;
            align-items: center;
        }
    }
    .copyright {
        display: flex;
        align-items: center;
        margin-top: 1rem;
    }
}
</style>