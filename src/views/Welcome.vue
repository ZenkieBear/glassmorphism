<template>
    <div>
        <header>
            <a href="/">
                <img src="/logo.png" alt="Logo" id="logo">
            </a>
            <nav>
                <a href="">Start</a>
                <a href="">Download</a>
                <a href="">About</a>
                <a href="https://github.com/ZenkieBear/glassmorphism">
                    <i class="fa-brands fa-github" title="star"></i>
                </a>
            </nav>
        </header>
        <div id="space"></div>
        <main>
            <div id="banner">
                <div class="title">
                    Glassmorphism Generator
                </div>
                <span class="slogan">
                    It's a glassmorphism CSS generator, help designers/frontend engineers to design their components.
                </span>
                <div class="panel">
                    <a href="">Get Start</a>
                </div>
            </div>
        </main>
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
    </div>
</template>

<style lang="less" scoped>
@primary-color: #5352ed;
@default-filter: blur(8px);
@transition-eased2s: .2s ease;
@transition-eased3s: .3s ease;
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
header {
    @header-height: 100px;
    width: 100vw;
    height: @header-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid @primary-color;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    transition: @transition-eased2s;
    #logo {
        width: 60px;
        height: 60px;
        border-radius: 18px;
    }
    &+#space {
        height: @header-height;
    }
    nav {
        padding-right: 10px;
        a {
            color: white;
            text-decoration: none;
            display: inline-block;
            padding: 10px 15px;
            border-radius: 5px;
            transition: @transition-eased3s;
        }
        a+a {
            margin-left: 10px;
        }
    }
    &:hover {
        backdrop-filter: @default-filter brightness(.8) saturate(.3);
        background: rgba(83, 82, 237, .5);
        border: none;
        nav {
            a{
                background: rgba(255, 255, 255, .6);
            }
            a:hover {
                background: white;
                color: @primary-color;
            }
            a:active {
                background: rgba(255, 255, 255, .6);
            }
        }
    }
}
main {
    #banner {
        width: 100vw;
        padding: 5vw 3vw 3vw;
        background-color: rgba(255, 255, 255, .6);
        backdrop-filter: @default-filter;
        .title {
            font-family: "Kanit";
            font-weight: bold;
            font-size: 10vw;
            -webkit-text-stroke: 2px @primary-color;
            color: transparent;
            line-height: 10vw * 1;
        }
        .slogan {
            font-size: 1.2rem;
            color: darken(@primary-color, 20%);
        }
        .panel {
            margin-top: 40px;
            a {
                text-decoration: none;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                display: inline-block;
                transition: background-position .3s ease;
                background: linear-gradient(134deg, @primary-color, @primary-color,
                spin(@primary-color, -20%));
                background-size: 200%;
                background-position: 0 0;
                &:hover {
                    background-position: 100% 100%;
                }
            }
        }
    }
}
footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100px;
    // margin-top: calc(100vh - 100px - 5vw - 20vw - 1.2rem - 40px - 20px - 1.5rem - 3vw );
    margin-top: clamp(50px, calc(100vh - 160px - 28vw - 2.7rem), 100px);
    padding: 30px 50px 50px;
    background-color: rgba(255, 255, 255, .6);
    backdrop-filter: @default-filter;
    color: darken(@primary-color, 20%);
    a.link {
        margin: 0 5px;
        text-decoration: none;
        color: darken(@primary-color, 20%);
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