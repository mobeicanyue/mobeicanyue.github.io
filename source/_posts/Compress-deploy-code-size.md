---
title: 压缩前端代码
tags:
  - hexo
  - 优化
abbrlink: a89b8953
date: 2023-12-28 02:51:41
---
众所周知，我们在写 HTML CSS 和 JS 文件时文件中会包含许多换行和空格。
然而，这些换行和空格对浏览器而言并不具备实际意义，反而可能降低页面的加载速度，会对页面的渲染性能造成一定影响。比如我们看个 
[`jquery` 的源码](https://lib.baomitu.com/jquery/3.6.4/jquery.min.js)
可以发现代码密密麻麻没有一点可读性，但是`这样的代码浏览器来说加载起来更快`，因为`浏览器不需要去解析空格和换行符，而是直接读取代码`。

因此，为了优化页面性能，我们需要对页面的静态资源进行压缩，包括 CSS、JS 和 HTML、图片、字体等。为了简化这一过程，可使用 Hexo 插件 `hexo-minify` 进行压缩操作。这样一来，我们可以有效地减少文件大小，提升页面加载速度。

### 1. 安装 hexo-minify 插件

在你的 Hexo 博客目录下，执行以下命令安装 hexo-minify 插件：
```bash
npm install hexo-minify --save
```

### 2. 配置 hexo-minify 插件
具体用法及参数请查阅[官方文档](https://github.com/Lete114/hexo-minify#readme)
在 Hexo 博客目录下，找到 `_config.yml` 文件，添加以下配置：
没特殊需求默认即可
```yml
## Hexo-minify Default Config Options
minify:
  preview: false ## 本地预览时是否压缩
  exclude: ['*.min.*']
  js:
    enable: true
    sourceMap:
      enable: false ## 生成 sourceMap
      ## 将 sourceMappingURL 插入压缩后的 js 文件，如果为 false 则需要在浏览器开发者工具中手动添加 sourceMap
      sourceMappingURL: false ## //# sourceMappingURL=xxx.js.map
    ## 详细配置: https://github.com/terser/terser#minify-options
    options: {}
  css:
    enable: true
    ## 详细配置: https://github.com/clean-css/clean-css#compatibility-modes
    options: {}
  html:
    enable: true
    ## 详细配置: https://github.com/kangax/html-minifier#options-quick-reference
    options:
      minifyJS: true # Compressed JavaScript
      minifyCSS: true # CSS Compressed
      removeComments: true # Remove the comments
      collapseWhitespace: true # Delete any extra space
      removeAttributeQuotes: true # Delete attribute quotes
  image:
    enable: true
    svg:
      enable: true
      ## 详细配置: https://github.com/imagemin/imagemin-svgo#imageminsvgooptionsbuffer
      options: {}
    jpg:
      enable: true
      ## 详细配置: https://github.com/imagemin/imagemin-jpegtran#options
      options: {}
    png:
      enable: true
      ## 详细配置: https://github.com/imagemin/imagemin-pngquant#options
      options: {}
    gif:
      enable: true
      ## 详细配置: https://www.npmjs.com/package/imagemin-gifsicle#options
      options: {}
    webp:
      enable: true
      ## 详细配置: https://github.com/imagemin/imagemin-webp#options
      options: {}
  font:
    enable: false
    ## 详细配置: https://github.com/Lete114/fontmin-spider#api
    options: {}
```

这样我们生成的代码就会被压缩 .
在本地运行博客默认不启用压缩 `preview: false`

现在我们想看看效果，就设置为 `preview: true`
再运行
```bash
hexo clean && hexo g
```
可以看到 html 确实被压缩了
![压缩后](after.webp)
