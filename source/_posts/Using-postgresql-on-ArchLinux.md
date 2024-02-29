---
title: 在 ArchLinux 上安装使用 PostgreSQL
tags:
  - PostgreSQL
  - 数据库
abbrlink: d2adab3b
date: 2024-02-29 09:44:23
---

> 本文主要介绍如何在 ArchLinux 上安装和使用 `PostgreSQL`。
>
> 我之前一直使用 `MySQL`，最近才接触 `PostgreSQL`。如果你也是 `PostgreSQL` 的新手，想必也会和我一样在安装使用的时候遇到一些问题（如安装了没有初始化数据库 启动失败等），所以我在这里记录一下我遇到的问题和解决方法。


1. 安装 `PostgreSQL`
```bash
sudo pacman -S postgresql
```
检查 `Postgresql` 版本
```bash
psql -V
```


2. 初始化数据库
`PostgreSQL` 与 `MySQL` 不同，它需要初始化数据库。
输入以下命令。
```bash
sudo -iu postgres
```
这时候你会进入到 `postgres` 用户的 shell `[postgres]$` 中，执行下面的命令
```bash
initdb -D /var/lib/postgres/data
```
如果没有报错，可以退出 `postgres` shell。
```bash
exit
``` 


3. 启动 PostgreSQL 服务
```bash
sudo systemctl start postgresql
```
确认服务是否启动成功
```bash
sudo systemctl status postgresql
```
如果显示 `active (running)` 就表示服务启动成功了。


4. 创建用户和数据库
PostgreSQL 还需要添加一个新的数据库用户。进入 `postgres` shell
```bash
sudo -iu postgres
```
输入以下命令
```bash
createuser --interactive
```
输入要增加的角色名称，新的角色是否是超级用户。
提示：如果创建一个与 Linux 用户名相同的 PostgreSQL 角色/用户，就可以访问 PostgreSQL 数据库 shell，而无需指定用户登录（这非常方便）。

5. 创建数据库
使用 createdb 命令，创建一个上述用户可以读写的新数据库。
```bash
createdb myDatabaseName
```

6. 登录数据库
在 `postgres` shell 中，输入以下命令来登录数据库
```bash
psql
```

`postgres` shell 中，一些常用的命令：
```bash
\help # 列出所有命令
\l # 列出所有数据库
\c database # 连接到指定数据库
\du # 列出所有用户
\dt # 列出当前数据库的所有表
\q # 退出数据库
```

<br>


参考文章：
[^1]: https://wiki.archlinuxcn.org/wiki/PostgreSQL
[^2]: https://gist.github.com/NickMcSweeney/3444ce99209ee9bd9393ae6ab48599d8
