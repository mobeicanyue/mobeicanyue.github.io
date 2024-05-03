---
title: Windows 安装 Java — Microsoft OpenJDK
tags:
  - Java
  - JDK
abbrlink: '7e833387'
date: 2024-04-08 23:46:34
---

> 本文介绍如何在 Windows 系统上安装 Microsoft OpenJDK。也就是微软提供的 OpenJDK 版本。
> 
> (1) 为什么不使用 Oracle JDK 呢？因为 Oracle JDK 是商用协议，收费商用政策朝令夕改。而 OpenJDK 是开源免费的，是 Linux 发行版仓库中的默认 JDK。
> 
> (2) 有很多开源组织都提供 OpenJDK。为什么使用 Microsoft OpenJDK 呢？因为我们在 Windows 系统上安装 JDK，~~微软提供的 OpenJDK 与 Windows 系统更加兼容。~~没有人比巨硬更懂 Windows（bushi。


## 1. 下载 Microsoft OpenJDK

浏览器访问 [Microsoft OpenJDK](https://learn.microsoft.com/zh-cn/java/openjdk/download) 下载页面。

![下载 JDK](https://pic2.zhimg.com/80/v2-448eebb5cf154774a0e13ec84f0d728d_1440w.webp)

选择 `Windows x64` 版本的 `msi` 安装包下载。

## 2. 安装 Microsoft OpenJDK

打开下载的 `msi` 安装包，点击 `下一步`。

![打开安装包](https://pic4.zhimg.com/80/v2-023c05365fc09a59c2d380bcfc7f3843_1440w.webp)

选择配置 `JAVA_HOME` 环境变量，相较于 Oracle JDK 的安装包多了这个选项，不用再去手动配置 `JAVA_HOME` 了。

![JAVA_HOME](https://pic3.zhimg.com/80/v2-6e72e861b8c74fe567f9253db08eb526_1440w.webp)

功能调整完毕以后可以选择安装路径。

![配置路径](https://pic1.zhimg.com/80/v2-0fcf57f849c74b0df0996924e500d794_1440w.webp)


## 3. 验证安装

打开命令行工具，输入 `java -version` 查看版本信息。

```shell
java -version
```

![验证安装](https://pic3.zhimg.com/80/v2-30b70bcac8f5c9166a7ce8bebe1fd696_1440w.webp)

总体来说，Microsoft OpenJDK 安装过程比 Oracle JDK 简单很多，并且不用再去手动配置系统环境变量和 `JAVA_HOME` 了，方便用户上手使用。
