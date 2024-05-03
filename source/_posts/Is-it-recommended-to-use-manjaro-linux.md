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

> Manjaro 是基于 Archlinux 的 Linux 发行版，注重用户友好性和易用性。它采用滚动发布更新模式，使用 pacman 作为软件包管理器。
> 
> 笔者使用了约一年的 Manjaro，{% post_link New-Installation-of-Archlinux '不久前转为 Archlinux' %}。那么，我是否推荐使用 Manjaro Linux 呢？本文将对 Manjaro Linux 的优缺点进行分析，帮助你决定是否使用 Manjaro Linux。

在本文开始之前，我们得先明确自己对操作系统的**需求**。手机圈里有一句话，我想放到这里也合适：`抛开价格谈产品都是耍流氓` —— 价格对手机配置、性能有最直观的影响，光吹旗舰手机的配置、性能并将其与中低端机型相比是没有意义的，不同的价格会带来不同的体验。

在本文我将 `价格` 类比为 `需求`：**用户对操作系统的需求不同，那么适合的操作系统也不尽相同。** 什么样的需求就促使你做出什么样的选择，这是最重要的。

- 如果你不喜欢折腾，因为厌倦了 Windows 的各种毛病而想尝试 Linux，只是想用个稳定的操作系统。那么 Manjaro Linux 可能是一个不错的选择。它提供了很多缺省的配置和软件包，让你可以快速上手。
- 如果你是一个喜欢折腾、喜欢自定义操作系统的人，那么 Archlinux 可能更适合你，这种方式更加灵活，但是也需要你有一定的 Linux 使用经验。

二者在我眼里都是优秀的 Linux 发行版，只是二者的目标用户群体不同。基于此，我们来探讨一下 Manjaro Linux 与 Archlinux 的差异及优缺点。

## 1. Manjaro Linux 与 Archlinux 的差异

### 1.1 软件源及发行周期

首先，尽管 Manjaro 使用 pacman 软件包管理器，但 Manjaro 有自己的软件源，不直接使用 Archlinux 的软件源，并且早已不与 Arch 兼容。

![Manjaro 测试 Arch Linux 软件包的稳定性 [^1]](https://pic1.zhimg.com/80/v2-922990bf36b2a74ebfdce17f13fdab0c_1440w.webp)

其次，Manjaro Linux 虽然也和 Archlinux 一样采用滚动发布更新模式，但是 Manjaro Linux 会对软件包进行测试、修改等。因此，Manjaro Linux 的软件包更新周期会比 Archlinux 的更新周期慢一些以保证稳定性，周期大概是 1-2 周甚至更久。

### 1.2 Manjaro wiki 和 Arch wiki

Archlinux 以其详细的文档 Arch wiki 著称，是 Archlinux 用户的宝库。虽然 Manjaro 基于 Archlinux，但是 Manjaro 对 Archlinux 进行了许多修改，Arch wiki 并不完全适用于 Manjaro。因此，我推荐你在遇到问题时，首先查看 Manjaro wiki。

### 1.3 ArchlinuxCN 并不适用于 Manjaro

> Arch Linux 中文社区仓库是由 Arch Linux 中文社区驱动的非官方软件仓库，包含许多官方仓库未提供的额外的软件包，以及已有软件的 git 版本等变种。一部分软件包的打包脚本来源于 AUR，但也有许多包与 AUR 不一样[^2]。

ArchlinuxCN 上放的都是二进制的软件包，很多时候并不适合 Manjaro。Manjaro 对系统的某些修改，会导致软件包无法正常运行（比如 nekoray）。因此，我建议你在使用 Manjaro 时，不要添加 ArchlinuxCN 仓库。

AUR 通常可以正常使用，因为 AUR 是下载源码到本地进行编译安装的（除非碰到需要某些依赖等问题）。

## 2. Manjaro Linux 的优缺点

正如我上文提到的，**用户对操作系统的需求不同，那么适合的操作系统也不尽相同。** 

下面谈到的优缺点同样对于不同的用户同样有不同的取舍与选择。

### 2.1 优点

根据我用了一年多的 Manjaro Linux 的体验，我认为 Manjaro Linux 的优点有：

- **继承了一些 Archlinux 的优点**：Manjaro Linux 继承了一些 Archlinux 的优点，比如滚动发布更新模式、AUR 等。
- **易用性**：Manjaro Linux 提供了很多缺省的配置和软件包，很多东西都是开箱即用的。对于新手和不想折腾的 Linux 用户来说，Manjaro Linux 是一个不错的选择。
- **稳定性**：Manjaro Linux 一个可以明显感知的优点就是它的稳定性。我用了一年多的 Manjaro Linux，没遇到过滚挂的情况，系统也没什么大毛病，相当适合养老。

### 2.2 缺点

Manjaro 的不足也是相对应的：

- **软件包更新周期慢**：Manjaro Linux 会对软件包进行测试、修改等，因此软件包更新周期会比 Archlinux 的更新周期慢。这对于追求新功能的用户来说可能不太合适。
- **魔改 Archlinux**：Manjaro Linux 对 Archlinux 进行了许多修改，因此 Archlinux 的一些文档、软件包等并不适用于 Manjaro。
- **自定义性差**：Manjaro Linux 隐藏了系统的复杂性，这意味着你不能像 Archlinux 那样自如地自定义系统，并且有些功能你可能并不需要。如果你喜欢折腾，Manjaro Linux 可能不太适合你。
- **无法使用 ArchlinuxCN 仓库**：对我个人来说，这是我切换到 Archlinux 的原因之一。

### 2.3 总结

总的来说，Manjaro Linux 是一个注重用户友好性和易用性的 Linux 发行版，软件包更新周期慢、魔改 Archlinux、自定义性差等等对于那些追求稳定的用户来说可能并不是缺点。

如果你是一个喜欢折腾、喜欢自定义操作系统的人，那么 Archlinux 可能更适合你。Archlinux 虽然安装上比较繁琐，但这是自由对等的代价，你可以更加灵活地自定义系统。

## 3. EndeavourOS

![EndeavourOS](https://pic4.zhimg.com/80/v2-d8dee0d2a1833f0b3cd35ca09bdc091f_1440w.webp)

如果你想体验更加原汁原味的 Archlinux，但又不想折腾，那么 EndeavourOS 可能是一个不错的选择。EndeavourOS 是一个基于 Archlinux 的 Linux 发行版，它提供了一个图形化的安装程序，让你可以快速安装 Archlinux。EndeavourOS 保持了 Archlinux 的原汁原味，但是提供了一些额外的工具和软件包，让你可以更加方便地使用 Arch。

**EndeavourOS 没有自己的软件源。它依赖于 Arch Linux 的主软件源**，因此使用 EndeavourOS 可以获得最 `纯粹` 的 Archlinux 体验[^1]。


<br><br>

参考资料：
[^1]: https://itsfoss.com/endeavouros-vs-manjaro/
[^2]: https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/
