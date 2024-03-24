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
`MariaDB` 是一个可靠的、高性能的、功能全面的数据库，旨在为用户提供长期免费、向下兼容能直接替代 `MySQL` 的数据库服务。
自 2013 年起，`MariaDB` 就被 Arch Linux 当作官方默认的 `MySQL` 实现。
`MySQL` 也在 `Debian 9` 中被 `MariaDB` 取代。
由此可见 `MariaDB` 体现了开源社区对 `MySQL` 的担忧，并且 `MariaDB` 几乎完全兼容 `MySQL`，所以使用上几乎没有区别，可以放心地使用。
{% endnote %}

## 0. `btrfs` 文件系统禁用 `COW`

如果你的系统分区为 `ext4`，可以跳过这一小节。

{% fold info @Copy-on-Write 讲解 %}
如果数据库 (位于 `/var/lib/mysql`) 运行在 `Btrfs` 分区之上，你应当在创建数据库之前禁用 `Copy-on-Write` 特性。 —— ArchWiki[^1]

可参考 wikipedia 的 [Copy-on-Write](https://en.wikipedia.org/wiki/Copy-on-write) 概念 

`COW` 简单说就是 写入 `不会就地覆盖数据`；相反，数据块在被复制和修改后会 `写入到新的位置`，元数据也会更新以指向新的位置。

也就是说，当数据需要频繁地写入数据库时，这种特性会引发性能问题。所以在 `btrfs` 文件系统上使用 `MariaDB` 时，需要禁用 `Copy-on-Write` 特性。

使用下面命令来列出目录的属性：
```bash
sudo lsattr -d /your/path
```
如果输出如下：
```bash
---------------------- /your/path
```
则表示目录没有设置任何属性（`C` 表示关闭 `Copy-on-Write` 特性）。

使用下面命令来关闭目录的 `Copy-on-Write` 特性：
```bash
sudo chattr +C /your/path
```

再次输出目录的属性
```bash
sudo lsattr -d /your/path
```
如果输出如下：
```bash
---------------C------ /your/path
```
表示设置成功，`C` 表示 `关闭 Copy-on-Write` 特性。[^2]
{% endfold %}

现在我们开始在 btrfs 上禁用 Copy-on-Write 特性：

{% fold info @在 btrfs 上禁用 COW %}
如果你的 `MariaDB` 数据库运行在 `btrfs` 分区之上，你应当在创建数据库之前禁用 `Copy-on-Write` 特性，否则可能会导致性能问题。不应创建数据库之后再禁用，因为这一更改只会影响新创建的文件，而不会影响现有文件。


我们创建一个空目录 `/var/lib/mysql`：
```bash
sudo mkdir /var/lib/mysql
```
这个目录就是 `MariaDB` 数据库的数据目录。

展示目录属性：
```bash
sudo lsattr -d /var/lib/mysql
---------------------- /var/lib/mysql
```

现在设置目录不开启 `Copy-on-Write` 特性：
```bash
sudo chattr +C /var/lib/mysql/
```
展示目录属性：
```bash
sudo lsattr -d /var/lib/mysql
---------------C------ /var/lib/mysql
```

至此，我们已经在 `/var/lib/mysql` 目录下禁用了 `Copy-on-Write` 特性。

{% endfold %}


## 1. 安装 MariaDB

### 1.1 安装 MariaDB
```bash
sudo pacman -S mariadb
```

我们在安装信息中可以看到：
```bash
:: You need to initialize the MariaDB data directory prior to starting
   the service. This can be done with mariadb-install-db command, e.g.:
     # mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```

### 1.2 初始化数据库
所以我们需要初始化数据库：
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


### 1.3 启动 MariaDB 服务
```bash
sudo systemctl start mariadb
```
如果没有输出，表示启动成功。


## 2. 配置 MariaDB

根据 Archwiki 的建议：
> The mariadb-secure-installation command will interactively guide you through a number of recommended security measures, such as removing anonymous accounts and removing the test database:


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


## 3. 使用 MariaDB

### 3.1 登录 MariaDB
```bash
sudo mariadb
```

或者
```bash
sudo mariadb -u root -p
```

如果这里报错：`ERROR 1698 (28000): Access denied for user 'root'@'localhost'`，那么你需要使用 `sudo mariadb` 来登录，或者重新运行 `sudo mariadb-secure-installation` 来设置密码。

### 3.2 查看数据库
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


参考文章：
[^1]: https://wiki.archlinux.org/title/MariaDB
[^2]: https://man.archlinux.org/man/chattr.1
