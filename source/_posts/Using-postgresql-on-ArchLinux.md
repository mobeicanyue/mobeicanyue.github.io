---
title: 在 ArchLinux 上安装使用 PostgreSQL
tags:
  - PostgreSQL
  - 数据库
  - btrfs
abbrlink: d2adab3b
date: 2024-02-29 09:44:23
---

{% note secondary %}
我之前一直使用 `MySQL`，最近才接触 `PostgreSQL`。如果你也是 `PostgreSQL` 的新手，想必也会和我一样在安装使用的时候遇到一些问题（如安装完没有初始化数据库 想启动服务却启动失败等），所以我在这里记录一下我遇到的问题和解决方法。

本文主要介绍如何在 ArchLinux 上安装和使用 `PostgreSQL`。
{% endnote %}


## 0. `btrfs` 文件系统禁用 `COW`

如果你的系统分区为 `ext4`，可以跳过这一小节。

关于 `Copy-on-Write` 特性，可以阅读我的这篇文章 [btrfs 文件系统禁用 COW](https://blog.ovvv.top/posts/53c8336d/#0-btrfs-%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%A6%81%E7%94%A8-COW)

现在我们开始禁用数据库目录的 Copy-on-Write 特性：

{% fold info @在 btrfs 上禁用 COW %}
如果你的 `PostgreSQL` 数据库运行在 `btrfs` 分区之上，你应当在创建数据库之前禁用 `Copy-on-Write` 特性，否则可能会导致性能问题。不应创建数据库之后再禁用，因为这一更改只会影响新创建的文件，而不会影响现有文件。


我们创建一个空目录 `/var/lib/postgres/data`：
```bash
sudo mkdir /var/lib/postgres/data
```
这个目录就是 `PostgreSQL` 数据库的数据目录。

展示目录属性：
```bash
sudo lsattr -d /var/lib/postgres/data
```
输出如下：
```bash
---------------------- /var/lib/postgres/data
```
<br>

现在设置目录不开启 `Copy-on-Write` 特性：
```bash
sudo chattr +C /var/lib/postgres/data/
```
<br>

展示目录属性：
```bash
sudo lsattr -d /var/lib/postgres/data
```
输出如下：
```bash
---------------C------ /var/lib/postgres/data
```

至此，我们已经在 `/var/lib/postgres/data` 目录下禁用了 `Copy-on-Write` 特性。

{% endfold %}


## 1. 安装 `PostgreSQL`
```bash
sudo pacman -S postgresql
```
检查 `Postgresql` 版本
```bash
psql -V
```


## 2. 初始化数据库
`PostgreSQL` 与 `MySQL` 不同，它需要初始化数据库。
<br>
输入以下命令，来进入 `postgres` 用户的 shell `[postgres]$` 中
```bash
sudo -iu postgres
```
执行下面的命令来初始化数据库
```bash
initdb -D /var/lib/postgres/data
```
如果没有报错，可以退出 `postgres` shell。
```bash
exit
```


## 3. 启动 PostgreSQL 服务
输入以下命令来启动 `PostgreSQL` 服务
```bash
sudo systemctl start postgresql
```
确认服务是否启动成功
```bash
sudo systemctl status postgresql
```
如果输出中显示 `Active: active (running)` 就表示服务启动成功了。


## 4. 创建用户和数据库
PostgreSQL 还需要添加一个新的数据库用户。进入 `postgres` shell
```bash
sudo -iu postgres
```
输入以下命令
```bash
createuser --interactive
```
输入要增加的角色名称，新的角色是否是超级用户。

提示：如果创建一个与 Linux 用户名相同的 PostgreSQL 角色/用户，就可以访问 PostgreSQL 数据库 shell，而无需指定用户登录（非常方便）。

## 5. 创建数据库
使用 createdb 命令，创建一个上述用户可以读写的新数据库。
```bash
createdb myDatabaseName
```

## 6. 登录数据库
在 `postgres` shell 中，输入以下命令来登录数据库
```bash
psql
```

`postgres` shell 中，一些常用的命令：

- `\help`：列出所有命令
- `\l`：列出所有数据库
- `\c database`：连接到指定数据库
- `\du`：列出所有用户
- `\dt`：列出当前数据库的所有表
- `\q`：退出数据库


<br>


参考文章：
[^1]: https://wiki.archlinuxcn.org/wiki/PostgreSQL
[^2]: https://gist.github.com/NickMcSweeney/3444ce99209ee9bd9393ae6ab48599d8
