---
title: Caddy 安装与使用教程
tags:
  - Caddy
  - 部署
  - 运维
abbrlink: f3ac7ef6
date: 2024-03-04 04:56:00
---
![caddy](caddy-logo.webp)

{% note secondary %}
Caddy 是一个现代化的 Web 服务器，具有自动 HTTPS、HTTP/3、反向代理、负载均衡、静态文件服务等功能。Caddy 的设计理念是简单易用，它的配置文件采用 Caddyfile 格式，非常直观和易懂。Caddy 采用 Go 语言编写，性能优异，占用资源少，适合用于各种 Web 服务的搭建。
{% endnote %}

Nginx 是一个被广泛使用的 Web 服务器，但是它的配置相对 Caddy 更复杂，自动申请和更新 HTTPS 证书也是痛点，需要借助 Certbot 等工具来实现。而 Caddy 则内置了自动 HTTPS 功能，只需要简单的三行配置就可以实现 HTTPS 访问。

本文将介绍 Caddy 的安装和基本配置，以及一些常用的功能和技巧。以 Debian12 为例，其他 Linux 发行版的安装方法类似。假设你已经拥有一个域名和一台能联网的服务器。


## 1. 安装 Caddy

输入以下命令安装 Caddy：
```bash
sudo apt update
sudo apt install caddy
```
系统会提示是否安装，`回车` 或输入 `Y` 确认安装。

安装完成后，可以使用以下命令检查 Caddy 的版本：
```bash
caddy version
```
当前教程演示的 Caddy 版本是 `2.6.2`。


## 2. 启动 Caddy

安装完成后，Caddy 会自动启动。可以使用以下命令检查 Caddy 服务的状态：
```bash
sudo systemctl status caddy
```
如果输出中显示 `Active: active (running)`，则表示 Caddy 已成功启动。

如果 Caddy 未启动，可以根据报错信息排查问题，解决后尝试手动启动 Caddy：
```bash
sudo systemctl start caddy
```

现在，可以在浏览器中输入服务器的 IP 地址或域名，就会看到 Caddy 的默认欢迎页面。
![Caddy 欢迎页](caddy.webp)


## 3. 了解 Caddy

### 3.1 Caddy 的配置文件
Caddy 有两种配置方式，一种是使用 `Caddyfile`，另一种是使用 JSON 配置文件。Caddyfile 是为 Caddy 设计的配置文件，它的语法简单易懂，适合快速上手。JSON 配置文件则更加灵活，适合复杂的配置需求。

![Caddyfile vs json](caddyfile-json.webp)

Caddyfile 默认位置是 `/etc/caddy/Caddyfile`。但也可以使用 `-conf` 参数指定配置文件的位置：
```bash
caddy run -conf /path/to/Caddyfile
```


### 3.2 Caddy 常用命令
Caddy 提供了一些常用的命令，可以用来管理 Caddy 服务。以下是一些常用的命令：
- `caddy start`：在后台启动 Caddy 进程，然后返回
- `caddy stop`：优雅地停止已启动的 Caddy 进程
- `caddy run`：在前台启动 Caddy 进程，然后阻塞
- `caddy reload`：更改运行中的 Caddy 实例的配置
- `caddy validate`：测试配置文件是否有效
- `caddy version`：显示 Caddy 的版本信息
- `caddy reverse-proxy`：反向代理
- `caddy file-server`：启动一个生产就绪的文件服务器
- `caddy respond`：用于开发和测试的简单、硬编码 HTTP 响应


## 4. 配置网站

我们现在演示如何配置 `example.com`，使得访问 `example.com` 就会显示 `Hello World !` 页面。

假设你的域名为 `example.com`，且在域名供应商域名解析处已经将 `example.com` 解析到服务器的 IP 地址。


### 4.1 创建网站根目录

`/var/www` 目录通常用于存放网站文件，我们可以在这个目录下创建一个目录，用于存放 `example.com` 的网站文件。

```bash
sudo mkdir -p /var/www/example.com
```
并在其中创建一个 `index.html` 文件：
```bash
sudo vim /var/www/example.com/index.html
```

将以下内容粘贴到 `index.html` 文件中：
{% fold info @html 代码 %}
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>漠北残月</title>
</head>
<body>
    <h1 style="text-align: center;">Hello World !</h1>
</body>
</html>
```
{% endfold %}
保存并退出编辑器。


### 4.2 编辑 Caddyfile

Caddyfile 默认位置是 `/etc/caddy/Caddyfile`，可以使用以下命令编辑 Caddyfile：
```bash
sudo vim /etc/caddy/Caddyfile
```

将以下内容粘贴到文件中：
```Caddyfile
example.com {
    root * /var/www/example.com
    file_server
}
```
保存并退出编辑器。

- `example.com`：域名
- `root * /var/www/example.com`：文档根目录
- `file_server`：文件服务器

这样，Caddy 就会监听 `example.com` 的请求，并返回 `/var/www/example.com` 目录下的文件。

注意：如果你的地址包含主机名或 IP 地址，则 Caddy 会启用自动 HTTPS。不过，这种行为是隐式的，因此不会覆盖任何显式配置。
例如，如果网站地址是 [http://example.com](http://example.com)，自动 HTTPS 将不会激活，因为该方案是明确的 http://。


### 4.3 重新加载 Caddy 配置

编辑完成 Caddyfile 后，需要重新加载 Caddy 配置：
```bash
sudo systemctl reload caddy
```

现在，可以在浏览器中输入 `example.com`，就会看到 `Hello World !` 页面。
![Hello World](caddy-hello.webp)

我们可以注意到，浏览器访问了 `https://example.com`，Caddy **自动为网站申请了 HTTPS 证书！**，并且**自动重定向到了 HTTPS**。这是 Caddy 的自动 HTTPS 功能，非常简单方便！！！


## 5. 配置反向代理

![反向代理](posts/6645bed3/reverseproxy.webp)

Caddy 的反向代理是我们常用到的功能，它可以隐藏真实服务器地址，提高安全性，还可以实现负载均衡和缓存等功能。

假设你的域名为 `website.com`，并且你的服务器上有一个运行在 8080 端口的应用程序，你希望用户通过 `website.com` 访问这个应用程序，而不是通过 `website.com:8080` 直接访问。
![没反向代理的网站](posts/6645bed3/Reverse-Proxy.webp)
![反向代理过的网站](posts/6645bed3/reverse2.webp)

那么，可以在 Caddyfile 中添加以下内容：
```Caddyfile
website.com {
    reverse_proxy localhost:8080
}
```
保存并退出编辑器。

- `website.com`：域名
- `reverse_proxy localhost:8080`：将请求转发给 127.0.0.1:8080 端口来处理

重新加载 Caddy 配置：
```bash
sudo systemctl reload caddy
```

现在，可以在浏览器中输入 `website.com`，就会访问到运行在 8080 端口的应用程序。

![反向代理](posts/6645bed3/reverse2.webp)

由此可见，Caddy 的配置非常简单，而且功能强大，适合用于各种 Web 服务的搭建。比 Nginx 简单了太多。

比如这是两个 Nginx 的反向代理配置文件：
```nginx
server {
    listen 80;
    server_name app1.website.com;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name app2.website.com;

    location / {
        proxy_pass http://127.0.0.1:8082;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

这个是 Caddy 的配置：
```Caddyfile
app1.website.com {
    reverse_proxy http://127.0.0.1:8081 {
        header_up Host {host}
        header_up X-Real-IP {remote}
        header_up X-Forwarded-For {remote}
        header_up X-Forwarded-Proto {scheme}
    }
}

app2.website.com {
    reverse_proxy http://127.0.0.1:8082 {
        header_up Host {host}
        header_up X-Real-IP {remote}
        header_up X-Forwarded-For {remote}
        header_up X-Forwarded-Proto {scheme}
    }
}
```

更多 Caddy 的配置和功能，可以参考官方文档：[Caddy Documentation](https://caddyserver.com/docs)
