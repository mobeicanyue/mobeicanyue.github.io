---
title: 主题改为 fluid
date: 2023-12-27 02:09:48
tags:
---

官方教程[fluid](https://hexo.fluid-dev.com/docs/start)其实挺详细的了。
记录一下我自己的操作。

### 1. 安装主题
进入博客目录执行命令：
```bash
npm install --save hexo-theme-fluid
```
然后在博客目录下创建 _config.fluid.yml，将主题 [_config.yml](https://github.com/fluid-dev/hexo-theme-fluid/blob/master/_config.yml) 内容复制过去。

现在目录下有这三个 yml 文件：
![yml-files.jpg](/images/Modify-theme/yml-files.jpg)

可删除 `_config.landscape.yml` , 它是默认的主题文件。

### 2. 修改主题配置

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

创建成功后修改 `/source/about/index.md`，添加 `layout`` 属性。

改后如下

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
hexo clean && hexo g && hexo s
```

后访问 `http://localhost:4000/about/` 即可看到效果。