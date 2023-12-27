---
title: 博客主题改为 fluid
date: 2023-12-27 02:09:48
tags:
- hexo
- fluid
- deploy
---

[官方文档](https://hexo.fluid-dev.com/docs/start)其实挺详细的了。
记录一下我自己的操作。

### 1. 安装主题
进入博客目录执行命令：
```bash
npm install --save hexo-theme-fluid
```
然后在博客目录下创建 _config.fluid.yml，将主题 [_config.yml](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/_config.yml) 内容复制过去。

现在目录下有这三个 yml 文件：
![yml-files.webp](/images/Modify-theme/yml-files.webp)

可删除 `_config.landscape.yml` , 它是 hexo 默认的主题文件。

### 2. 修改 hexo 配置

修改 Hexo 博客目录中的 `_config.yml`：
```yml
theme: fluid

language: zh-CN
```

### 3. 创建「关于页」

执行以下命令：
```bash
hexo new page about
```

创建成功后修改 `/source/about/index.md`，添加 `layout` 属性。

添加后如下

```md
---
title: about
date: 2023-12-26 22:43:21
layout: about
---
这里写关于页的正文，支持 Markdown, HTML
```
然后不出意外你就可以看到关于页了。
输入
```bash
hexo clean && hexo g && hexo s -o
```

后访问 `http://localhost:4000/about/` 即可看到效果。

![ablout.webp](/images/Modify-theme/about.webp)

PS: 可以跟着文档把关于页面的几个 icon 一起改了。

### 4. 修改主题配置

[官方文档](https://hexo.fluid-dev.com/docs/guide/)
官方文档还算比较完善，耐心看完即可。

### 5. 修改网站图标
`修改网站图标` 文档好像没提到，我这里写一下
首先把你的图标放到 `/source/images/` 目录下，然后
打开 `_config.fluid.yml` 找到这个配置：
```yml
# 用于浏览器标签的图标
# Icon for browser tab
favicon: images/favicon.png

# 用于苹果设备的图标
# Icon for Apple touch
apple_touch_icon: images/favicon.png
```
将 `favicon.png` 改为你的图标路径即可。

### 6. 修改 slogan 为 api 语录
效果如图所示：
![api-slogan.webp](/images/Modify-theme/api-slogan.webp)

在主题配置 `_config.fluid.yml` 中开启：
```yml
index:
  slogan:
    enable: true
    text: 这是一条 Slogan
    api:
      enable: true
      url: "https://v1.hitokoto.cn/"
      method: "GET"
      headers: {}
      keys: ['data', 'content']
```
把 `url` 改为你想要的 api 地址，`keys` 改为你想要的字段。具体参数可以看[官方文档](https://hexo.fluid-dev.com/docs/guide/#slogan-%E6%89%93%E5%AD%97%E6%9C%BA)

### 7. 修改背景图片 为 api 图片
既然可以改 slogan 为 api 语录，那么背景图片当然也可以改为 api 图片 笑）。

效果如图所示：
![api-bg.webp](/images/Modify-theme/api-bg.webp)

在主题配置 `_config.fluid.yml` 中搜索
```yml
/img/default.png
```
将其改为你想要的 api 地址即可。
我是 [Bing 每日图片](https://api.vvhan.com/api/bing?size=1920x1080)
感谢接口提供者！！！