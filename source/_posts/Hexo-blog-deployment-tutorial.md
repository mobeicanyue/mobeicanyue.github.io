---
title: Hexo 博客部署教程
tags:
  - Hexo
  - Github
  - Github-Pages
  - Github-Actions
  - 部署
abbrlink: 7a862802
date: 2023-12-26 23:18:38
---
> Hexo 是一个快速、简洁且高效的博客框架。本文旨在记录 Hexo 博客部署到 Github Pages 的过程，以及 Github Actions 自动部署的过程。

本文环境：

> Nodejs 20
> Git 2.44

本文最终实现成果：一个项目仓库，`main` 分支存放源代码，`gh-pages` 存放生成后的网页代码。每当我们 push 代码到 `main` 分支的时候，Github Actions 会自动构建并将代码发布到 `gh-pages` 分支，Github Pages 会自动加载 `gh-pages` 分支的代码，这样就实现了博客自动化部署。

注意：本文会用 `用户名` 来指代 Github 用户名，你需要将 `用户名` 替换为你的 Github 用户名。如 `用户名.github.io` 替换为 `zhangsan.github.io`。


## 0. 开发环境准备

### 0.1 开发工具

在开始之前，你需要安装好 Nodejs 和 Git。

如果你是 Linux / Mac 用户，那么通过发行版的 **包管理器** 即可安装。

如果你是 Windows 用户，那么可以通过 [Nodejs 官网](https://nodejs.org/en/download) 下载安装 Nodejs，Git 可以通过 [Git 官网](https://git-scm.com/downloads) 下载安装。


安装完毕后，输入以下命令检验是否安装成功：
```bash
node -v
npm -v
git -v
```

### 0.2 配置 Git

如果你是第一次使用 Git，那么你可能需要配置用户名和邮箱：
```bash
git config --global user.name "用户名"
git config --global user.email 邮箱
```

执行以下命令检验是否配置成功：
```bash
git config --global --list
```

### 0.3 配置 Github SSH

#### 生成 SSH 密钥

输入以下命令来生成 SSH 密钥，将示例中使用的电子邮件替换为 GitHub 电子邮件地址：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
遇到提示信息可以一路回车。

现在你已经生成了 SSH 密钥对，你可以在 `~/.ssh` 目录或者你指定的目录下找到你的密钥对。

#### 将 SSH 密钥添加到 Github

浏览器打开 Github，点击个人头像 --> 点击 `设置` --> 点击左边导航栏的 `SSH and GPG keys` --> 点击靠近右上角的 `New SSH key`。

`Key type` 选择 `Authentication Key`，随便起一个 Tittle，复制你刚刚生成的 `id_ed25519.pub` 内容到 `Key` 中，点击 `Add SSH key` 保存。

![将 SSH 密钥添加到 Github](image1.png)


## 1. 安装 Hexo

打开系统终端，输入以下命令安装 Hexo：
```bash
npm install hexo-cli -g
```
Linux 可能需要 sudo 权限来执行上述命令。

安装完毕后，输入以下命令检验是否安装成功：
```bash
hexo -v
```

## 2. 新建 Github 仓库

点击 Github 首页左导航栏的 `New` 按钮，新建一个仓库，仓库名建议为 `用户名.github.io`。将 `用户名` 替换为你的 Github 用户名。

![新建仓库](image.png)

然后点击 `Create repository` 按钮，完成仓库的创建。

## 3. 初始化 Hexo 博客目录

找一个空目录，执行以下命令。将 `用户名` 替换为你的 Github 用户名：
```bash
hexo init 用户名.github.io && cd 用户名.github.io
```

## 4. 将 Git 项目初始化并推送到 Github

我们首先初始化 Git 仓库并创建 `gh-pages` 分支：
```bash
git init
git add .
git commit -m "Initial commit"
git branch gh-pages
```

将本地仓库与 Github 仓库关联并推送到 Github：
```bash
git remote add origin git@github.com:用户名/用户名.github.io.git
git push -u origin main gh-pages
```
此时，我们访问我们的 Github 仓库可以发现代码已经成功上传到 Github 了。


## 5. 配置 Github Pages

点击仓库的 `Settings`，点击左边导航栏的 `Pages`。选择 `Branch` 的 `gh-pages` 分支，点击 `Save` 保存。
![选择部署分支](image2.png)

## 6. 编写 Github Actions 配置文件

在本地已有的项目下 新建一个目录为 `.github/workflows/deploy.yml` 的文件。

`deploy.yml` 文件内容如下：
```yml
name: Deploy Hexo

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Check Out
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 用于获取提交记录，获取文件更新时间

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: |
          npm install

      # https://github.com/zhullyb/zhullyb.github.io/blob/master/.github/workflows/deploy.yml
      # 修复 hexo 生成的文件更新时间 为当前时间，实际应为提交时间
      - name: Fix File Updated Date
        run: |
          git ls-files | while read filepath; do touch -d "$(git log -1 --format='@%ct' $filepath)" "$filepath" && echo "Fixed: $filepath"; done

      - name: Build Site
        run: |
          export TZ='Asia/Shanghai'
          npm run clean
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: public
```

然后将其推送到 Github：
```bash
git add .
git commit -m "Add deploy.yml"
git push
```

耐心等待 Github Actions 的构建

## 7. 查看博客

浏览器访问 [https://用户名.github.io/](https://用户名.github.io/)

即可查看到你的博客

![博客首页](image3.png)

