---
title: 使用 uptime-kuma 作为 Status Page
tags:
  - 部署
  - Uptime-kuma
abbrlink: c7c2ca22
date: 2024-01-04 11:56:45
---
> A fancy self-hosted monitoring tool
>
> 一个精致的自托管监控工具
## 1. 什么是 uptime-kuma，为什么要使用它？
uptime-kuma 是一个开源的 Status Page，它可以帮助你监控你的网站、服务器、API 等，当你的网站、服务器、API 等出现故障时，它会在网页上显示，同时它还可以作为一个 Status Page，展示你的网站、服务器、API 等的状态。
支持多种监测方式如 HTTP(S), TCP Port, Ping, DNS, Docker 等等

在线体验：[https://demo.uptime.kuma.pet](https://demo.uptime.kuma.pet/)

官网安装教程：[louislam/uptime-kuma](https://github.com/louislam/uptime-kuma/wiki/%F0%9F%94%A7-How-to-Install)

## 2. 安装 uptime-kuma

{% fold info @1Panel 一键安装 %}
打开 `1Panel` 面板，点击 `应用商店`，搜索 `uptime kuma`，点击 `安装` 即可。

{% post_link 1panel-installation-and-usage-tutorial '1Panel 安装配置教程' %}
{% endfold %}

{% fold info @docker-compose 安装 %}
在安装之前，先确保你的服务器已经安装了 `docker` 和 `docker-compose`

在准备好的安装目录下，新建一个 `docker-compose.yml`
内容如下：
```yml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    volumes:
      - ./data:/app/data
    ports:
      # <Host Port>:<Container Port>
      - 3001:3001
    restart: unless-stopped
```
编辑好以后在 `docker-compose.yml` 所在目录下执行 `docker-compose up -d` 启动服务。
{% endfold %}

现在访问 `http://<ip>:3001` 即可看到 uptime-kuma 的首页。

配置反向代理（过程略），二级域名 status 映射 3001 端口，即 `status.example.com`，用域名而不是 ip 访问。


## 3. 配置 uptime-kuma
访问 `status.example.com`，进入配置页面。
![配置页面](configure.webp)
设置账号密码，然后点击 `创建`。

## 4. 添加监控项
我们尝试添加一个监控项，监控 `Github`.
![添加监控项](add-monitor.webp)
填写相关信息 如 `监控类型` `名称` `URL` `心跳间隔（监控频率）`  等，然后
点击保存
（如果你想监控 `chatgpt` 可能要使用 `ping` 的方式，`https` 由于官方限制会 `403`，不知道加什么请求头才行，有懂的朋友可以评论区说一下）

这个时候我们可以看到，我们的监控项已经添加成功了。显示了 `Github` 的响应状态等信息。但是这个时候我们还不能直接访问，因为我们还没有添加对外展示的 `Status Page`。
![监控项](monitor.webp)

## 5. 添加 Status Page
点击 `状态页面`，然后点击 `新的状态页`。

![添加状态页面](add-status-page.webp)

填写 `名称` 和 `路径`，然后点击 `创建`。

`路径` 就是你的状态页面的访问路径，比如我填写的是 `show`，那么我的状态页面的访问路径就是 `http://<ip>:3001/status/show`。如果你不想这样，而是想直接访问 `status.example.com` 就能得到 `Status Page`。可以先填写一个值 等进去再配置。
![添加状态页面](add-status-page2.webp)

## 6. 配置 Status Page
点击 `添加分组`，再点击 `添加监控项`（就是前面配置的）。
![配置状态页面](configure-status-page.webp)

点击左边的 `域名`，填写你的域名，然后点击 `保存`。这样就可以使用域名 `status.example.com` 访问 而不是 `status.example.com/status/show` 。
![填写域名](configure-status-page2.webp)

换个浏览器访问域名验证一下，我们的状态页面已经添加成功了。显示了 `Github` 的响应状态信息。
![状态页面](status-page.webp)

## 7. 配置邮件通知
![监控项](monitor.webp)
点击一个监控项的 `编辑`，然后点击 `设置通知`，`通知类型` 选择 `SMTP`，然后填写你的邮箱信息，点击 `保存`。

这里我以 `outlook` 为例，参考 [微软 Outlook.com 的 POP、IMAP 和 SMTP 设置
](https://support.microsoft.com/zh-cn/office/outlook-com-%E7%9A%84-pop-imap-%E5%92%8C-smtp-%E8%AE%BE%E7%BD%AE-d088b986-291d-42b8-9564-9c414e2aa040)

微软邮箱的参数如下：
**SMTP 主机名**：`smtp-mail.outlook.com`
**SMTP 端口**：`587`
**SMTP 加密**：`STARTTLS`

**用户密码**就是你的 `outlook` 邮箱和密码。

**发信人**写成 `Uptime Kuma <你的邮箱>`，收信人写 `你的邮箱`。

**邮件主题**可以自定义，我建议为 `Uptime Kuma - {{NAME}}: is {{STATUS}}`

填写完毕后点击 `测试`，如果收到邮件，说明配置成功。

![测试成功，可以收到邮件](test.webp)
