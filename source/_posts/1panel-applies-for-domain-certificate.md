---
title: 1Panel 申请 Let's Encrypt 域名证书
tags:
  - 1Panel
  - Let's-Encrypt
abbrlink: e6ee4a29
date: 2024-02-02 14:00:09
---

> 域名证书是网站安全的基础，它可以保护网站的数据传输安全，防止中间人攻击。而 Let's Encrypt 是一个免费的证书颁发机构，它提供了免费的域名证书，可以让我们的网站免费使用 HTTPS 协议。

相对于传统的手动申请证书，1Panel 提供了 `一键申请证书` 和 `自动续签` 的功能，下面我们来看看如何使用 1Panel 申请 Let's Encrypt 域名证书。

如果没有安装 1Panel，请参考 {% post_link 1panel-installation-and-usage-tutorial '1Panel 安装配置教程' %}

![证书申请](apply.webp)

## 1. 创建 Acme 账户

![创建账户](apply2.webp)

填入邮箱（随意填一个即可），点击`创建`
![创建账户](create.webp)

## 2. 创建 DNS 账户

{% note info %}
申请泛域名证书，如 `*.example.com` 需要创建 DNS 账户。如果只是申请单域名则可以跳过这一步。
{% endnote %}

点击 DNS 账户，选择你的 DNS 服务商，填入你的账户信息，点击`创建`。
![账户信息](info.webp)
不同的 DNS 服务商有不同的要求，这里以 Cloudflare 为例。

API Key 的获取方法：

登录 Cloudflare 后，点击右上角头像，选择`My Profile`（我的个人资料），然后点击`API Tokens`，点击`Create Token` （创建令牌）

选择 `Edit zone DNS` 令牌模板，选择你的域名，点击`Continue to summary`（继续以显示摘要），再点击`Create Token`（创建令牌），最后复制生成的 API Key。
![选择域名](select.webp)

**注意：API Key 只会显示一次，所以请务必保存好。**

最后回到 1Panel，填入你的 Cloudflare 邮箱和 API Key，点击`创建` 即可

## 3. 申请证书
填写主域名，勾选下面的 `自动续签`，验证方式可以选择 `DNS 账号` 或者 `HTTP`（不需要 DNS 账户），点击`创建`
![申请证书](apply3.webp)

申请成功
![申请成功](success.webp)
