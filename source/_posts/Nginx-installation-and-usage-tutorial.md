---
title: Nginx 安装配置教程
tags:
  - Nginx
abbrlink: 6645bed3
date: 2024-03-02 14:04:40
---
![Nginx](NGINX-logo-rgb-large.webp)

{% note secondary %}
Nginx 是一个高性能的开源 Web 服务器，也可以作为反向代理服务器、负载均衡器和 HTTP 缓存。其轻量级且高效的设计使其在处理高并发请求时表现优异。Nginx 采用事件驱动的异步架构，能够有效地处理大量连接而不会消耗过多系统资源。它支持多种功能模块和扩展，可以满足各种 Web 服务的需求。由于其稳定性、性能和可靠性，Nginx 已成为许多网站和应用程序的首选服务器。
{% endnote %}


本文将介绍 Nginx 的安装和基本配置，以及一些常用的功能和技巧。以 Debian12 为例，其他 Linux 发行版的安装方法类似。假设你已经拥有一个域名和一台能联网的服务器。


## 1. 安装 Nginx

先更新系统软件包列表：
```bash
sudo apt update
```

然后安装 Nginx：
```bash
sudo apt install nginx
```
系统会提示是否安装，`回车` 或输入 `Y` 确认安装。


## 2. 启动 Nginx

安装完成后，Nginx 会自动启动。可以使用以下命令检查 Nginx 服务的状态：
```bash
sudo systemctl status nginx
```
如果输出中显示 `Active: active (running)`，则表示 Nginx 已成功启动。

如果 Nginx 未启动，可以使用以下命令手动启动：
```bash
sudo systemctl start nginx
```

现在，可以在浏览器中输入服务器的 IP 地址或域名，就会看到 Nginx 的默认欢迎页面。
![Nginx 欢迎页](nginx.webp)


## 3. 了解 Nginx


### Nginx 配置文件
Nginx 的默认配置文件位于 `/etc/nginx` 目录下

我们可以输出目录下的文件列表：
```bash
ls /etc/nginx
```

输出如下：
```bash
conf.d          koi-utf     modules-available  proxy_params     sites-enabled  win-utf
fastcgi.conf    koi-win     modules-enabled    scgi_params      snippets
fastcgi_params  mime.types  nginx.conf         sites-available  uwsgi_params
```

其中，
- `nginx.conf` 是 Nginx 的`主配置文件`
- `sites-available` 目录下存放着`所有可用的虚拟主机配置文件`
- `sites-enabled` 目录下存放着`启用的虚拟主机配置文件`
- `conf.d` 目录下存放着`其他配置文件`


### Nginx 常用命令
Nginx 的常用命令如下：

- 检查 nginx 配置文件是否正确：
```bash
sudo nginx -t
```

- 重新加载配置文件，优雅地重新启动：
```bash
sudo nginx -s reload
```

- 优雅地关闭：
```bash
sudo nginx -s quit
```

- 快速关闭：
```bash
sudo nginx -s stop
```

- 查看 Nginx 状态：
```bash
sudo systemctl status nginx
```


## 4. 配置虚拟主机

![Nginx 虚拟主机](nginx-virtual-host.webp)

什么是虚拟主机？
虚拟主机是指，在一台服务器上通过 Nginx 配置多个域名和网站，使得这台服务器  可以同时提供多个网站服务。通过虚拟主机，Nginx 可以根据请求的域名来确定提供哪个网站的内容。

下面，我们将介绍如何配置一个简单的虚拟主机。

假设你的域名为 `example.com`，且在域名供应商域名解析处已经将 `example.com` 解析到服务器的 IP 地址。


### 4.1 创建网站根目录

`/var/www` 目录通常用于存放网站文件。

现在，可以在 `/var/www` 目录下创建一个名为 `example.com` 的目录：
```bash
sudo mkdir -p /var/www/example.com
```
并在其中创建一个 `index.html` 文件：
```bash
sudo vim /var/www/example.com/index.html
```

将以下内容粘贴到 `index.html` 文件中：
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
保存并退出编辑器。


### 4.2 创建虚拟主机配置文件 

那么，现在可以在 `sites-available` 目录下创建一个 Nginx 配置文件 `example.com.conf`：
```bash
sudo vim /etc/nginx/sites-available/example.com.conf
```

将以下内容粘贴到文件中：
```nginx
server {
    listen 80; # 监听 80 端口（HTTP）
    server_name example.com; # 域名

    root /var/www/example.com; # 文档根目录
    index index.html; # 默认文件

    location / {
        try_files $uri $uri/ =404;
    }
}
```
保存并退出编辑器。

- `server{ }` # 定义一个虚拟主机
- `listen 80;` # 监听 80 端口（HTTP）
- `server_name example.com;` # 域名
- `root /var/www/example.com;` # 文档根目录
- `index index.html;` # 默认文件
- `location /`  # `/` 表示所有以`/`开头的请求（也就是所有请求）
- `try_files $uri $uri/ =404;` # 检查请求的文件是否存在，如果不存在则返回 404 错误


测试配置文件是否编写正确：
```bash
sudo nginx -t
```
如果没有错误，将输出以下内容：
```bash
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```


### 4.3 启用虚拟主机

接下来，需要在 `sites-enabled` 目录下创建一个符号链接，指向 `sites-available` 目录下的配置文件：
```bash
sudo ln -s /etc/nginx/sites-available/example.com.conf /etc/nginx/sites-enabled/
```

然后，重新加载 Nginx 配置文件：
```bash
sudo systemctl reload nginx
```

现在，可以在浏览器中输入 `example.com`，就会看到 `Hello World !` 页面。


### 4.4 执行流程
整个执行流程如下：
1. 浏览器发送请求到服务器
2. Nginx 接收到请求，根据请求的域名和端口，选择对应的虚拟主机配置文件
3. Nginx 根据配置文件中的 `root` 指令，找到对应的文档根目录
4. Nginx 根据配置文件中的 `index` 指令，找到默认文件
5. Nginx 返回默认文件的内容给浏览器
6. 浏览器显示页面


## 5. 配置反向代理

![反向代理](reverseproxy.webp)

Nginx 的反向代理是我们常用到的功能，它可以隐藏真实服务器地址，提高安全性，还可以实现负载均衡和缓存等功能。

什么是反向代理？
反向代理是指，Nginx 作为代理服务器，接收客户端的请求，然后将请求转发给后端服务器，最后将后端服务器的响应返回给客户端。客户端并不知道后端服务器的存在，只知道代理服务器的存在。

假设你的域名为 `website.com`，并且你的服务器上有一个运行在 8080 端口的应用程序，你希望用户通过 `website.com` 访问这个应用程序，而不是通过 `website.com:8080` 直接访问。
![没反向代理的网站](<Reverse Proxy.webp>)


### 5.1 启动应用程序

我们没必要去写一个复杂的 `Java Web` 跑个 `Tomcat`，我们可以使用 `Python Web` 服务器来模拟一个简单的应用程序。

首先和 4.1 节一样，创建目录 `/var/www/website.com` ，用于存放网站文件。
index.html 的内容可以改为：`Reverse Proxy`
```html
<h1 style="text-align: center;">Reverse Proxy</h1>
```

然后目录切换到 `/var/www/website.com`，启动一个简单的 Python Web 服务器，模拟 `Tomcat` 监听 8080 端口：
```bash
cd /var/www/website.com
python3 -m http.server 8080
```

访问浏览器可以看到，`website.com:8080` 显示 `Reverse Proxy` 页面。
![Reverse Proxy](<Reverse Proxy.webp>)

按 `Ctrl + C` 终止 Python Web 服务器。


### 5.2 创建反向代理配置文件

在 `sites-available` 目录下创建一个 Nginx 配置文件 `website.com.conf`：
```bash
sudo vim /etc/nginx/sites-available/website.com.conf
```

将以下内容粘贴到文件中：
```nginx
server {
    listen 80;
    server_name website.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
保存并退出编辑器。

这个配置文件定义了一个简单的反向代理。
- `proxy_pass http://127.0.0.1:8080;` # 将请求转发给 127.0.0.1:8080 端口来处理
- `proxy_set_header` # 设置请求头，这些请求头会被传递给后端服务器


测试配置文件是否编写正确：
```bash
sudo nginx -t
```


### 5.3 启用反向代理

接下来，需要在 `sites-enabled` 目录下创建一个符号链接，指向 `sites-available` 目录下的配置文件：
```bash
sudo ln -s /etc/nginx/sites-available/website.com.conf /etc/nginx/sites-enabled/
```

然后，重新加载 Nginx 配置文件：
```bash
sudo systemctl reload nginx
```

现在再启动 Python Web 服务器，然后在浏览器中输入 `website.com`，就会看到 `Reverse Proxy` 页面。这时，`website.com` 就会显示 `website.com:8080` 的内容。
```bash
cd /var/www/website.com
python3 -m http.server 8080
```

![反向代理](reverse2.webp)


### 5.4 执行流程
整个执行流程如下：
1. 浏览器发送请求到服务器
2. Nginx 接收到请求，根据请求的域名和端口，选择对应的虚拟主机配置文件
3. Nginx 根据配置文件中的 `location /` 指令，将请求转发给 `http://127.0.0.1:8080` 端口处理
4. Python Web 服务器处理请求，返回 `Reverse Proxy` 页面
5. Nginx 返回 `Reverse Proxy` 页面给浏览器
6. 浏览器显示页面


### 5.5 反向代理常见实践
反向代理由于隐藏了实际后端服务的端口号，可以直接通过域名来访问。为了隐藏多个应用程序的端口号，我们通常会配置多个三级域名（如 `status.example.com` 和 `chat.example.com`）来对应不同的应用程序，实现一个主域名下（`example.com`）多个应用程序的访问。

例如，我们可以配置 `app1.website.com` 和 `app2.website.com`，分别代理到不同的应用程序。

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
```

```nginx
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
