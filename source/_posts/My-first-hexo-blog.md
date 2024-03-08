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

## Hexo 部署 Github Pages, Github Actions 自动部署

激动的心 颤抖的手，这是本站真正意义上的第一篇博客。第零篇是 hexo 生成的 Hello World。

部署 hexo 的过程中遇到了很多问题，最终还是解决了，这里记录一下。

> 最终实现的效果，一个项目仓库，`main` 分支存放源代码，`gh-pages` 存放生成后的网页代码，github pages 加载 `gh-pages` 的网页代码。
> 这样，每当我们 push 代码到 `main` 分支的时候，github action 会自动构建并将代码发布到 `gh-pages` 分支，github pages 会自动加载 `gh-pages` 分支的代码，这样就实现了自动部署。

环境：

> linux plasma manjaro
> nodejs 20
> git 2.43
> github 账号配置好 ssh（可以参考我前面教程）
> vscode

你需要熟知的技能：git 相关操作



### 1. 新建 `用户名.github.io` 仓库

![gh-create-repo1.webp](gh-create-repo1.webp)

记住这串 `仓库的ssh地址` 后面要用到
![ssh-link.webp](ssh-link.webp)

创建的仓库名 建议为 `用户名.github.io`
![gh-create-repo2.webp](gh-create-repo2.webp)

### 2. 部署你的 ssh 私钥 到仓库变量中

![deploy-key1.webp](deploy-key1.webp)

填入你的私钥 取名为 `KEY`，后面要用到
![deploy-key2.webp](deploy-key2.webp)

### 3. 初始化 hexo 博客目录

找一个空目录 然后执行下面代码，
把 mobeicanyue.github.io 换成你仓库的名字

```bash
hexo init mobeicanyue.github.io && cd mobeicanyue.github.io
```
执行结果如下
![init-hexo.webp](init-hexo.webp)

### 4. 初始化 git 仓库并提交到 github

```bash
git init
git add .
git commit -m "Initial commit"
```
执行结果如下
![init-git.webp](init-git.webp)

把下面 git@xxx 地址换成你`仓库的ssh地址`

```bash
git remote add origin git@github.com:mobeicanyue/mobeicanyue.github.io.git
git push -u origin master
```
执行结果如下
![git-push.webp](git-push.webp)

此时我们刷新一下 github 仓库，就可以看到我们的代码已经提交上去了
但是网页第一次构建肯定是失败的（打叉），因为还没配置 github action

![github-code.webp](github-code.webp)

### 5. 新建 gh-pages 分支并将其设置为 pages 的默认部署分支

点击分支
![new-branch1.webp](new-branch1.webp)
创建 gh-pages 分支
![new-branch2.webp](new-branch2.webp)
设置 gh-pages 为 pages 的默认部署分支
![set-branch.webp](set-branch.webp)


### 6. 编写 github actions 代码

1) 修改 _config.yml 文件的 repo 改成你仓库的 ssh 地址
![config.webp](config.webp)

2) 在 hexo 博客文件夹的 .github 目录创建 deploy.yml 文件

![new-file.webp](new-file.webp)

下面的代码需要修改你的用户名和邮箱
还有你对应的 nodejs 版本

```yml
name: Deploy Hexo
 
on:
  push:
    branches:
      - main
 
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check Out
        uses: actions/checkout@v4
 
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
 
      - name: Setup Git
        run: |
          git config --global user.name "用户名"
          git config --global user.email "邮箱"
 
      - name: Setup SSH Key
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
 
      - name: Install Dependencies
        run: |
          npm install -g hexo-cli
          npm install hexo-deployer-git --save
          npm install
 
      - name: Deploy Hexo
        run: |
          hexo clean
          hexo generate
          hexo deploy
```

上面的`${{ secrets.KEY }}` 就是我们前面设置的私钥

<br>

1) 最后提交代码并推送
![commit-push.webp](commit-push.webp)

### 7. 访问站点，部署成功！
地址为 `https://用户名.github.io`

![success.webp](success.webp)

<br>
<br>

#### 后记
hexo 部署 github pages 的教程特别多，但是质量鱼龙混杂或者写得不清晰，也没有我想要的部署到 github 源代码双分支管理。踩了很多坑，终于是写完了这篇教程，希望能帮到你。