<div align="center">
  <a href="https://glass.zenkie.cn/">
    <img src="https://raw.githubusercontent.com/ZenkieBear/glassmorphism/main/public/logo.png" style="width: 100px; border-radius: 5px" />
  </a>
</div>

# Glassmorphism Generator

[![ci](https://github.com/ZenkieBear/glassmorphism/actions/workflows/node.js.yml/badge.svg)](https://github.com/ZenkieBear/glassmorphism/actions/workflows/node.js.yml)

中文文档[在这里](README-zh.md)

This is a glass-morphism CSS generator that makes it easier for designers and front-end developers to create their components.

## Suggested Tools 

* We recommend using [VSCode](https://code.visualstudio.com/) as your code editor.
* Suggested extensions for VSCode:
  * [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and turn off Vetur) 
  * [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Getting Started

To set up the project on your computer, first, install the necessary tools with this command:

```sh
npm install
```

### To Run the Project for Development

If you want to make changes and see them in real-time, use this command:

To get the project ready for others to use, you need to compile and minimize it with this command:

```sh
npm run dev
```

### To Prepare the Project for Public Use

```sh
npm run build
```

After you run this, you'll see a new folder called dist. You need to package this and put it into your web server, like [Nginx](http://nginx.org/), [Apache](https://www.apache.org/)...

## License

The Glassmorphism Generator is free to use because it's licensed under [MIT](https://github.com/ZenkieBear/glassmorphism/blob/main/LICENSE)
