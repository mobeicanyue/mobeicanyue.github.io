---
title: 如何上传自己的 npm 包？
tags:
  - npm
abbrlink: 9ac67242
date: 2024-06-08 19:03:46
---

{% note info %}
近来由于维护 lxgw-wenkai-web 的需要，学习一下 npm 包的上传。

本文将介绍如何将自己的 npm 包上传到 npm 仓库。
{% endnote %}

在开始之前，请首先阅读 [npm 官方文档](https://docs.npmjs.com/)，了解 npm 的基本使用方法。

## 0. 创建 npm 包

首先，我们需要创建一个 npm 包，**如果你已经有了 npm 包，可以跳过这一步**。

否则，你可以在项目目录下执行 npm 命令来创建一个 npm 包，：
```bash
npm init
```
根据命令行提示填写项目信息，npm 会生成一个 `package.json` 文件，这个文件是 npm 包的配置文件，里面包含了项目的基本信息。

再或者，你可以手动创建一个 `package.json` 文件，内容参考：
{% fold info @package.json %}
```json
{
  "name": "test",
  "version": "1.0.0",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mobeicanyue/test.git"
  },
  "author": "mobeicanyue",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/mobeicanyue/test/issues"
  },
  "homepage": "https://github.com/mobeicanyue/test#readme",
  "description": ""
}
```
{% endfold %}
根据自己的需求修改对应字段即可。

## 1. 注册 npm 账号

首先，你需要注册一个 npm 账号，打开 www.npmjs.com/signup 填写用户名、邮箱、密码并注册，注意 npm 会发验证邮件，验证后即可登录。

## 2. 登录 npm

在终端中输入以下命令登录 npm：

```bash
npm login
```

命令行会显示

```text
npm notice Log in on https://registry.npmjs.org/
Login at:
https://www.npmjs.com/login?next=/login/cli/xxxxxxx
Press ENTER to open in the browser...
```

我们敲回车，浏览器会打开 npm 验证页面，它会发送验证码到你的邮箱，输入验证码后即可登录。
登陆成功后，命令行会显示：

```text
Logged in on https://registry.npmjs.org/.
```

## 3. 发布 npm 包

输入以下命令发布 npm 包：

```bash
npm publish
```

发布成功后，终端会显示：

```bash
+ your-package-name@1.0.0
```

至此，你的 npm 包已经成功发布到 npm 仓库。你可以在 www.npmjs.com 里搜索你的包。

4. 更新 npm 包

如果你的 npm 包有更新，你需要修改 `package.json` 中的 `version` 字段，然后重新发布。

注意，规范的 `version` 格式应为 `major.minor.patch`（`主版本号.次版本号.修订号`），例如 `1.0.0`。你也可以使用 `node-semver` 来规范版本号。

更新 `package.json` 后，输入以下命令发布 npm 包：

```bash
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]

npm publish
```
其中 `<newversion>` 为新版本号，`major`、`minor`、`patch` 分别为主版本号、次版本号、修订号。
比如，你可以输入 `npm version patch` 来更新修订号；或者输入 `npm version 1.0.1` 来更新到 `1.0.1` 版本，然后发布。
