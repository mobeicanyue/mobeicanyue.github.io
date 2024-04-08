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
> (2) 有很多开源组织都提供 OpenJDK。为什么使用 Microsoft OpenJDK 呢？因为我们在 Windows 系统上安装 JDK，~~微软提供的 OpenJDK 与 Windows 系统更加兼容。~~没有人比巨硬更懂 Windows 系统（bushi。


## 1. 下载 Microsoft OpenJDK

浏览器访问 [Microsoft OpenJDK](https://learn.microsoft.com/zh-cn/java/openjdk/download) 下载页面。

![下载 JDK](Download-jdk.webp)

选择 `Windows x64` 版本的 `msi` 安装包下载。

## 2. 安装 Microsoft OpenJDK

打开下载的 `msi` 安装包，点击 `下一步`。

![打开安装包](setup1.webp)

选择配置 `JAVA_HOME` 环境变量，确实比 Oracle JDK 安装包多了这个选项，不用再去手动配置 `JAVA_HOME` 了。

![JAVA_HOME](setup2.webp)

功能调整完毕以后可以选择安装路径。

![配置路径](setup3.webp)


## 3. 验证安装

打开命令行工具，输入 `java -version` 查看版本信息。

```shell
java -version
```

![验证安装](setup4.webp)

总体来说，Microsoft OpenJDK 安装过程比 Oracle JDK 简单很多，并且不用再去手动配置系统环境变量和 `JAVA_HOME` 了，方便用户上手使用。
