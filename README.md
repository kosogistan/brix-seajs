# brix-seajs

基于业界最优秀的开源类库（SeaJS、jQuery、Backbone.js、Underscore 等）构建 UI 组件库。

## 延续 Brix 的 3 个标志性功能

1. 组件及嵌套组件的自动初始化。
2. 组件局部更新。
3. 组件 API 规范。

## 基于 Backbone.js

* 数据的管理基于 Backbone.Model 和 Backbone.Event。
* 组件继承自 Backbone.View，利用其优秀友好的 API 设计，缩短原型链为 1 层。

## 依赖配置

  [spm-gallery-config](https://github.com/nuysoft/spm-gallery-config)

## 缩减配置项为 3 个

1. `data-bx` 指定组件路径。

  DOMReady 事件之后，`pagelet.js` 自动查找含有属性 `data-bx` 的元素，加载该属性指定的组件，并初始化和渲染。

2. `data-bxconfig` 指定组件选项集，采用 JSON 格式。

3. `data-bxkey` 指定元素对应的数据项。

  当组件关联的数据发生变化时，`widget.js` 自动更新含有属性 'data-bxkey' 的元素。

## 核心文件 brix-seajs/src/core/

1. `brix.js` 入口文件，初始化 SeaJS 配置。
2. `pagelet.js` 组件及嵌套组件的自动初始化。
3. `widget.js` 组件局部更新。

## 重构组件 brix-seajs/src/gallery/

* 颜色选择器

  分离模板和组件代码。

* 分页导航

  提取分页状态。

* 日历

  分离模板和组件代码。

## 先跑起来

1. 顺序运行下面的命令：

    ```shell
    git clone https://github.com/nuysoft/brix-seajs.git
    cd brix-seajs
    npm install
    grunt --force
    ```

2. 访问 [http://127.0.0.1:4242/](http://127.0.0.1:4242/)

## TODO

* 填坑。Brix 开发过程中遇到过很多边缘场景，还没有总结和考虑。
* 完善代码、示例、测试用例。
* 综合其他 UI 库，规范 Gallery 选项和 API
* 完善组件的 package.json，自动生成组件的 SeaJS 推荐配置。
* 增加组件脚手架。


