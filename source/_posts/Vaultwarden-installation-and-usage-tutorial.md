---
title: Bitwarden (Vaultwarden) 部署使用教程
abbrlink: 2d9cb7bd
date: 2024-04-13 13:11:03
tags:
  - Bitwarden
  - Vaultwarden
  - 部署
  - 安全
---

![bitwarden](https://pic1.zhimg.com/80/v2-37027f299fa4cff9f29e0cb223d127ec_1440w.webp)

{% note info %}
相信大家对 Bitwarden 这款密码管理工具并不陌生，它是一款 **`开源`** 的密码管理工具，可以帮助我们管理各种账号密码，支持多种平台，包括 Windows、macOS、Linux、Android、iOS 等。

Bitwarden 的官方服务有些功能是收费的（如 2FA），但它开源了服务端的代码，所以我们可以自己搭建一个 Bitwarden 服务。而我们今天要介绍的 **`Vaultwarden`** 就是 Bitwarden 服务器的一个开源实现。Vaultwarden 是用 Rust 编写的 Bitwarden 服务器 API 的替代实现，兼容上游 Bitwarden 客户端，非常适合在运行官方资源繁重的服务并不理想的情况下进行自托管部署[^1]。
{% endnote %}

本文将介绍如何在 Linux 服务器上通过 Docker Compose 部署 Vaultwarden 服务。当然你也可以使用 `1Panel` 一键安装部署。

## 1. 创建目录

输入以下命令创建一个目录，用于存放 Vaultwarden 的数据：
```bash
sudo mkdir /opt/vaultwarden && cd /opt/vaultwarden
```

## 2. 创建 Docker Compose 配置文件

输入以下命令创建一个 Docker Compose 配置文件：
```bash
sudo vim /opt/vaultwarden/docker-compose.yml
```
<br>

复制以下内容到文件中：
```yaml
version: '3'

services:
  vaultwarden:
    image: vaultwarden/server:latest-alpine
    container_name: vaultwarden
    restart: always
    ports:
      - '6666:80' #主机:容器
    volumes:
      - ./vw-data:/data
    environment:
      DOMAIN: "https://example.com"
```
保存并退出编辑器。

## 3. 启动服务

输入以下命令启动 Vaultwarden 服务：
```bash
sudo docker-compose up -d
```

现在 Vaultwarden 服务已经启动了，地址为 `http://example.com:6666`

但是**在使用之前，你最好使用反向代理隐藏端口并配置 HTTPS，避免中间人攻击。**配置完毕之后你就可以访问你的 Vaultwarden 网页版服务了。

![登陆](https://pic3.zhimg.com/80/v2-64812e3da6683431d0ecf696e102afc2_1440w.webp)

创建一个账号，然后你就可以在各个平台上使用 Bitwarden 客户端了。电脑上推荐使用浏览器插件，手机上推荐使用官方客户端。注意在登陆的时候要选择 `自托管`，输入你的 `服务器 URL` 即可。

![登陆选择](https://pic4.zhimg.com/80/v2-196b3cc79509562d5cec5426076a14b3_1440w.webp)


## 4. Docker Compose 配置详解

### 4.1 image

`vaultwarden/server:latest` 是 Vaultwarden 服务器的 Docker 镜像，latest 是最新版本。

而本文使用的是 `vaultwarden/server:latest-alpine`，是基于 Alpine Linux 的最新版本。该镜像功能上与 latest 相同，但镜像基于 Alpine 而非 Debian，镜像更小，基础应用程序更新。

当然你也可以指定一个特定的版本，如 `vaultwarden/server:1.22.0` 或 `vaultwarden/server:1.22.0-alpine`。

### 4.2 ports

`6666:80` 表示将容器的 80 端口映射到主机的 6666 端口。可以根据自己的需求修改。

### 4.3 volumes

`./vw-data:/data` 表示将主机的 `./vw-data` 目录挂载到容器的 `/data` 目录。但是不建议更改，与官方文档保持一致。

### 4.4 environment

Vaultwarden 推荐使用环境变量来配置服务

- `DOMAIN`：你的域名。

下面是一些其他的环境变量[^2]，你可以根据自己的需求添加：

- `SIGNUPS_ALLOWED`：是否允许注册新用户，默认为 `true`。你可以在自己注册完毕后，将其设置为 `false` 来关闭注册功能。但即使禁用了，管理员还是可以继续邀请新用户。
- `ADMIN_TOKEN`：开启管理员功能，需要设置一个 token，推荐使用命令 `openssl rand -base64 48` 生成一个随机 token。设置以后，访问 `https://example.com/admin`，输入 token 即可进入管理员界面。管理员可以查看并删除所有已注册的用户。它也允许邀请新用户，即使禁用了注册功能。
- `INVITATIONS_ALLOWED`：是否允许管理员邀请新用户，默认为 `true`。关闭后，管理员将无法邀请新用户。
- `WEB_VAULT_ENABLED`：是否启用 Web 界面，默认为 `true`。关闭后，用户将无法使用 Web 界面，但仍然可以使用客户端。注册之后也可以禁用 Web 界面。


建议前端注册用户成功后，进行如下配置，禁止注册和 Web 界面：
```yml
environment:
  SIGNUPS_ALLOWED: "false"
  WEB_VAULT_ENABLED: "false"
```

## 5. 维护 Vaultwarden

### 5.1 更新

```bash
sudo docker-compose pull
sudo docker-compose up -d
```

### 5.2 停止并移除容器

```bash
sudo docker-compose down
```

### 5.3 数据备份

Vaultwarden 的数据存储在 `./vw-data` 目录中，你可以直接备份这个目录。


---

[^1]: https://github.com/dani-garcia/vaultwarden
[^2]: https://github.com/dani-garcia/vaultwarden/wiki
