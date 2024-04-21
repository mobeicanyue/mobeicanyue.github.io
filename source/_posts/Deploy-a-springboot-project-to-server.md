---
title: 记录一次服务器部署 SpringBoot 项目的过程
tags:
  - Java
  - SpringBoot
  - MariaDB
  - 部署
  - 运维
abbrlink: e9bc4027
date: 2024-04-15 15:08:16
---

我毕业设计做的是 `SpringBoot` 前后端结合项目，项目开发完成后，需要将项目部署到服务器上，以便在公网访问。我想尝试一下真正的项目部署流程，即使毕设并没有要求我部署到服务器上。

{% note info %}
不同于以往相对严谨的科普教程，本文偏向于整理一个大概的 SpringBoot 项目部署流程框架，内容也会轻松随意些。如有谬误之处，欢迎指正。
{% endnote %}

## 1. 准备工作

### 1.1 开发环境梳理

检查一下各个开发环境的版本，以便在服务器上安装环境时参考：

开发系统：`Archlinux`
服务器系统：`Debian-12.5`

**开发工具：**
开发软件：`IntelliJ IDEA 2024.1`
图形化数据库管理工具：`Beekeeper-studio v4.2.9`

**开发框架：**
Java 环境：`OpenJDK version 21.0.2`
Springboot 版本：`3.2.4`
MariaDB 数据库：`11.3.2`

### 1.2 备份数据库
这里我直接将开发时使用的数据库备份导入到服务器上，方便省事。
MariaDB 数据库备份命令：
```bash
mariadb-dump -u root -p database_name > bak.sql
```
上述命令执行完毕，我们就可以在目录下找到备份好的 `bak.sql` 文件了。

### 1.3 打包图片资源

项目需要使用一些图片资源，要打包上传到服务器上。

执行以下命令：
```bash
tar -caf images.tar.zst images
```
这里我使用了 `zstd` 压缩算法，是一种压缩效率很高、压缩速度也很快的算法。压缩后的文件名为 `compress.tar.zst`。

- `-caf` 压缩指定文件或文件夹，自动选择压缩算法
- `images` 要压缩的文件夹
- `images.tar.zst` 压缩后的文件名

## 2. 打包 SpringBoot 项目

在 `IntelliJ IDEA` 中，点击右侧栏的 `Maven` 展开找到 `Lifecycle`，先双击执行 `clean`，再执行 `package` 进行打包。
当然，你也可以在终端中执行 `mvn clean package` 命令来打包，这和在 `IDEA` 中执行的效果是一样的。

![构建 jar 包](idea.webp)

执行完毕后我们就可以在项目的 `target` 目录下找到打包好的 `jar` 包了。

![找到 jar 包](jar.webp)

## 3. 上传到服务器

现在开始把 数据库备份文件、`jar` 包、图片资源压缩包 上传到服务器上。我是通过 `1Panel` 面板上传的。

你也可以通过 `scp` 命令上传文件到服务器上。

```bash
scp -P 22 /path/to/local/file username@server:/path/to/remote/file
```
- `-P` 指定端口
- `/path/to/local/file` 本地文件路径
- `username` 服务器用户名
- `server` 服务器地址
- `/path/to/remote/file` 服务器文件路径

## 4. 服务器配置

既然要在服务器上运行项目，那么服务器就要安装并配置和本地开发环境一样的运行环境。

### 4.1 安装 Java 环境

值得一提的是 `OpenJDK 21` 正式版于 `2023/09/19` 发布[^1]，距今（`2024/04/17`）已经半年多了。但 Debian 这个老顽固 `stable` 源迟迟未能更新至 `OpenJDK 21`，至今还在 `testing` 源中测试。`stable` 源目前仅提供 `OpenJDK 17`。

![openjdk21 的计划表](openjdk21.webp)

![仍位于 testing 源的 openjdk21](testing.webp)

不禁想起一个笑话：`Debian stable = Debian stale`.[^2]

<br>

为了项目运行，我只能开启 `testing` 源来安装 `OpenJDK 21`.
输入以下命令，修改 `/etc/apt/sources.list` 文件，将 `testing` 加到源中：
```bash
sudo vim /etc/apt/sources.list
```

我们会看到 `bookworm`, `bookworm-security`, `bookworm-updates` 三个源，但只需要修改 `bookworm` 源即可，`bookworm` 是 Debian 12 的开发代号，你可以根据你的系统版本修改。

找到
```bash
deb http://deb.debian.org/debian bookworm main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian bookworm main contrib non-free non-free-firmware
```

在 `bookworm` 前面加上 `testing`，变成：
```bash
deb http://deb.debian.org/debian testing bookworm main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian testing bookworm main contrib non-free non-free-firmware
```

### 4.2 安装 MariaDB 数据库

一开始项目启动时我甚至还忘记装 `mariadb`。一看报错：无法连接数据库数据库，我才想起来。
所以切记要先安装数据库再启动项目。

输入以下命令安装 `mariadb` 数据库：
```bash
sudo apt install mariadb-server
```

### 4.3 配置数据库

输入以下命令配置数据库：
```bash
sudo mariadb-secure-installation
```
这里的具体配置参考我往期文章：[在 Archlinux 上安装使用 MariaDB](https://blog.ovvv.top/posts/53c8336d/#4-%E9%85%8D%E7%BD%AE-MariaDB).

数据库密码注意要修改为 Springboot 项目配置 `application.yml` 中对应的密码。

### 4.3 导入数据库

输入以下命令连接数据库：
```bash
mariadb -u root -p
```

创建数据库，这里的 `database_name` 要和 `application.yml` 中配置的数据库名一致：
```sql
CREATE DATABASE database_name;
```

导入数据库：
```mariadb
use database_name;
source /path/to/bak.sql;
```

### 4.4 解压图片资源

解压我们上传的图片资源到 `application.yml` 配置的路径下：

```bash
tar -xf images.tar.zst -C /path/to/images
```
- `-xf` 解压文件
- `images.tar.zst` 压缩包
- `-C` 指定解压路径

## 5. 启动项目

Springboot 打包好后可以通过 `java -jar xxx.jar` 命令启动项目。但是这样启动的项目会随着终端关闭而停止，所以我们可以通过 `nohup` 命令让项目在后台运行。

输入以下命令启动项目：
```bash
nohup java -jar xxx.jar
```

`nohup` 命令可以让程序在后台运行，不会因为终端关闭而停止。我们还可以通过查看 `nohup.out` 文件来查看程序的输出。

## 6. 反向代理与 SSL 证书申请

我用了 `1Panel` 比较方便地配置了反向代理和申请了 SSL 证书。这里就不过多赘述了。感兴趣的可以看我往期文章：{% post_link 1panel-installation-and-usage-tutorial '1Panel 安装配置教程' %}

反向代理与 SSL 证书申请 配置好后，我们就可以通过域名访问我们的项目了，整个部署流程就结束了。过程虽然不难，但有很多细节需要注意，一不小心就会出错。

## 7. 测试项目

在项目进行本地开发阶段时，务必进行全面的测试，确保各项功能稳定可靠。当项目部署完成后，亦不可掉以轻心，仍需进行相应的测试，以防因环境配置不当（特别是数据库部分）而引发报错。一切准备就绪后，项目就可以正式上线了。

<br><br>

参考资料：
[^1]: https://openjdk.org/projects/jdk/21/#Schedule
[^2]: https://linux.cn/article-13746-1.html
