---
title: 在 Linux 上安装和配置 GraalVM
tags:
  - Java
  - GraalVM
abbrlink: 526d514a
date: 2024-04-22 07:18:50
---

{% note primary %}
GraalVM 是一个高性能的通用虚拟机，支持 Java、JavaScript、Python、Ruby、R、WebAssembly 等多种语言。通过它你可以将 Java 程序编译成本地二进制文件，大大提高程序的启动速度和运行效率。本文介绍如何在 Linux 系统上安装配置 GraalVM.
{% endnote %}

截止到文章发布时，GraalVM 仍没有在 Debian 和 Archlinux 的官方仓库中发布，不能直接通过包管理器安装，需要我们手动下载。而 GraalVM 的 `Community Edition` 版本，是 GraalVM 的开源版本，与 `OpenJDK` 类似。本文将其作为 GraalVM 演示。

## 1. 下载 GraalVM

访问 [GraalVM Community's builds](https://github.com/graalvm/graalvm-ce-builds/releases/) 下载页面，选择你需要的 JDK 版本。截止到文章发布时，最新的 `JDK LTS` 版本是 `21`.

使用 `wget` 命令下载压缩包，我选择 `GraalVM for JDK 21 Community 21.0.2` 的压缩包下载：
```bash
wget https://github.com/graalvm/graalvm-ce-builds/releases/download/jdk-21.0.2/graalvm-community-jdk-21.0.2_linux-x64_bin.tar.gz
```
如果下载速度过慢可以考虑使用镜像站下载。

## 2. 解压 GraalVM

下载完成后，解压你下载的 GraalVM：
```bash
tar -xvf graalvm-community-jdk-21.0.2_linux-x64_bin.tar.gz
```

将解压出的文件夹重命名为 `java-21-graalvm`：
```bash
mv graalvm-community-openjdk-21.0.2+13.1 java-21-graalvm
```

将 `java-21-graalvm` 移至 `/usr/lib/jvm` 目录：
```bash
sudo mv java-21-graalvm /usr/lib/jvm/
```

## 3. 配置环境变量

编辑 `/etc/profile` 文件，添加 GraalVM 的环境变量。
```bash
sudo vim /etc/profile
```

在文件末尾添加如下内容，将 `GRAALVM_HOME` 和 `JAVA_HOME` 设置为你的 GraalVM 安装路径：
```bash
export GRAALVM_HOME=/usr/lib/jvm/java-21-graalvm
export JAVA_HOME=$GRAALVM_HOME
export PATH=$PATH:$GRAALVM_HOME/bin
```

使配置生效：
```bash
source /etc/profile
```

## 4. 查看 GraalVM 版本

查看 GraalVM 的 `OpenJDK` 和 `native-image` 版本。
```bash
java --version && echo && native-image --version
```

输出如下：
```bash
openjdk 21.0.2 2024-01-16
OpenJDK Runtime Environment GraalVM CE 21.0.2+13.1 (build 21.0.2+13-jvmci-23.1-b30)
OpenJDK 64-Bit Server VM GraalVM CE 21.0.2+13.1 (build 21.0.2+13-jvmci-23.1-b30, mixed mode, sharing)

native-image 21.0.2 2024-01-16
GraalVM Runtime Environment GraalVM CE 21.0.2+13.1 (build 21.0.2+13-jvmci-23.1-b30)
Substrate VM GraalVM CE 21.0.2+13.1 (build 21.0.2+13, serial gc)
```

## 5. 使用 GraalVM 编译 Java 程序

### 5.1 编译 Java 程序
新建一个 Java 文件 `HelloWorld.java`，内容如下：
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, GraalVM!");
    }
}
```
首先使用 `javac` 编译 `Hello.java`，生成 `HelloWorld.class` 文件：
```bash
javac HelloWorld.java
```

然后使用 `native-image` 将 `HelloWorld.class` 文件编译成本地二进制文件：
```bash
native-image HelloWorld
```

执行编译后的二进制文件：
```bash
./helloworld
```
输出 `Hello, GraalVM!` 则表示 GraalVM 安装成功。


### 5.2 编译 SpringBoot 项目

同样的，你也可以对 SpringBoot 项目进行编译，提高启动速度和运行效率。
首先将 SpringBoot 项目打包成 `jar` 文件
- idea 可以点击左侧 `clean` --> `package` 直接打包，
- 或者使用 `maven` 命令打包：
```bash
mvn clean package
```

然后使用 `native-image` 将 `jar` 文件编译成本地二进制文件：
```bash
native-image -jar your-springboot-project.jar
```

执行编译后的二进制文件：
```bash
./your-springboot-project
```

<br><br>

参考文章：
[^1]: https://docs.oracle.com/zh-cn/learn/graalvm-native-image-quick-start/index.html
[^2]: https://www.graalvm.org/jdk21/reference-manual/native-image/overview/Options/
