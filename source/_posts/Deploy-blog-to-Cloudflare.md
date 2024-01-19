---
title: 部署博客到 Cloudflare
tags:
  - Cloudflare
  - 部署
abbrlink: '767e8929'
date: 2024-01-19 19:10:28
---

Github Pages 是一个免费的静态网站托管服务，但是由于众所周知的原因，国内访问速度不是很理想，且经常抽风。

Cloudflare 是一个 CDN 服务商，提供免费的 CDN 服务。它提供免费的 自动托管 SSL 证书、代理域名、优化网站内容、优化协议 等服务（国内也由于众所周知的原因，感知并不明显）。而现在 Cloudflare 也推出 Pages 服务，可以将你的网站部署到 Cloudflare 上，这样就可以享受到 Cloudflare 的 完整服务了。

## 1. 拥有一个 Github 仓库

如果你按照 {% post_link My-first-hexo-blog '我的第一篇 Hexo 博客' %} 的教程创建了一个 `hexo` 博客，那么你已经有了一个 Github 仓库，且 `gh-pages` 分支已经部署到了 Github Pages。

如果不是 `hexo` 也没有关系，只要你有一个 Github/Gitlab 博客代码仓库，那么你也可以部署 Cloudflare Pages。


## 2. 在 Cloudflare 上创建应用程序

打开 Cloudfalre 面板，点击 `Workers 和 Pages`

选择 `创建应用程序`，点击 `Pages`

选择 `连接到 Git` 后，添加你的 `Github` 账号，选择你要部署的仓库

![创建 Pages](Create-Pages.webp)

### 2.1 方式一 部署现有的静态网站（推荐）
如果你已经在 Github Pages 上部署了你的博客，那么你可以直接选择 拉取现有的静态网站部署。

`生产分支` 选择 `静态网站所在的分支`，其他保持不变，点击 `保存并部署`
![生产分支](branch.webp)
![静态网站所在的分支](gh-pages.webp)

这样子最方便，不需要修改任何配置，和 Github Pages 保持一致。一般等待几分钟，网站就部署好了，点击 `项目名.pages.dev` 即可访问。

方式二 这种部署方式，如果你有些特殊需求就无法满足，有些操作只能在 Github Actions 上进行，如 {% post_link Fix-article-updated-time-on-github-pages '获取所有 commit 历史来修复文章更新时间' %}

### 2.2 方式二 拉取源代码构建部署

当然 如果你没有上述需求，你也可以选择 `拉取源代码构建部署`。

生产分支选择 `main`
![main](main.webp)

`构建设置` 按需填写。
如果流程过于复杂，可以单独写一个 bash 脚本，执行 `bash deploy.sh`

![构建设置](Build-Settings.webp)

`环境变量`，添加 `NODE_VERSION`，值 为你部署网站使用的版本，如 `20`

<br>
一般等待几分钟，网站就部署好了，点击 `项目名.pages.dev` 即可访问。

## 3. 配置域名

点击 `自定义域`，输入你的域名，按要求添加 `CNAME` 记录，等待几分钟，就可以通过你的域名访问你的网站了。
![自定义域](Custom-Domain.webp)
