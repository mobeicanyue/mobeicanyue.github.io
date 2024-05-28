---
title: 1Panel 安装配置教程
tags:
  - 1Panel
  - 运维
  - 服务器
  - 部署
abbrlink: 15c02856
date: 2023-12-28 15:54:04
---

{% note primary %}
本文旨在介绍 `1Panel` 的安装和基本使用，以及一些常用的功能和技巧。
{% endnote %}

## 1. 什么是 `1Panel`，为什么要使用它？


![1panel 的官网简介](https://pic4.zhimg.com/80/v2-d303c292b709c8702e3537ed161009d7_1440w.webp)

<br>

[1Panel](https://github.com/1Panel-dev/1Panel) 是一个现代化、开源的 **服务器管理面板**，封装了很多常用的操作，比如安装软件、配置反向代理、申请 SSL 证书等等。UI 界面好看，操作也很简单。是宝塔面板的一个很好的替代品。

1Panel 在线体验：[https://demo.1panel.cn](https://demo.1panel.cn)

## 2. 安装 `1Panel` 

开始之前先确保你的服务器安装了 `curl`

### 2.1 执行安装脚本

ssh 连接到你的服务器，执行下面的命令，安装 1panel。过程会输出很多日志信息，等待安装完成即可。
```bash
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh
```
### 2.2 安装配置
命令行提示输入 安装目录，敲回车，默认安装路径为 `/opt/1panel`.
![安装目录](https://pic4.zhimg.com/80/v2-eb429def76fbfb36e4f687b775943eeb_1440w.webp)

命令行提示输入 端口，用户名，密码。这里可以自定义，也可以直接回车使用默认值。
![输入信息](https://pic2.zhimg.com/80/v2-5b8e8453a01ec99e11d39690bfb4b469_1440w.webp)

### 2.3 安装完成
记住 1panel 面板生成的 **`端口号`** 和 **`账号密码`**
注意，如果你的服务器供应商有防火墙，记得开放 1panel 的端口。

如果没有什么报错的话，那么恭喜你，1panel 已经安装成功了。

### 2.4 登陆 1panel 面板
我们可以从命令行输出的信息中找到 `外网地址`，如下图所示。
![登陆信息](https://pic2.zhimg.com/80/v2-1a55a84f560aac043c1e43623cf08739_1440w.webp)

使用浏览器访问 命令行输出的 `外网地址` 就可以登陆 1panel 面板了。
![登陆界面](https://pic4.zhimg.com/80/v2-8805f288fd97f192d0ac30e389079043_1440w.webp)

输入账号密码 登陆以后我们可以看到 1panel 的界面。
![1panel 首页](https://pic1.zhimg.com/80/v2-b9b93ab5e5ec5c6a7fecade5b617dec4_1440w.webp)

首页显示的是`服务器的基本信息`，我们可以看到服务器的内存、cpu、硬盘、负载、系统的发行版本、内核、主机名等信息。

点击应用商店，这里有 1panel 社区维护的一些应用，我们可以直接安装使用。
应用商店包括了一些很热门的应用和开源项目 如：`AList` `MySQL` `Bitwarden` `WordPress` `Umami` `Uptime Kuma` `Jenkins` `Redis` `MongoDB` `PostgreSQL` 等等。都是运行在 docker 容器中的，安装和卸载都很方便。
![应用商店](https://pic2.zhimg.com/80/v2-23de72dbdaaccb84c8b6e40b83c6a159_1440w.webp)

## 3. 安装 `openresty` 应用

我们选择安装 `openresty`，`安装` -> `确认` 即可。`openresty` 是 nginx 的开源 fork，支持 lua 脚本，安装了它才能在 1panel 编辑网页、配置反向代理。

![openresty](https://pic1.zhimg.com/80/v2-3ec6423285e4bf9ec5c94c948aea4bb8_1440w.webp)
不要修改配置！直接点确定即可。

## 4. 设置域名解析
域名服务商设置域名解析，将 `域名` 解析到服务器的 `IP` 上。
![域名解析](https://pic3.zhimg.com/80/v2-319ce2637512c2c64b7f64136d60b8ca_1440w.webp)

## 5. 配置反向代理
点击网页左侧的 `网站`，然后点击 `创建网站`，选择反向代理，填入主域名和代理地址，点击确认。

![反向代理](https://pic3.zhimg.com/80/v2-fb495404d4641ff7a789dec2c45225c2_1440w.webp)

配置好后，就可以使用域名访问 1panel 面板了。

## 6. 配置域名 SSL 证书

### 6.1 创建 ACME 账户

`网站` -> `证书` -> `ACME 账户` -> `创建账户`，填入邮箱地址，点击确认。

![创建 ACME 账户](https://pic3.zhimg.com/80/v2-0eddfef77e614c09f57ca8e9b32992c6_1440w.webp)

### 6.2 申请证书

`网站` -> `证书` -> `申请证书`，填入主域名，选择 ACME 账户，验证方式选择 `HTTP`，勾选 `自动续签`，点击确认。你就可以在 `证书` 页面看到你的证书了。

![申请证书](https://pic4.zhimg.com/80/v2-a41668e2d037b4d107e2cf7c3912ccd3_1440w.webp)

### 6.3 配置证书

`网站` -> 找到你的网站，点击 `编辑`，点击 `HTTPS` 并启用，选择你的证书，点击保存。

![配置证书](https://pic1.zhimg.com/80/v2-bdcaa006f53c65672ad3358285e13f74_1440w.webp)

## 7. `1Panel` 实用功能

### 7.1 设置 swap 分区

swap 是操作系统用来扩展内存的一种机制。当物理内存不足时，系统会将一部分内存转移到硬盘的 swap 分区，来减轻内存压力。适当使用 swap 可以提高系统的稳定性和性能。
swap 的大小应该是物理内存的 1 到 2 倍，可根据具体情况进行调整。

设置步骤：`工具箱` -> `Swap` -> `设置`，填入大小，点击保存。

### 7.2 计划任务

`计划任务` -> `创建计划任务`，选择任务类型，填入任务名称，选择执行周期，点击保存。

![计划任务](https://pic2.zhimg.com/80/v2-4ff9f3333ef8aa450b67b44c71082bed_1440w.webp)

### 7.3 缓存清理

`工具箱` -> `缓存清理`，点击 `开始扫描`，扫描完成后勾选需要清理的缓存，点击 `立即清理`。

### 7.4 Fail2ban

Fail2Ban 是一个入侵检测系统框架，它可以监控服务器的日志文件，当发现有暴力破解行为时，会自动封禁攻击者的 IP 地址，保护电脑服务器免受暴力破解。

`工具箱` -> `Fail2ban`，点击 `启用`，即可开启 Fail2ban 防火墙。
具体使用可以参考我的文章：{% post_link Fail2ban-installation-and-usage-tutorial 'Fail2ban 安装使用教程' %}

### 7.5 日志审计

`日志审计` 里可以查看各种各样的日志，包括面板日志、登陆日志、网站日志等等。对于运维排查问题非常有用。

## 8. `1Panel` 实用技巧

### 8.1 迁移应用到其他服务器

`1Panel` 应用商店里的应用都是运行在 docker 容器中的，所以迁移起来非常方便。

`应用商店` -> `已安装`，找到你要迁移的应用（这里用 Umami 做演示），点击应用的 `备份`，下载备份文件。

![备份](https://pic3.zhimg.com/80/v2-4ad83be329003e8f755b4f02000c131a_1440w.webp)

在新服务器上安装 `1Panel`，然后在 `应用商店` 中安装 Umami（如果你的应用有数据库，那么还要安装对应的数据库），点击 `导入备份`，上传备份文件，即可迁移应用。

![导入备份](https://pic2.zhimg.com/80/v2-7ca4b40e8752c742b868261b856284e5_1440w.webp)

### 8.2 定时备份应用数据到网盘

点击 `面板设置` -> `备份账号`，选择你的网盘，参考 https://1panel.cn/docs/user_manual/settings/#3 进行授权配置。

点击 `计划任务` -> `创建计划任务`，选择 `备份应用`，填入任务名称，选择执行周期，选择备份的应用，选择备份的账号和默认下载地址，点击保存。

![备份应用](https://pic1.zhimg.com/80/v2-e61e3b7b91f2528b3a0444937b1260e4_1440w.webp)
