---
title: 如何为 Linux 寻找免驱的外接无线网卡
tags:
  - Linux
abbrlink: 8c24de48
date: 2024-07-01 00:21:51
---

{% note info %}
一台正常的笔记本基本上都会自带 WIFI 网卡，不需要额外的操作即可连接使用 WIFI. 

但是如果你**笔记本的无线网卡的天线坏了，修复起来可能会非常麻烦**。
参见我的文章：https://blog.ovvv.top/posts/1c33c3c7/ ，我在更换网卡的时候，不小心将天线的金属扣给按扁了 无法再按回去，导致无线信号极差。

我的笔记本的天线 是焊接在笔记本电脑的屏幕后面的金属壳板上的，维修更换天线需要拆掉屏幕和笔记本的转轴，自己弄显然太冒险了（至少我没这个胆），而官方直营点的售后报价是（材料费 400 + 人工费 100 多），连他们售后都不建议换，推荐我直接外接个网卡就行。
{% endnote %}

我是 Win + Linux 双持用户，在寻找外接网卡时，不仅要考虑性能宽带和支持 WIFI 协议等等，系统免驱也是我一个重要的考量因素，**系统固件内置支持比手动安装更省事、放心**。

Win 自不必说，市面上的网卡几乎都是默认兼容的，不做 Win 生态的适配基本上是放弃大部分用户了。所以我们将重点移向 Linux.

首先给一个结论，不要在淘宝上用关键词搜索什么 `外接网卡 Linux 免驱` 之类的，没什么用，海报不一定写，问客服还不一定知道。下面推荐两种寻找方式：

## 1. 查看 morrownr/USB-WiFi 仓库

推荐看：https://github.com/morrownr/USB-WiFi/blob/main/home/USB_WiFi_Adapters_that_are_supported_with_Linux_in-kernel_drivers.md

这个仓库列举了 `支持 Linux 内核驱动程序的 USB WiFi 适配器`，我们可以在其中寻找适合我们的无线网卡。建议快捷键 `CTRL + F` 在网页上搜索。

**协议**：WIFI 7 在今年 2024 年推出，WIFI 6 在 2019 年推出。我推荐无线网卡的协议至少支持 WIFI 6，新的协议能够提供更大的带宽，更快的速度和更低的延迟。当然还需要路由器支持 WIFI 6。WIFI6 的 IEEE 标准为 802.11ax，所以在搜索的时候可以带上 AX 或者 WIFI6 来查看对应路由器。

**芯片**：根据网上口碑和仓库作者的描述，Realtek 网卡芯片不如 Mediatek（就是安卓手机芯片我们熟知的发哥），最好避免使用基于 Realtek 芯片的网卡，所以 有发哥选发哥。

## 2. 直接查看 Linux 内核对芯片的支持

上述的仓库毕竟是用户整理的，可能会出现遗漏。

我们还可以先在淘宝上搜索网卡，看看它的芯片在不在 Linux Wireless drivers 支持列表里，再决定是否购买：https://wireless.wiki.kernel.org/en/users/drivers

比如 Linux Wireless drivers 中支持的发哥芯片列表：
![发哥芯片](https://pica.zhimg.com/80/v2-0abcbc913a3aa0a6a8a228208401ffbe_1440w.webp)

## 3. 我的选择

我优先考虑支持 WIFI 6 协议的网卡，所以搜索 `AX` 关键词

`EDUP EP-AX1672` 虽然是 AX3000，但淘宝 119 感觉有点贵，且其天线太长不优雅（深圳的公司在淘宝居然没有店，离谱）。

`Netgear A8000` 淘宝 800+ 劝退

`ALFA` 湾湾的公司，感觉也不便宜

最后选择了 `Fenvi FU-AX1800`，小而美、支持 WIFI6、便宜（淘宝 65），最重要的是它在淘宝有旗舰店，不是小作坊，买得放心。

![仓库贴的图](https://picx.zhimg.com/80/v2-ea16261fb0b08d34e893b293b053687a_1440w.webp)

买回来插在我的笔记本上确实是即插即用的，注意要直接插到笔记本的 USB 口，不要插在拓展坞的 USB 口。

命令行输入 `nmcli device`

会看到多出来名叫 `wlp3s0f3u2` 的设备，笔记本默认的无线设备叫 `wlp1s0`，同一个 WIFI 会有设备后缀的区分

![wifi 根据设备区分](https://picx.zhimg.com/80/v2-b94fc9eb9d14797f918587eda0c1ab04_1440w.png)
