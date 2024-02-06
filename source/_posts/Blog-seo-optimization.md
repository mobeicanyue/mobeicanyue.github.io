---
title: 博客 SEO 优化
abbrlink: d6d74ca
date: 2024-01-28 12:56:50
tags:
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

进去验证一下网站所有权即可

### 4.1 百度
百度搜索资源平台：https://ziyuan.baidu.com/site/index
![百度搜索资源平台](baidu.webp)

### 4.2 Google
不出意外，谷歌是会自己爬取你的网站的，但是你可以通过谷歌搜索控制台来查看你的网站的爬取情况，以及提交你的网站。

谷歌搜索控制台：https://search.google.com/search-console?hl=zh-CN
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
站长平台：https://searchadvisor.naver.com/console/board

![注册](register.webp)
![验证所有权](verify.webp)
![成功添加](success.webp)


建议使用在根域名添加 html 来验证所有权

### 4.5 其他搜索引擎

Yandex、DuckDuckGo、Yahoo 等搜索引擎会自动爬取你的网站，不需要去站长手动提交（不主流，没啥必要）。
