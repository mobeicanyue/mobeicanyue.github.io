---
title: Manjaro Linux 值得推荐使用吗？有何优缺点？
tags:
  - Linux
  - Manjaro-Linux
  - Archlinux
abbrlink: f0c7a71a
date: 2024-05-03 13:58:25
---

![Manjaro](https://pic1.zhimg.com/80/v2-bbe860b20d0a54a003a27483ca8071b8_1440w.webp)

> Manjaro 是基于 Archlinux 的 Linux 发行版，注重用户友好性和易用性。它采用滚动发布更新模式，使用 pacman 作为软件包管理器。关于它的争议也不在少数：喜欢它的觉得它是一个稳定好上手的操作系统，不喜欢它的觉得它破坏了很多上游的东西。
> 
> 笔者使用了约一年的 Manjaro，不久前转为 Archlinux：{% post_link New-Installation-of-Archlinux '初来乍到 Archlinux' %}。那么，Manjaro Linux 值得推荐使用吗？有何优缺点？本文将探讨这些问题，帮助你做出决策。

在本文开始之前，我们得先明确自己对操作系统的需求。**用户对操作系统的需求不同，那么适合的操作系统也不尽相同。** 什么样的**需求**就促使你做出什么样的**选择**，不是所有的人都喜欢稳定，也不是所有的人都喜欢折腾。

- 如果你不喜欢折腾，只是想用个稳定的操作系统，因为厌倦了 Windows 的各种毛病而想尝试 Linux。那么 Manjaro Linux 可能是一个不错的选择。它提供了很多缺省的配置和软件包，让你可以快速上手。
- 如果你是一个喜欢折腾、喜欢自定义操作系统的人，那么 Archlinux 可能更适合你，这种方式更加灵活，但是也需要你有一定的 Linux 使用经验。

二者在我眼里都是优秀的 Linux 发行版，只是二者的目标用户群体不同。基于此，我们来探讨一下 Manjaro Linux 与 Archlinux 的差异及优缺点。

## 1. Manjaro 简介

Manjaro 是基于 Archlinux 的操作系统发行版，以其简单、用户友好且开箱即用而备受欢迎，提供多种流行的桌面环境，如 XFCE、KDE、GNOME。

Manjaro 采用滚动式更新模式，这意味着系统会持续接收最新的软件更新，长期保持系统处于最新状态，无需重新安装整个操作系统。还预置了许多开箱即用的软件包，让用户可以快速上手。

## 2. Manjaro Linux 与 Archlinux 的差异

Manjaro 是 Manjaro，Archlinux 是 Archlinux，二者虽然有很多相似之处，但却早有天壤之别。下面简单介绍一下二者之间的差异。

### 2.1 软件源及发行周期

首先，尽管 Manjaro 使用 pacman 软件包管理器，但 Manjaro 有自己的软件源，不直接使用 Archlinux 的软件源，并且早已不与 Arch 兼容。

![Manjaro 测试 Arch Linux 软件包的稳定性 [^1]](https://pic1.zhimg.com/80/v2-922990bf36b2a74ebfdce17f13fdab0c_1440w.webp)

其次，Manjaro Linux 虽然也和 Archlinux 一样采用滚动发布更新模式，但是 Manjaro Linux 会对软件包进行测试、修改等。因此，Manjaro Linux 的软件包更新周期会比 Archlinux 的更新周期慢一些以保证稳定性，周期大概是 1-2 周甚至更久。

### 2.2 Manjaro 和 Arch 的文档和问题解决

Archlinux 以其详细的文档 Arch wiki 著称，是 Archlinux 用户的宝库。Manjaro 和 Arch 是两个不同的发行版，Arch wiki 并不完全适用于 Manjaro。

很多 Manjaro 的问题，也不能用 Arch 的解决方案解决，因此，我推荐你在遇到问题时，优先查看 Manjaro 的 wiki 和到 Manjaro 的论坛寻找解决方案。

### 2.3 ArchlinuxCN 并不适用于 Manjaro

> Arch Linux 中文社区仓库是由 Arch Linux 中文社区驱动的非官方软件仓库，包含许多官方仓库未提供的额外的软件包，以及已有软件的 git 版本等变种。一部分软件包的打包脚本来源于 AUR，但也有许多包与 AUR 不一样[^2]。

ArchlinuxCN 上放的都是二进制的软件包，很多时候并不适合 Manjaro。Manjaro 对系统的某些修改，会导致软件包无法正常运行（比如 nekoray）。因此，我建议你在使用 Manjaro 时，不要添加 ArchlinuxCN 仓库。

AUR 通常可以正常使用，因为 AUR 是下载源码到本地进行编译安装的（除非碰到需要某些依赖等问题）。

## 3. Manjaro Linux 的优缺点

正如上文提到的，**用户对操作系统的需求不同，那么适合的操作系统也不尽相同。** 

下面谈到的优缺点同样对于不同的用户同样有不同的取舍与选择。

### 3.1 优点

根据我用了一年多的 Manjaro Linux 的体验，我认为 Manjaro Linux 的优点有：

- **继承了一些 Archlinux 的优点**：Manjaro Linux 继承了一些 Archlinux 的优点，比如滚动发布更新模式、AUR 等。
- **易用性**：Manjaro Linux 提供了很多缺省的配置和软件包，很多东西都是开箱即用的。对于新手和不想折腾的 Linux 用户来说，Manjaro Linux 是一个不错的选择。
- **稳定性**：Manjaro Linux 一个可以明显感知的优点就是它的稳定性。我用了一年多的 Manjaro Linux，没遇到过滚挂的情况，系统也没什么大毛病，相当适合养老。

### 3.2 缺点

Manjaro 的不足也是相对应的：

- **软件包更新周期慢**：Manjaro Linux 会对软件包进行测试、修改等，因此软件包更新周期会比 Archlinux 的更新周期慢。这对于追求新功能的用户来说可能不太合适。
- **魔改 Archlinux**：Manjaro Linux 对 Archlinux 进行了许多修改，因此 Archlinux 的一些文档、软件包等并不适用于 Manjaro。
- **自定义性不高**：Manjaro Linux 隐藏了系统的复杂性，这意味着你不能像 Archlinux 那样自如地自定义系统。如果你喜欢折腾，Manjaro Linux 可能不太适合你。
- **无法使用 ArchlinuxCN 仓库**：对我个人来说，这是我切换到 Archlinux 的原因之一。

### 3.3 总结

总的来说，Manjaro Linux 是一个注重用户友好性和易用性的 Linux 发行版，如果你喜欢的是开箱即用的配置和滚动更新，那么选择 Manjaro 是很合理的。

如果你是一个喜欢折腾、喜欢自定义操作系统的人，那么 Archlinux 可能更适合你。Archlinux 虽然安装上比较繁琐，但这是自由对等的代价，你可以更加灵活地自定义系统。

## 4. EndeavourOS

![EndeavourOS](https://pic4.zhimg.com/80/v2-d8dee0d2a1833f0b3cd35ca09bdc091f_1440w.webp)

如果你想体验更加原汁原味的 Archlinux，但又不想折腾，那么 EndeavourOS 可能是一个不错的选择。EndeavourOS 是一个基于 Archlinux 的 Linux 发行版，它提供了一个图形化的安装程序，让你可以快速安装 Archlinux。EndeavourOS 保持了 Archlinux 的原汁原味，但是提供了一些额外的工具和软件包，让你可以更加方便地使用 Arch。

**EndeavourOS 没有自己的软件源。它依赖于 Arch Linux 的主软件源**，因此使用 EndeavourOS 可以获得最 `纯粹` 的 Archlinux 体验[^1]。


<br><br>

参考资料：
[^1]: https://itsfoss.com/endeavouros-vs-manjaro/
[^2]: https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/
