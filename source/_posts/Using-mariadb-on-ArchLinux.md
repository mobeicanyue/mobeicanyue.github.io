---
title: 在 Archlinux 上安装使用 MariaDB
tags:
  - MariaDB
  - 数据库
  - btrfs
abbrlink: 53c8336d
date: 2024-03-23 03:06:02
---

{% note secondary %}
`MariaDB` 是一个可靠、高性能的数据库，旨在为用户提供长期免费的、向下兼容的、能直接替代 `MySQL` 的数据库服务。

许多 Linux 发行版和 BSD 操作系统都包含 `MariaDB`，并将其作为 `MySQL` 的默认实现。例如 Archlinux、Debian（从 Debian 9 开始）、Fedora（从 Fedora 19 开始）、Red Hat Enterprise Linux（从 RHEL 7 开始）、CentOS（从 CentOS 7 开始）、OpenBSD（从 5.7 开始）和 FreeBSD 等[^1]。

可见开源社区对 `MySQL` 未来发展和开放性的担忧，并且 `MariaDB` 几乎完全兼容 `MySQL`，使用上没有太大区别，可以放心使用。
{% endnote %}


## 0. `btrfs` 文件系统禁用 `COW`

此小节为 `btrfs` 文件系统禁用 `COW`，如果你的系统分区为 `ext4`，可以跳过这一小节。


{% fold info @在 btrfs 上禁用 COW %}
Btrfs（B-tree 文件系统），一种支持写入时复制（COW）的文件系统。
`COW` 简单说就是 写入 `不会就地覆盖数据`；相反，数据块在被复制和修改后会 `写入到新的位置`，元数据也会更新以指向新的位置。

如果你的 `MariaDB` 数据库运行在 `btrfs` 系统分区之上，你应当在创建数据库之前禁用 `Copy-on-Write` 特性[^2]，否则可能会导致数据库性能问题。
不应创建数据库之后再禁用，因为这一更改只会影响新创建的文件，而不会影响现有文件。

---

我们创建一个空目录 `/var/lib/mysql`：
```bash
sudo mkdir /var/lib/mysql
```
这个目录就是 `MariaDB` 数据库的数据目录。

展示目录属性：
```bash
sudo lsattr -d /var/lib/mysql
```
输出如下：
```bash
---------------------- /var/lib/mysql
```
表示 **目录没有设置任何属性**

---

现在设置禁用目录 `Copy-on-Write` 特性：
```bash
sudo chattr +C /var/lib/mysql/
```
<br>

展示目录属性：
```bash
sudo lsattr -d /var/lib/mysql
```
输出如下：
```bash
---------------C------ /var/lib/mysql
```
`C` 表示 `关闭 Copy-on-Write` 特性[^3]。
至此，我们已经在 `/var/lib/mysql` 目录下禁用了 `Copy-on-Write` 特性。

{% endfold %}


## 1. 安装 MariaDB

输入以下命令来安装 `MariaDB`：
```bash
sudo pacman -S mariadb
```

## 2. 初始化数据库

根据安装提示，我们在使用前还需初始化数据库：
```bash
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```

`--user=mysql` 表示使用 `mysql` 用户来初始化数据库，`--basedir=/usr` 表示 `MariaDB` 的安装目录，`--datadir=/var/lib/mysql` 表示数据库的数据目录。

我们可以在输出中看到：
```bash
Two all-privilege accounts were created.
One is root@localhost, it has no password, but you need to
be system 'root' user to connect. Use, for example, sudo mysql
The second is mysql@localhost, it has no password either, but
you need to be the system 'mysql' user to connect.
After connecting you can set the password, if you would need to be
able to connect as any of these users with a password and without sudo
```

翻译：
> 创建了两个全权限账户。
  一个是 `root@localhost`，它没有密码，但需要系统 "root" 用户才能连接。例如，使用 sudo mysql。
  第二个是 `mysql@localhost`，它也没有密码，但你必须是系统 "mysql" 用户才能连接。
连接后，如果您需要能够 以任何这些用户身份使用密码 且无需 sudo 进行连接，则可以设置密码。


## 3. 启动 MariaDB 服务
输入以下命令来启动 `MariaDB` 服务：
```bash
sudo systemctl start mariadb
```
确认服务是否启动成功
```bash
sudo systemctl status mariadb
```
如果输出中显示 `Active: active (running)` 就表示服务启动成功了。


## 4. 配置 MariaDB

根据 Archwiki 的建议：
> The `mariadb-secure-installation` command will interactively guide you through a number of recommended security measures, such as removing anonymous accounts and removing the test database:


所以我们可以运行 `mariadb-secure-installation` 来进行安全配置：
```bash
sudo mariadb-secure-installation
```

```bash
In order to log into MariaDB to secure it, we'll need the current
password for the root user. If you've just installed MariaDB, and
haven't set the root password yet, you should just press enter here.

Enter current password for root (enter for none):
```
这里我们直接回车，因为我们还没有设置密码。
<br>

```bash
Setting the root password or using the unix_socket ensures that nobody
can log into the MariaDB root user without the proper authorisation.

You already have your root account protected, so you can safely answer 'n'.

Switch to unix_socket authentication [Y/n]
```
这里我们选择 `n`，因为它说 `You already have your root account protected, so you can safely answer 'n'`，我们已经保护了 root 账户，所以可以安全地选择 `n`。
<br>

```bash
You already have your root account protected, so you can safely answer 'n'.

Change the root password? [Y/n]
```
`Change the root password? [Y/n]` 这一步询问你是否要更改 MariaDB 的 root 用户的密码。如果你想更改密码，就输入 "Y"，然后按回车键，系统会提示你输入新的密码。如果你不想更改密码，就输入 "n"，然后按回车键，系统会跳过更改密码的步骤。

**我建议你设置密码**，因为后面会使用到 `mariadb -u root -p` 来登录数据库，如果不设置会报错，只能用 `sudo mariadb` 来登录。
<br>

```bash
By default, a MariaDB installation has an anonymous user, allowing anyone
to log into MariaDB without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n]
```
这里我们选择 `Y`，因为这是一个安全措施，我们应该删除匿名用户。
<br>

```bash
Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n]
```
选择 `Y`，因为我们不希望 root 用户远程登录。可以配置反向代理或者 SSH 隧道来访问数据库。
<br>

```bash
By default, MariaDB comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n]
```
这里我选择 `Y`，不需要 `test` 数据库。
<br>

```bash
 - Dropping test database...
 ... Success!
 - Removing privileges on test database...
 ... Success!

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n]
```
这里我们选择 `Y`，重新加载权限表。
<br>

```bash
All done!  If you've completed all of the above steps, your MariaDB
installation should now be secure.

Thanks for using MariaDB!
```

至此，我们已经完成了 MariaDB 的安全配置。


## 5. 使用 MariaDB

### 5.1 常用命令

启动 MariaDB 服务并设置服务开机自启：
```bash
sudo systemctl enable --now mariadb
```
查看 MariaDB 服务状态：
```bash
sudo systemctl status mariadb
```
更新 MariaDB：
```bash
sudo pacman -Syu mariadb
```

<br>

启动 MariaDB 服务：
```bash
sudo systemctl start mariadb
```
停止 MariaDB 服务：
```bash
sudo systemctl stop mariadb
```
重启 MariaDB 服务：
```bash
sudo systemctl restart mariadb
```

<br>

开机启动 MariaDB 服务：
```bash
sudo systemctl enable mariadb
```
禁用 MariaDB 服务开机自启：
```bash
sudo systemctl disable mariadb
```

### 5.2 登录 MariaDB
```bash
sudo mariadb
```

或者
```bash
sudo mariadb -u root -p
```

如果这里报错：`ERROR 1698 (28000): Access denied for user 'root'@'localhost'`，那么你需要使用 `sudo mariadb` 来登录，或者重新运行 `sudo mariadb-secure-installation` 来设置密码。

### 5.3 查看数据库
```sql
SHOW DATABASES;
```

命令行会输出：
```bash
MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.001 sec)
```

现在，你可以开始使用 `MariaDB` 了。`MariaDB` 默认只提供命令行工具，你也可以使用 `beekeeper-studio` 或者 `navicat` 等图形化工具来管理数据库，增删改查非常方便。

### 5.4 数据库升级

Arch 是一个更新比较激进的发行版，我们有时候更新后会看见 `MariaDB` 的提示：
```bash
:: MariaDB was updated to a new feature release. To update the data run:
     # systemctl restart mariadb.service && mariadb-upgrade -u root -p
```

这时候我们就需要运行如下命令来升级数据库：
```bash
sudo systemctl restart mariadb && sudo mariadb-upgrade -u root -p
```

比如我在写这篇文章的时候，`MariaDB` 从 `11.3.2-MariaDB` 升级到了 `11.4.2-MariaDB`，就运行了这个命令来升级数据库。`Major version upgrade detected from 11.3.2-MariaDB to 11.4.2-MariaDB. Check required!`


参考文章：
[^1]: https://en.wikipedia.org/wiki/MariaDB#Prominent_users
[^2]: https://wiki.archlinux.org/title/MariaDB
[^3]: https://man.archlinux.org/man/chattr.1
