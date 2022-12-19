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
@primary-color: #5352ed;
@font-color: darken(@primary-color, 20%);
@default-filter: blur(8px);

footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // margin-top: calc(100vh - 100px - 5vw - 20vw - 1.2rem - 40px - 20px - 1.5rem - 3vw );
    // margin-top: clamp(50px, calc(100vh - 160px - 28vw - 2.7rem), 100px);
    height: clamp(50px, 50vh, 50vh);
    padding: 30px 50px 50px;
    background-color: rgba(255, 255, 255, .6);
    backdrop-filter: @default-filter;
    color: @font-color;
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