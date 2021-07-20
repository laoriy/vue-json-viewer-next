## aqara-json-viewer-next

> A table component based on Vue 3.x.

### Project setup

```
npm install
```

### Compiles and hot-reloads for development components

```
npm run dev
```

or

```
npm run serve
```

### Compiles and minifies for production components(npm)

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Project directory

```
| -- build 项目构建文件
    | -- bin node执行文件
        | -- ...
    | -- ...

| -- dist npm组件的发布包源文件
    | -- dist 组件发布编译文件
        | -- **.js
        | -- **.js.map
        | -- **.min.js
        | -- **.min.js.map
        | -- ...
    | -- src 组件源文件
        | -- **.vue
        | -- ...
        | -- index.ts
    | -- types 组件ts声明
        | -- **.d.ts
        | -- index.d.ts
    | -- package.json
    | -- README.md

| -- examples npm组件的本地测试
    | -- routers 组件测试文件
        | -- **.vue
        | -- ......
    | -- index.html 页面入口
    | -- App.vue
    | -- main.js 入口文件
    | -- ......

| -- src npm组件源文件
    | -- types 组件ts声明
        | -- msg.d.ts
        | -- index.d.ts

    | -- **.vue
    | -- ......
    | -- index.ts 组件出口
    | -- package.json
    | -- README.md

    | -- types 各组件的TS类型声明
        | -- shims-tsx.d.ts Vue使用tsx语法声明
        | -- shims-vue.d.ts Vue生态插件语法声明
        | -- vue-prototype.d.ts 项目自定义Vue属性声明
        | -- ......

    | -- utils 组件依赖的公共方法等
        | -- ......

| -- test 项目单元测试文件

| -- .editorconfig 编译器配置(vscode)

| -- .eslintrc.js eslint代码检查配置

| -- .gitignore git提交忽略

| -- .babelrc 项目babel转码配置

| -- package.json 项目依赖

| -- tsconfig.json 项目ts代码编译配置
```

### Project Guide

-   组件文件夹结构及组件命名

1、组件文件夹结构需严格遵下如下通用结构:

```
| -- src
        | -- types 组件ts声明
            | -- **.d.ts
            | -- **.d.ts
            | -- index.d.ts
        | -- **.vue
        | -- index.ts 组件出口
        | -- package.json
        | -- README.md
        | -- ......
```

-   组件本地测试

1、参见`examples`内测试代码

2、**组件依赖的第三方插件需事先安装为`devDependencies`包，并非`dependencies`包**

-   组件生产环境构建

1、组件的`package.json`必须指定 npm 的`main`入口,ts 声明的`typings`入口及`name`、`version`等信息

2、若组件有依赖的第三方插件，需在`package.json`内同时指定`peerDependencies`、`dependencies`

-   组件发布到 npm 私服

```
// 1、构建组件
npm run build

// 2、发布组件
cd dist

npm login --registry http://172.16.100.47:4873

npm publish
```
