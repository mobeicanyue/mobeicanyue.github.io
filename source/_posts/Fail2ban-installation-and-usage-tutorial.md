---
title: Fail2ban 安装使用教程
abbrlink: 1acd162e
date: 2024-02-19 12:06:33
tags:
  - 运维
  - 服务器
  - 部署
  - Fail2ban
---

![Fail2ban](fail2ban.webp)

> Fail2Ban 是一个入侵检测系统框架，它可以监控服务器的日志文件，当发现有暴力破解行为时，会自动封禁攻击者的 IP 地址。可以保护电脑服务器免受暴力破解。它用 Python 编写。能够在具有本地安装的数据包控制系统或防火墙（如 iptables）接口的 POSIX 系统上运行。

## 1. 安装 Fail2ban

以 Debian/Ubuntu 为例，使用以下命令安装 Fail2ban：
```bash
sudo apt update
sudo apt install fail2ban
```

需要特别注意的是，Debian 12 及以上的版本需要手动安装 `rsyslog` 来保证其正常运行：
```bash
sudo apt install rsyslog
```
原因见：https://github.com/fail2ban/fail2ban/issues/3292

## 2. 启动 Fail2ban

```bash
sudo systemctl start fail2ban
```

## 3. 设置 Fail2ban 开机自启

```bash
sudo systemctl enable fail2ban
```

## 4. 查看 Fail2ban 状态

```bash
sudo systemctl status fail2ban
```

## 5. 配置 Fail2ban

编辑 /etc/fail2ban/jail.local 文件：
```bash
sudo vim /etc/fail2ban/jail.local
```

在文件中输入以下内容：
```
[DEFAULT]
bantime = 600
findtime = 300
maxretry = 3

[sshd]
ignoreip = 127.0.0.1/8
enabled = true
filter = sshd
bantime = 600
findtime = 300
maxretry = 2
port = 22
logpath = /var/log/auth.log
```

可以根据自己的需求进行修改。
其中：
- `bantime`：封禁时间，单位为秒。-1 表示永久封禁。
- `findtime`：检测时间，单位为秒。如果在这个时间内有超过 `maxretry` 次的尝试，就会被封禁，如 300 秒内有 5 次尝试失败就会被封禁。
- `maxretry`：最大尝试次数。
- `ignoreip`：不会被封禁的 IP 地址列表。
- `filter`：指定用于匹配日志的过滤器，这里使用了 sshd 过滤器，用于匹配 SSH 登录日志。

修改完成后 保存并退出编辑器，重启 Fail2ban 服务：
```bash
sudo systemctl restart fail2ban
```

## 6. 常用命令

- 查看所有被封禁的 IP 地址：
```bash
sudo fail2ban-client status
```

- 解封 IP 地址：
```bash
sudo fail2ban-client set sshd unbanip 6.6.6.6
```


<br><br>


参考文章：
- https://1panel.cn/docs/user_manual/toolbox/fail2ban/
- https://its.pku.edu.cn/faq_fail2ban.jsp
- https://aws.amazon.com/cn/blogs/china/open-source-tool-to-protect-ec2-instances-fail2ban/
- https://www.myfreax.com/install-configure-fail2ban-on-ubuntu-20-04/
