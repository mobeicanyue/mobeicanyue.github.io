---
title: 部署自己的网盘 — AList 安装配置教程
tags:
  - 部署
  - AList
abbrlink: 9c18a796
date: 2024-01-17 20:50:59
---

{% note secondary %}
本文档为 Alist 部署教程，主要介绍 Alist 的配置及使用，参考了官网的教程来编写。更多信息请参照官网 https://alist.nn.ci/zh/guide
{% endnote %}

## 1. 安装 Alist

{% fold info @1Panel 一键安装 %}
打开 `1Panel` 面板，点击 `应用商店`，搜索 `Alist`，点击 `安装` 即可。

{% post_link 1panel-installation-and-usage-tutorial '1Panel 安装配置教程' %}
{% endfold %}

{% fold info @一键脚本安装 %}
仅适用于 Linux amd64/arm64 平台
打开命令行输入

```bash
curl -fsSL "https://alist.nn.ci/v3.sh" | bash -s install
```

alist 默认安装在 /opt/alist 中

启动： `systemctl start alist`
关闭： `systemctl stop alist`
状态： `systemctl status alist`
重启： `systemctl restart alist`
{% endfold %}

{% fold info @docker-compose 安装 %}

创建一个目录
```bash
mkdir /etc/alist
```
进入该目录
```bash
cd /etc/alist
```
下载 `docker-compose.yml` 文件
```bash
wget https://alist.nn.ci/docker-compose.yml
```
运行容器
```bash
docker-compose up -d
```

{% endfold %}

{% fold @手动安装 %}
打开 AList Release 下载待部署系统对应的文件。下载后解压，赋予文件执行权限后运行即可。Windows 推荐使用该方式安装。
参照 https://alist.nn.ci/zh/guide/install/manual.html
{% endfold %}

## 2. 获取 Alist 密码

在安装路径下（能访问到 alist 可执行文件）执行如下命令

（如果是 1panel 安装，就点击 `容器` 列表，点击 `alist 容器` 的 `终端` 按钮，在容器终端下再执行如下命令。）

随机生成一个密码
```bash
./alist admin random
```

手动设置一个密码，`NEW_PASSWORD`是指你需要设置的密码
```bash
./alist admin set NEW_PASSWORD
```

<br>
如果是 doekcer compose 安装，可执行如下命令
```bash
docker exec -it alist ./alist admin random
```

```bash
docker exec -it alist ./alist admin set NEW_PASSWORD
```

## 3. 配置 Alist

默认情况下，应用程序将在 http://localhost:5244 上启动。你可能需要代理 Web 服务器的请求，或更改端口来直接为应用程序提供服务。

浏览器访问 Alist 登陆页面
输入用户名 `admin` 和上一步获取的 `密码`
点击登陆

### 3.1 添加本地存储

1. 在你`安装 alist 的路径`创建一个目录 `files` 用来存储文件，便于持久化存储。一键脚本路径为 `/opt/alist/files`；docker-compose 路径为 `etc/alist/files`。

2. 然后开始添加存储
左边栏点击 `存储`，然后点击`添加`，驱动选择 `本机存储`，点击`添加`

3. `挂载路径`填写 `/`，意味着此存储为 `网盘根目录`。往下滑，找到 `根文件夹路径`。
如果你是一键脚本安装的，就填写 `/opt/alist/files`；如果你是 docker-compose 安装的，就填 `/opt/alist/data/files`。（注意，这个是容器内的映射路径，不是宿主机的路径）

也就是 `根文件夹路径(/opt/alist/files)` --> `挂载路径(/)`，这样就可以把 `/opt/alist/files` 映射到 `/`，也就是网盘根目录。

最下面点击 `保存`

### 3.2 启用游客访问
左边栏点击 `用户`
编辑 `guest` 用户，将 `停用` 取消勾选，然后点击保存


### 3.3 启用索引

按照以下步骤开启搜索：

1. 转到索引页，选择一个搜索索引，并单击保存;
2. 保存索引后，单击构建索引来构建索引;
3. 现在你可以通过点击页面右上角的搜索块或使用快捷键 Ctrl + K 来搜索文件。
