---
title: 博客 SEO 优化
abbrlink: d6d74ca
date: 2024-01-28 12:56:50
tags:
- seo
---

> 写博客的目的是为了记录自己的学习过程与分享日常。
> 而想要让更多的人看到自己的博客，就需要做一些 SEO 优化，提升自己的博客在搜索引擎上的排名。
如果你的博客是部署在 GitHub Pages 上的，就更需要注意了。因为 Github 限制百度的爬虫访问，你的博客在百度上是不会被收录的，而谷歌和必应会收录你的博客。

## 1. 内容优化
在你的博客中，你需要一些`关键词`和`描述`来帮助搜索引擎索引你的网页，比如你的博客是关于前端的，那么你的`关键词`可以是 `前端`、`JavaScript`、`Vue`、`React` 等等。

在 Hexo 的 `_config.yml` 文件中，你可以配置你的关键词和描述。
![关键词和描述](key-word.webp)
如果你的博客不是 Hexo，那么你可以手动在你的网页的 `<head>` 标签中添加 `<meta>` 标签来配置你的关键词和描述。
![手动添加 head](head.webp)


## 2. 安装 hexo-generator-sitemap

```bash
npm install hexo-generator-sitemap --save
```

然后 执行

```bash
hexo clean && hexo generate
```

就可以在 public 目录下看到 sitemap.xml 文件了。

## 3. 配置 robots.txt

在 `source` 目录下新建 `robots.txt` 文件，内容如下：

```txt
User-agent: *
Disallow:

Sitemap: https://example.com/sitemap.xml
```

User-agent: * 表示允许所有的搜索引擎爬取你的网站
Disallow: 为空 表示 `不限制` 爬取
Sitemap: 后面的链接是你的 sitemap.xml 文件的链接，这样搜索引擎就可以通过 sitemap.xml 文件来爬取你的网站了。

## 4. 搜索引擎提交
搜索引擎提交可以帮助你的网站更快的被搜索引擎收录，一般来说，搜索引擎会自己爬取你的网站，但是你可以手动提交你的网站，这样可以更快的被收录。

进平台验证一下域名所有权即可

### 4.1 百度
百度搜索资源平台：https://ziyuan.baidu.com/site/index
![百度搜索资源平台](baidu.webp)

### 4.2 Google
不出意外，谷歌是会自己爬取你的网站的，但是你可以通过谷歌搜索控制台来查看你的网站的爬取情况、优化你的网站内容、提交站点地图等等。

谷歌搜索控制台：https://search.google.com/search-console?hl=zh-CN
建议不要添加整个域名，而是添加你的网站的子域名，比如 `blog.example.com`，这样你可以更好的管理你的网站。如果你添加了整个域名，那么一些你并不想让谷歌爬取的子域名网页也会被收录。
![添加域名](google-add.webp)
![谷歌搜索控制台](google.webp)

### 4.3 Bing
不出意外，必应也会自己爬取你的网站。

必应站长平台：https://www.bing.com/webmasters

必应添加域名可以选择 `从谷歌搜索控制台导入` 或者 `手动添加`
![添加域名](bing-import.webp)
![从谷歌控制台导入](bing-google.webp)
![必应站长平台](bing-page.webp)

### 4.4 Naver
Naver 是韩国本土的搜索引擎，类似于国内的百度，不会像 Google Bing 那样自动收录你的网站。如果有需要，可以注册一个 Naver 账号，然后提交你的网站。
注意 IP 限制，Naver 需要韩国 IP 才能注册。
![注册](register.webp)

站长平台：https://searchadvisor.naver.com/console/board
![验证所有权](verify.webp)
建议使用 `在根目录添加 html` 来验证所有权

接下来就是提交站点地图了，点击你添加成功的网站，提交站点地图，步骤和前面的谷歌必应差不多。
![提交站点地图](sitemap.webp)


### 4.5 其他搜索引擎

Yandex、DuckDuckGo、Yahoo 等搜索引擎会自动爬取你的网站，不需要去站长手动提交（不主流，没啥必要）。

## 5. 优化性能
搜索引擎会根据你的网站的性能来排名，所以你需要优化你的网站的性能。

访问 https://pagespeed.web.dev/ 输入你的网站地址，然后就可以看到你的网站的性能了。根据提示来优化你的网站。

## 6. 外链与反链

外链（Outbound Links）指的是从你的网站指向其他网站的链接。这些链接可以是指向其他网页、博客、文章或任何在线资源的链接。外链对于提高你的网站在搜索引擎中的排名以及增加网站的可信度和权威性都非常重要。

反链（Backlinks）则是指其他网站指向你的网站的链接。这些链接也被称为入站链接，它们对于搜索引擎优化（SEO）来说非常重要，因为搜索引擎认为其他网站指向你的网站意味着你的网站有价值和权威性。有更多的反链通常意味着你的网站在搜索引擎结果中的排名会更高。

在博客和网站的运营中，外链和反链都是重要的考虑因素。通过外链可以引导读者到其他有用的资源，提供更丰富的内容体验；而反链则是其他网站认可你网站内容的一种方式，有助于提高你的网站在搜索引擎中的排名和曝光度。
