---
title: 博客域名配置
date: 2023-12-27 02:31:59
tags:
---
> 前置条件：已经有一个域名，且跟着前面的文章配置好了 github pages。

### 1. 在域名服务商处配置域名解析
域名解析，不同的服务商有不同的配置方式。
类型 选择 CNAME，主机记录填写你的域名，比如 `example.com`，
值填写 `用户名.github.io`，比如 `mobeicanyue.github.io`。

![domain-record.jpg](/images/Configure-blog-domain/domain-record.jpg)

### 2. 在 github 仓库中配置域名

进入你的仓库，点击 `settings`，左边栏，找到 `Pages`，在 `Custom domain` 中填写你的域名，比如 `example.com`，然后点击 `Save`。

![set-domain.jpg](/images/Configure-blog-domain/set-domain.jpg)
等待 dns 检查，一般不到几分钟就好了。
![wait-dns.jpg](/images/Configure-blog-domain/wait-dns.jpg)
访问你的域名，比如 `example.com`，就可以看到你的博客了。
![blog.jpg](/images/Configure-blog-domain/blog.jpg)