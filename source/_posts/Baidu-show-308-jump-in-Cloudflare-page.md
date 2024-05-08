---
title: 百度收录 Cloudflare Page 显示 308 报错
tags:
  - Cloudflare-Page
  - Baidu
  - SEO
abbrlink: e7163e6b
date: 2024-03-10 16:06:57
---

{% note success %}
前阵子我决定将博客迁移到 Cloudflare Page 上，但百度收录使用 `.html 验证网站所有权` 会显示网页 308 跳转报错。我一开始还以为是百度的问题，千方百计地设法解决但是都徒劳无功，后来才发现是 Cloudflare Page 的问题。

Google 和 百度都没有发现这个解决办法，所以自己写一篇文章来记录一下。
{% endnote %}

## 1. 问题描述

百度验证所有权有两种方式：
1. 文件验证：下载百度提供的 `.html` 验证文件，放置在网站根目录下。
2. HTML 标签验证：在网站首页的 `<head>` 标签中添加一个特定的 meta 标签，内容由百度提供。

问题出在 `文件验证` 上：
**Cloudflare Page 会将 `.html 文件请求` 重定向到 `去掉 .html 后缀的地址` 。导致百度收录网站时显示网页 308 跳转。**

![百度报错 308](https://pic4.zhimg.com/80/v2-9b2591438a5d35d8ee4ca6e0da4d4f8f_1440w.webp)

如 `https://www.ovvv.top/baidu_verify_codeva-GwRsL4VPtx.html` 会自动重定向到 `https://www.ovvv.top/baidu_verify_codeva-GwRsL4VPtx`。

![重定向，没有 .html 后缀](https://pic1.zhimg.com/80/v2-d1aad73842196ad68566de57ef0b75e8_1440w.webp)

直接点击浏览器访问 `https://www.ovvv.top/xxx.html` 是看不出问题的，因为浏览器会自动重定向到 `https://www.ovvv.top/xxx`。但是百度收录使用 .html 验证网站所有权时，会显示网页 308 跳转。


## 2. 解决办法

在 `Cloudflare Community` 暂时没有找到`完美的解决办法`，工作人员表示这是 Cloudflare Page 的特性，`暂时还不会提供开关`。

文档描述：https://developers.cloudflare.com/pages/configuration/serving-pages/#route-matching


解决办法（workaround）：

1. 在文件后面加上 `.html` 后缀，两层 `.html` 嵌套，Cloudflare Page 重定向后就会显示 一层 `.html`。
如 Cloudflare Page 文件链接为 `https://www.ovvv.top/xxx.html.html`。这样访问后重定向后就会显示 `https://www.ovvv.top/xxx.html`。符合百度验证的要求。

  ![加后缀显示](https://pic3.zhimg.com/80/v2-1ca3f5b3bec86e96558b00e51c8aed12_1440w.webp)

2. 使用 `HTML标签验证` 网站所有权。（但是不够优雅，因为每个网页都要加上）

  ![标签验证](https://pic4.zhimg.com/80/v2-6f78f82328de1e68d8537e00143b3b63_1440w.webp)

验证成功
![成功](https://pic3.zhimg.com/80/v2-a39791cb2b2b2858e403801fb71af9b6_1440w.webp)
