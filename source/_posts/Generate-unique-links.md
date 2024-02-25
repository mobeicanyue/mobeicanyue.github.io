---
title: Hexo 生成文章唯一永久链接
abbrlink: 6a24c2b
date: 2023-12-29 10:27:37
tags:
- 优化
---


### 1. 安装插件
    
```bash
npm install hexo-abbrlink --save
```

### 2. 配置插件

修改 `_config.yml` 文件 `permalink` 为：

```yml
permalink: posts/:abbrlink/ 
# 或
permalink: posts/:abbrlink.html
```

然后在这行下面添加：

```yml
# abbrlink config
abbrlink:
  alg: crc32      #support crc16(default) and crc32
  rep: hex        #support dec(default) and hex
  drafts: false   #(true)Process draft,(false)Do not process draft. false(default) 
  # Generate categories from directory-tree
  # depth: the max_depth of directory-tree you want to generate, should > 0
  auto_category:
     enable: true  #true(default)
     depth:        #3(default)
     over_write: false 
  auto_title: false #enable auto title, it can auto fill the title by path
  auto_date: false #enable auto date, it can auto fill the date by time today
  force: false #启用强制模式，在此模式下，插件将忽略缓存，并计算每篇文章的 abbrlink，即使它已经有了 abbrlink。这只会更新 abbrlink，而不会更新其他前置变量。
```

### 3. 清除缓存再生成
```bash
hexo clean && hexo g
```
插件将会在你所有文章的 `Front-matter` 开头生成一个 `abbrlink` 属性，这个变量就是你文章的唯一永久链接。

### 4. 前后效果对比

![生成前](default-link.webp)

![生成后](abbrlink.webp)
