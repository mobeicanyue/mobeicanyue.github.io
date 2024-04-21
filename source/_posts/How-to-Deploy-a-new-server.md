---
title: 从零开始部署服务器和网站
sticky: 102
tags:
  - 部署
  - 运维
  - 服务器
  - Linux
  - SSH
  - ufw
  - Fail2ban
  - 安全
abbrlink: 4cde56ee
date: 2024-03-01 22:25:20
---

{% note secondary %}
我自己部署了不少服务器，现在有了一定的经验，写下本文来记录一下自己在部署服务器时的一些操作及注意事项来备忘。

我曾经也是一个新手，在部署服务器的时候遇到很多问题，不管屏幕前的你是出于何种目的：比如有业务搭建的需要；还是初入运维的小白；或者只是单纯的想折腾。我希望这篇文章大部分人看完后都能有所收获。

本文将会介绍如何部署一台新的服务器。本文 4～7 节内容是关于服务器的安全配置，如果你只是想要部署一个简单的网站，阅读前 3 节即可。
{% endnote %}

## 0. 基础的 Web 知识

在开始之前，我们得先了解一些基础的 Web 知识。有了这些知识，我们才能更好地理解服务器的操作及其使用。如果你已经了解了这些知识，可以直接跳到下一节。

### 0.1 什么是服务器？

在开始使用之前，我们得先搞懂什么是服务器。

**服务器是一种专门为网络服务而设计的专用计算机，其主要功能是为用户提供计算或应用服务。**如网站、数据库、电子邮件、文件存储等等。

而服务器分为 `独立服务器` 和 `虚拟服务器`，它们是有区别的。

- `独立服务器` 是指一台物理服务器只提供给一个用户使用，核数多、性能高、稳定性好。但是 `价格往往相当昂贵`，适合大企业使用，如果我们只是搭建一个小型网站就相当不划算。

- `虚拟服务器` 是指一台物理服务器上划分出多个虚拟服务器，每个虚拟服务器都有自己的操作系统、磁盘、内存、CPU 等资源，但是它们共享物理服务器的资源。但是 `价格也相对便宜`，适合个人或小型企业使用。

本文所说的服务器就是指 `虚拟服务器`，也就是我们常说的云服务器、云主机，属于 IaaS（基础设施即服务）。我们如果要部署一个网站，就需要一个云服务器。

而云服务器提供商有很多，比如阿里云、腾讯云、华为云、亚马逊云等等。

![阿里云的 ECS 简介](p470846.webp)

而其价格根据配置、地区、带宽等也有所不同，我们可以根据自己的需求来选择。

![腾讯轻量云活动](tencent-cloud.webp)

需要特别注意的是，如果你购买的服务器在中国内地（大陆），必须完成 ICP 备案才可对外提供服务。备案是什么以及如何备案，就不在本文讨论范围内了。

#### 0.1.1 如何选择服务器系统？

可选的服务器系统，主要有 `Windows` 和 `Linux` 两种。

我们一般选择 Linux 作为服务器系统，因为 Linux 有很多优点，比如稳定、安全、开源、免费等等，最重要的是高度可自定义，不会给你塞一些不想要的牛皮癣功能。

而在 Linux 中，又有很多发行版，比如 Ubuntu、CentOS（近几年争议较多 不建议选择）、Debian、Fedora 等等。本文选择 **`Debian`** 作为演示，它是是最受欢迎的 Linux 发行版之一 Ubuntu 的上游，是一个非常稳定和可靠的操作系统，也通常被认为比 Ubuntu 更轻量级，因为它不包含太多附加的软件。

### 0.2 什么是域名及 DNS？

购买了一台服务器之后，服务器供应商 会提供给我们服务器的 IP 地址如 `8.8.8.8`，我们可以通过这个 IP 地址来访问我们的服务器。

但是 IP 地址是一串数字，不方便记忆，并且后期如果更换服务器，IP 地址也会随之变化，这就会导致我们的网站无法访问。所以我们需要一个域名替代 IP 地址来访问我们的服务器，让用户更方便地访问我们的网站。

域名就是我们常说的网址，比如 `qq.com`、`baidu.com`、`google.com` 等等。

> 域名是由一串用点分隔的字符组成的互联网上某一台计算机或计算机组的名称，用于在数据传输时标识计算机的电子方位。域名可以说是一个 IP 地址的代称，目的是为了便于记忆后者。—— wikipedia

而 DNS（Domain Name System）是一个分布式数据库，用于存储域名和 IP 地址之间的映射关系。当我们在浏览器中输入一个域名时，浏览器会向 DNS 服务器查询域名对应的 IP 地址，然后再通过这个 IP 地址来访问服务器。

![DNS 查询过程](dns-lookup.webp)

**将我们的域名解析到服务器的 IP 地址，就可以通过域名来访问我们的服务器了。**域名注册商一般都会提供 DNS 服务，我们可以在域名注册商的控制台中进行域名解析。

![域名解析](resolve.webp)

你可以选择国内外的知名域名注册商，比如阿里云、腾讯云、GoDaddy、Namecheap、Dynadot 等等。不推荐使用白嫖的域名 —— 因为你的域名所有权得不到保障。


## 1. 连接服务器

现在假设你已经在服务器提供商那里购买了一台服务器，那么它会给你提供服务器的 `IP 地址` 以及 `root 用户密码`。接下来我们开始连接服务器。

### 1.1 使用 SSH 连接服务器

> SSH（Secure Shell）是一种加密的网络传输协议，可在不安全的网络中为网络服务提供安全的传输环境。Win10/11 和 Linux 发行版，应该都有预装 openssh，如果没有可以搜一下安装教程

我们可以使用 SSH 客户端连接服务器，然后在服务器上执行命令。打开系统的命令行终端，输入以下命令：

```bash
ssh root@<服务器 IP 地址>
```

如果能连接到服务器，会输出以下信息：
```bash
ssh root@x.x.x.x
The authenticity of host 'x.x.x.x (x.x.x.x)' can't be established.
ED25519 key fingerprint is SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxx.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'x.x.x.x' (ED25519) to the list of known hosts.
root@x.x.x.x's password:
```
这段输出的意思是，无法验证服务器的真实性，是否继续连接。
输入 `yes` 然后 `输入服务器的密码` 即可连接到服务器。**这段真实性验证只会出现一次，以后再连接服务器就不会再出现了。**

需要注意的是，**输入 SSH 密码时，屏幕上不会显示密码**，不用担心，将服务器的密码正确粘贴后回车即可。

现在你已经连接到服务器了，可以在服务器上执行命令了。如果连接过程出现报错，请按照报错信息进行排查。

## 2. 设置服务器时区

设置服务器的时区是非常重要的，因为服务器的时间会影响到很多服务的正常运行。比如日志记录、定时任务、证书有效期、数据库时间等等。

### 2.1 查看当前时区

```bash
timedatectl
```

你的输出有可能为：

```bash
               Local time: Tue 2024-03-05 05:39:46 UTC
           Universal time: Tue 2024-03-05 05:39:46 UTC
                 RTC time: Tue 2024-03-05 05:39:50
                Time zone: UTC (UTC, +0000)
System clock synchronized: no
              NTP service: active
          RTC in local TZ: no
```
这代表你的服务器的时区是 UTC 时间，而 UTC 时间是世界标准时间，也就是 0 时区。而 `System clock synchronized: no` 代表你的系统时钟同步没有开启。

### 2.2 设置服务器时区

根据你的服务器所在地区设置时区，输入以下命令来查看可用的时区：
```bash
sudo timedatectl list-timezones
```

比如我的服务器在香港，那么我就设置为 `Asia/Hong_Kong`。

```bash
sudo timedatectl set-timezone Asia/Hong_Kong
```

然后再次查看时区：

```bash
timedatectl
```
如果显示为 `Time zone: Asia/Hong_Kong`，那么就说明时区设置成功了。

### 2.3 系统时钟同步
网络时间协议 NTP（Network Time Protocol）是一种用于同步系统时钟的协议，提供高精准度的时间校正，保证服务器的时间准确。

> 根据操作系统版本的不同，Debian 提供了多种安装 NTP 客户端的软件包。自 Debian 12 起，默认的 NTP 客户端是 systemd 的 systemd-timesyncd。[^2]timesyncd 是轻量级 ntpd 的替代品，配置更简单、更高效、更安全。此外，Timesyncd 还能更好地与 systemd 集成。这一特性使得使用 systemd 命令进行管理变得更容易。[^3]


{% fold info @Debian 12 %}

如果你是 Debian 12，那么你可以使用 `systemd-timesyncd` 来同步服务器时间。
输入以下命令来安装 `systemd-timesyncd`：
```bash
sudo apt install systemd-timesyncd
```

查看 `systemd-timesyncd` 的状态：
```bash
sudo systemctl status systemd-timesyncd
```

如果 `systemd-timesyncd` 是 `active (running)` 状态，那么就说明 `systemd-timesyncd` 已经在运行了。否则，你需要手动启动 `systemd-timesyncd`：
```bash
sudo systemctl start systemd-timesyncd
```

这时你的服务器的时间就会自动同步了。
{% endfold %}

{% fold info @Debian 11 及更早版本 %}

如果你是 Debian 11 或更早的版本，那么你可以使用 `ntp` 来同步服务器时间。

输入以下命令来安装 `ntp`：
```bash
sudo apt install ntp
```

查看 `ntp` 的状态：
```bash
sudo systemctl status ntp
```

如果 `ntp` 是 `active (running)` 状态，那么就说明 `ntp` 已经在运行了。否则，你需要手动启动 `ntp`：
```bash
sudo systemctl start ntp
```

这时你的服务器的时间就会自动同步了。
{% endfold %}


再次查看时区：
```bash
timedatectl
```
如果显示为 `System clock synchronized: yes`，那么就说明系统时钟同步成功了。


## 3. 安装 Web 服务器

`Nginx` 与 `Caddy` 是两个优秀的 Web 服务器，它们都是开源的免费的，功能强大，而且易于配置。我们可以选择其中一个来作为我们的 Web 服务器。

其中 `Nginx` 是市场占有量最高的 Web 服务器，没有之一。如果你是运维或者开发人员，那么我相信你多多少少一定会接触到 Nginx 的相关操作，建议还是学习一下相关的知识。

但如果你是小白或者想寻找`Nginx`的替代品，那么可以尝试一下 `Caddy`。`Caddy` 提供了简单易用的配置和自动提供 HTTPS 等功能，使得搭建和管理网站变得更加轻松。


### 3.1 Nginx 安装与使用

可以参考我的文章：{% post_link Nginx-installation-and-usage-tutorial 'Nginx 安装与使用教程' %}
里面涉及 Nginx 的安装、配置、虚拟主机配置、反向代理配置等等。建议花时间阅读一下，对你的服务器操作和理解会有帮助。

### 3.2 Caddy 安装与使用

可以参考我的文章：{% post_link Caddy-installation-and-usage-tutorial 'Caddy 安装与使用教程' %}
现代化的 Web 服务器，具有自动 HTTPS、HTTP/3、反向代理、负载均衡、静态文件服务等功能。如果你想寻找 Nginx 的替代品或者是小白，那么可以尝试一下 Caddy。


## 4. SSH 安全配置

### 4.1 修改 SSH 端口

SSH 端口默认是 22，如果看过 SSH 登陆日志 你应该会发现，你的 SSH 每天都会被 **来自全球各地的大量的暴力破解** 密码尝试。这些攻击者会尝试使用常见的用户名和密码来登录你的服务器，如果你的密码不够复杂，那么你的服务器很有可能会被攻破。改变 SSH 端口理论上可以减少九成九以上的暴力破解尝试。

所以，修改 SSH 端口是非常有必要的。我们可以将 SSH 端口修改为一个不常用的端口，比如 2222。
在服务器上编辑 SSH 配置文件：
```bash
sudo vim /etc/ssh/sshd_config
```

找到 `Port 22` 这一行，将 22 改为 2222。

```bash
Port 2222
```
保存并退出配置文件。

然后重启 SSH 服务：

```bash
sudo systemctl restart sshd
```

现在你就可以使用新的端口来连接服务器了：

```bash
ssh root@<服务器 IP 地址> -p 2222
```

### 4.2 改用 SSH 密钥登录

SSH 密钥登录是一种更加安全的登录方式，它不需要输入密码，而是通过密钥对来进行验证。这样就可以避免密码被暴力破解。

SSH 密钥加密原理是使用非对称加密算法，原理如下[^1]：
![非对称加密算法](asymmetric-encryption.webp)

密钥对分为公钥和私钥，公钥存放在服务器上，私钥存放在本地。当我们使用 SSH 密钥登录时，本地的私钥会与服务器上的公钥进行匹配，如果匹配成功，就可以登录到服务器。

#### 4.2.1 生成 SSH 密钥对

在本地终端输入以下命令，粘贴以下文本，将示例中使用的电子邮件替换为你的电子邮件地址。：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

系统会提示你输入一个文件名，这个文件名是用来保存你的密钥对的，可以按 Enter 键接受默认文件位置。如果你已经有了 SSH 密钥对，可以选择覆盖或者使用新的文件名。
```bash
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/user/.ssh/id_ed25519):
```

然后系统会提示你输入一个密码，这个密码是用来保护你的私钥的，如果你不想输入密码，可以直接按 Enter 键跳过。
```bash
Enter passphrase (empty for no passphrase): 
Enter same passphrase again:
```

现在你已经生成了 SSH 密钥对，你可以在 `~/.ssh` 目录或者你指定的目录下找到你的密钥对。

#### 4.2.2 将公钥添加到服务器

现在你需要将你的公钥添加到服务器上，这样你就可以使用私钥登录服务器了。

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub root@<服务器 IP 地址> -p 2222
```
注意，这里的 
`-i` 参数是用来指定你的公钥文件的，如果你的公钥文件名不是 `id_ed25519.pub`，那么你需要将其替换为你的公钥文件名。
`-p 2222` 是用来指定 SSH 端口的，如果你的 SSH 端口不是 2222，那么你需要将其替换为你的 SSH 端口。

如果没有报错，那么你的公钥已经成功添加到服务器上了。

#### 4.2.3 修改服务器 SSH 配置文件

现在你需要修改服务器的 SSH 配置文件，使得服务器可以使用密钥对登录。
```bash
sudo vim /etc/ssh/sshd_config
```

找到 `PubkeyAuthentication` 这一行，将 `no` 改为 `yes` 或取消注释。
```bash
PubkeyAuthentication yes
```

保存并退出配置文件。

然后测试一下是否可以使用密钥对登录服务器：
```bash
ssh root@<服务器 IP 地址> -p 2222 -i ~/.ssh/id_ed25519
```
如果你成功登录到服务器，那么你的密钥对已经登录成功了。


现在你可以禁用密码登录，使得服务器更加安全：
```bash
sudo vim /etc/ssh/sshd_config
```

找到 `PasswordAuthentication` 这一行，将 `yes` 改为 `no`。
```bash
PasswordAuthentication no
```

保存并退出配置文件。

测试一下是否可以使用密码登录服务器：
```bash
ssh root@<服务器 IP 地址> -p 2222
```

如果你不能登录到服务器，那么你的密码登录已经被禁用了。
如果还是可以登录到服务器，那么你需要检查一下你的配置文件是否正确。或者 `/etc/ssh/sshd_config.d/*.conf` 中是否有其他配置文件覆盖了你的配置。


## 5. 配置防火墙

### 5.1 防火墙简介

防火墙是一种网络安全程序，用于监控和控制网络流量。它可以根据预定义的安全规则来阻止或允许流量通过。防火墙可以保护你的服务器免受来自互联网的恶意攻击。

### 5.2 防火墙的选择

RedHat/CentOS 系统可以选择 `firewalld` 防火墙，而 Debian/Ubuntu 系统可以选择 `ufw` 防火墙。

本文使用的是 Debian 系统，所以我们可以选择 `ufw` 防火墙。

### 5.3 安装 ufw

```bash
sudo apt update
sudo apt install ufw
```

### 5.4 启用 ufw

注意，在启用 UFW 防火墙之前，你必须显式允许进来的 SSH 连接。SSH 可能是你操作机器的唯一渠道，如果被防火墙拦住，将永远都无法连接到机器上，可能就得重置服务器了。

输入以下命令放开 SSH 端口：
```bash
sudo ufw allow 2222/tcp
```

SSH 默认为 22 端口，如果 SSH 运行在非标准端口，你需要将上述命令中的 2222 端口替换为对应的 SSH 端口。本文为 2222 端口

你还可以放开其他端口，比如 HTTP 端口 80、HTTPS 端口 443：
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

输入以下命令启用 ufw：
```bash
sudo ufw enable
```

## 6. 服务器禁用 ping

如果你不希望别人通过 ping 来探测你的服务器，可以禁用 ping。实测禁用 ping 以后，服务器就基本没有遭受 SSH 暴力破解的尝试了。

在 `/etc/sysctl.conf` 文件中添加以下内容：
```bash
net/ipv4/icmp_echo_ignore_all=1
```

然后重新加载配置文件：
```bash
sudo sysctl -p
```

## 7. 配置 Fail2ban
可以参考我的文章：{% post_link Fail2ban-installation-and-usage-tutorial 'Fail2ban 安装使用教程' %}

Fail2Ban 是一个入侵检测系统框架，它可以监控服务器的日志文件，当发现有暴力破解行为时，会自动封禁攻击者的 IP 地址。可以保护电脑服务器免受暴力破解。它用 Python 编写。能够在具有本地安装的数据包控制系统或防火墙（如 iptables）接口的 POSIX 系统上运行。


<br><br><br>


[^1]: https://help.aliyun.com/zh/ecs/ssh-service-introduction
[^2]: https://wiki.debian.org/DateTime
[^3]: https://phoenixnap.com/kb/debian-time-sync
