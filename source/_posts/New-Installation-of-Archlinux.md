---
title: 初来乍到 Archlinux
tags:
  - Archlinux
  - Linux
abbrlink: 22b3d1e2
date: 2024-03-21 06:06:15
---


![Archlinux](Archlinux-logo-standard-version.webp)


{% note info %}
`Archlinux` 是一个以简洁、轻量、灵活、可自定义为设计理念的 `Linux` 发行版，致力于通过 **滚动更新** 来更新系统和软件包。默认安装只有最小的基本系统，由用户自行添加需要的软件，它的安装过程相对于其他发行版来说要复杂一些。

它有社区维护的 [`AUR`（Arch User Repository）](https://aur.archlinux.org)软件仓库，用户可以在这里找到大量的软件包，通过简单的命令即可编译安装。
除此以外，`Archlinux` 还有丰富的[官方文档](https://wiki.archlinux.org)和[庞大的社区](https://bbs.archlinux.org/)，这些资源详细地描述了安装、配置和维护系统的过程，对新手或者有一定 Linux 基础的用户来说都是非常有帮助的。

当然，如果你没有足够的耐心和时间，或者你只是想要一个稳定的系统，并且你没有足够的 `Linux 基础`，那么 `Archlinux` 可能不适合你。
{% endnote %}

本文主要记录了我安装 `Archlinux` 的过程。

众所周知，[Manjaro](https://manjaro.org) 是一个基于 [Archlinux](https://archlinux.org) 的发行版。

我之前久闻 AUR 的大名，决定尝试一下 `Manjaro` 。经过我半年的使用，发现确实很不错，可堪大用，`Manjaro` 开箱即用，内置了很多好用的开源软件，很多系统设置也有对应缺省。开发写代码、日用看视频、写文章等都有不错的体验，除了玩游戏（其实我现在也很少玩游戏了）。

`Manjaro` 对 `Archlinux` 进行了很多魔改。
尽管 Manjaro 使用 pacman 软件包管理器，但它有自己的软件库，如果看镜像源就会发现 Manjaro 的镜像源为 https://mirrors.ustc.edu.cn/manjaro/ 而 Arch 的镜像源为 https://mirrors.ustc.edu.cn/archlinux/ 二者并不完全等价
且 Manjaro 使用 `archlinuxcn` 的软件源经常出现问题，导致我无法安装一些软件，经过询问相关人员得出结论，Manjaro 可以使用大部分 AUR，但是不要使用 `archlinuxcn`。加之 `Manjaro` 的软件源更新太慢了，用户需要等待几周，才可以安装上游的新版本软件。

如此种种致使我想尝试一下原汁原味的 `Archlinux`。

下面简单记录一下我的安装过程，以及一些配置，以备日后查阅。
如果想查看更详细的安装过程，可以参考 [Archlinux 官方文档](https://wiki.archlinux.org/title/Installation_guide)，和这篇教程 [Archlinux 安装教程](https://arch.icekylin.online)。建议两篇文章都看一遍，然后再开始安装。

## 1. 准备工作

### 1.1 确保网络连接

确保你有 `网线` 或者 `非中文名的 wifi` 连接，在安装过程中需要连接网络来下载软件包。

### 1.2 下载 Archlinux 镜像

[官方下载地址](https://archlinux.org/download/)

如果下载太慢考虑使用上面连接的镜像站下载。

如 
`阿里云` 的镜像站：[https://mirrors.aliyun.com/archlinux/iso/latest/](https://mirrors.aliyun.com/archlinux/iso/latest/)
`中科大` 的镜像站：[https://mirrors.ustc.edu.cn/archlinux/iso/latest/](https://mirrors.ustc.edu.cn/archlinux/iso/latest/)
`清华大学` 的镜像站：[https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/)


可选操作：
下载完成后，可以选择校验哈希值来确保镜像文件的完整性，在 [Checksums and signatures
](https://archlinux.org/download/#checksums) 有最新镜像的 `SHA256` 哈希值。

如果你在使用 Linux，可以使用 `sha256sum` 命令来校验哈希值，如：

```bash
sha256sum archlinux-2024.03.01-x86_64.iso
```
将后面的参数替换成你的镜像文件名。

如果你在使用 Windows，可以使用 `certutil` 命令来校验哈希值，如：

```bash
certutil -hashfile archlinux-2024.03.01-x86_64.iso SHA256
```


### 1.3 给你的硬盘分区

给你的硬盘腾出至少 128G 的空间，我分了 300G，看个人需求 尽量分大些免得后期扩容。
如果你使用 Windows 可以直接 右键开始菜单，点 `磁盘管理` 进行分区（压缩卷），或者使用 `DiskGenius` 等工具进行分区。

**还请注意，数据无价！操作需谨慎！**
**在明白你的操作是什么意思之前，不要轻易操作！**


### 1.4 制作启动盘

我建议使用 `Ventoy` 制作启动盘。`Ventoy` 是一个开源的多功能启动盘制作工具，支持直接将 `ISO` 文件拷贝到 `U 盘` 上，然后通过 `UEFI` 或者 `BIOS` 启动。你可以在里面放置多个 `ISO` 文件，然后选择想要的镜像启动。

[Ventoy 官网](https://www.ventoy.net)


### 1.5 重启进入 BIOS，启动 Ventoy

重启电脑，关闭 `Secure Boot`，调整 `Boot Order`，将 `U 盘` 放在第一位，然后保存退出。

这个时候时候你的电脑应该会出现 `Ventoy` 的启动界面。如果没有，请检查你的 `BIOS` 设置是否正确，或者查询 `Ventoy` 的文档：https://www.ventoy.net/cn/doc_news.html

![Ventoy](screen_uefi_cn.webp)

Ventoy 启动后，选择你下载的 Archlinux 镜像文件，然后启动。


## 2. 安装 Archlinux

安装过程其实没什么好说的了，我是参考教程的 [archlinux 基础安装](https://arch.icekylin.online/guide/rookie/basic-install.html) 进行安装的。

注意，安装的时候千万不要跳过、忽略、修改任何步骤（除非你知道你在干什么），否则可能会导致安装失败。如果有不懂的地方要善用搜索引擎。

在操作 `7. 分区和格式化` 的时候切记，如果你是 `Windows + Linux 双系统`，安装的时候 **不要格式化 EFI 分区！** **不要格式化 EFI 分区！** **不要格式化 EFI 分区！**

我在 `9. 安装系统` 时，将 `linux` 内核改为 `linux-lts` 内核，这样可以使用长期支持的内核，稳定性更好。

其他的应该没什么问题，按照教程一步步来，直到安装完成。
至此，你已经安装好了 Archlinux。

输入 `neofetch` 命令，你会看到类似的输出：

![Arch Neofetch](Arch_Linux_Base_Neofetch_output.webp)

> 图片来自：[wikipedia](https://en.m.wikipedia.org/wiki/File:Arch_Linux_Base_Neofetch_output.png)

## 3. 安装桌面环境 KDE

参照上文教程的 `桌面环境与常用应用安装` 一节继续安装。

我做出的修改：
- 不开启 `multilib` 仓库，因为我不想要 32 位的软件。
- 输入法安装：只安装 `fcitx5-im`, `fcitx5-chinese-addons`, 还有 `fcitx5-rime` 输入法引擎 和 `fcitx-configtool`。没有安装 `fcitx5-anthy`, `fcitx5-pinyin-moegirl`, `fcitx5-material-color` 等，因为我不需要。
- `timeshift` 配置的时候记得不要勾选 `@home`，因为 home 目录包含视频、音乐等大文件，且回滚时不需要回滚这些文件。

## 4. 可选配置

我做出的改动：
- 我的命令行美化采用 https://gitee.com/mo2/zsh 的 `powerlevel10k` 主题，非常好看。
- 小组件只安装了 `Netspeed Widget`，其他的都不需要。
![网速组件](net-speed.webp)
- grub 引导界面主题采用了 `darkmatter-grub2-theme`，非常好看。
![Grub](preview-arch.webp)

## 5. 我安装的软件包

### AUR helper
- `yay`：AUR 包管理工具，使用 `go` 语言编写。`archlinuxcn`
- `paru`：AUR 包管理工具，使用 `rust` 语言编写。用法与 `yay` 类似。`archlinuxcn`

### 开发环境
- `gcc`(C/C++), `python`：是 Archlinux 默认内置的，不需要额外安装。`core`
- `jdk17-openjdk`：openjdk 17，Java 开发环境。`extra`
- `nodejs-lts-iron`：Node.js 20，LTS 版本。`extra`
- `npm`, `yarn`, `pnpm`: Node.js 包管理工具。`extra`

### 开发工具
- `visual-studio-code-bin`：伟大，无需多言。`aur`
- `intellij-idea-ultimate-edition`：强大，无需多言。`aur`
- `beekeeper-studio-bin`：数据库管理工具。`aur`
- `hoppscotch-bin`：API 接口调试工具。`aur`

### 实用工具
- `openssh`：SSH 客户端和服务端。`core`
- `flameshot`：Linux 著名的截图工具，非常好用。`extra`
- `wireshark-qt`：网络抓包工具。`extra`
- `kdeconnect`：用于连接手机，可以在电脑上接收手机的通知，发送文件等，神器。`extra`
- `spectacle`：KDE 的截图工具，可以截取当前窗口，全屏，矩形等。但是总体没有 `flameshot` 好用。`extra`
- `kfind`：文件搜索工具，搜索文件很方便。`extra`
- `obs-studio`：开源的录屏软件，非常好用，听说大主播都用这个。`extra`
- `filelight`：图形化界面直观查看磁盘占用情况。`extra`
- `rar`：解压 rar 文件，万恶的 rar 格式。`archlinuxcn`

### 休闲娱乐办公
- `linuxqq`：Linux 上的 QQ 客户端，现在是用 electron 写的，好看。`aur`
- `google-chrome`：谷歌浏览器，`aur`。你也可以选择开源的 `chromium`，`extra`
- `onlyoffice-bin`：开源的办公软件，支持云协作。`aur`
- `wps-office-cn`, `wps-office-mui-zh-cn`：WPS Office，国产办公软件，但是实际使用会出现一些小问题。`aur`
- `okular`：KDE 的 PDF 阅读器。`extra`

### 字体
- `misans`：小米 misans，很好看 适合日用。`aur`
- `ttf-jetbrains-mono-nerd`：JetBrains Mono 字体，适用于终端、代码字体。`extra`


## 6. 我的配置

- 开机自动启动数字键盘：KDE 系统设置 -> 键盘 -> Plasma 启动时 NumLock 状态 -> 开启
- 命令行安装软件包 软件包显示颜色：`sudo vim /etc/pacman.conf`, 取消 `Color` 的注释。
- paru 包序号从最下面开始显示，和 `yay` 一样：`sudo vim /etc/paru.conf`, 取消 `BottomUp` 的注释。
- 下载软件包的时候不附带 debug 包：`sudo vim /etc/makepkg.conf`, 在 `OPTIONS` 的 `debug` 前面加上 `!`。是最近出现的新问题，以前没遇到过。参考：https://bbs.archlinux.org/viewtopic.php?id=293055
- 让 Windows 和 Linux 的时间一致：`timedatectl set-local-rtc 1 --adjust-system-clock`。原理：Windows 会假设硬件时钟就是本地时间（Local Time），即硬件时钟存储的时间是与所在时区相同的时间，如东八区。而 Linux 会假设硬件时钟是协调世界时（UTC）时间。所以在 Linux 下设置硬件时钟为本地时间，Windows 和 Linux 的时间就会一致了。
- `vim ~/.ssh/config`, 创建 ssh 配置文件，配置 github ssh 推送走 443 端口，避免被坤场阻止 22 端口：
  ```config
  Host github.com
    Hostname ssh.github.com
    Port 443
    User git
  ```

## 7. 总结

吐槽一下，Arch 确实用得很清爽，没什么多余的东西。就是安装太折磨人了，我花了一天多才搞明白。`Archinstall` 脚本安装 还安装失败了，我只能手动安装。不过好在手动安装的教程很详细，再加上朋友的帮助，一步步就能搞定。镜像里面自带的 `Archinstall` 还不是最新版（因为有个小依赖 bug 修复，需要 pacman 手动更新）。

这篇文章可能还不太完善，在日后的使用中我会不断完善它。埋个坑
