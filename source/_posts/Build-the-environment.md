---
title: Hexo 环境搭建
abbrlink: dc0bbd22
date: 2023-12-28 19:08:02
tags:
- hexo
---

我是 `Linux` 操作系统 `Manjaro` 分支，所以文章着重介绍 `Linux` 下的环境搭建。
`Windows` 下的环境搭建有不小的差异，但是原理是一样的。

### 1. 检查 Git 环境

-  `Linux` 大多数发行版都默认安装了 Git，所以我们只需要检查一下 Git 版本。
    ```bash
    git --version
    ```
    输出如下内容。
    ```bash
    git version 2.43.0
    ```
- `Windows` 下的 安装 Git 可以参考 [Git 官网](https://git-scm.com/downloads)，或者搜索教程。

### 2. 安装 Node.js 和 npm

npm 的依赖项就是 nodejs。所以安装 npm, nodejs 会一起被安装。

-   `Debian` 系安装 npm 和 nodejs

    ```bash
    sudo apt install npm
    ```
    检验版本
    ```bash
    node -v
    npm -v
    ```

<br>

-   `ArchLinux` 系安装 npm 和 nodejs

    ```bash
    sudo pacman -S npm
    ```
    检验版本
    ```bash
    node -v
    npm -v
    ```

-   `Windows` 下的 安装 Node.js 和 npm 可以参考 [Node.js 官网](https://nodejs.org/en/download/)，或者搜索教程。

     和上面一样，安装完毕后检验版本。

记住上面的 nodejs 的版本号，后面会用到。

### 3. 安装 Hexo

注：如果是 `Windows` 系统，需要空白处单击鼠标右键，选择“Git Bash Here”输入以下命令。

Linux 系统直接打开终端输入即可。
```bash
npm install hexo-cli -g
```
安装完毕后，输入以下命令检验是否安装成功。
```bash
hexo -v
```
如果没有报错而是输出版本号，就说明安装成功了。
反之则根据报错信息进行排查。

