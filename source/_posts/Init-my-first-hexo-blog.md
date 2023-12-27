---
title: 我的第一篇 Hexo 博客
date: 2023-12-26 23:18:38
tags:
- hexo
- github
- github pages
- github actions
- deploy
---

## Hexo 部署 Github Pages, Github Actions 自动部署

激动的心 颤抖的手，这是本站第一篇博客。
部署 hexo 的过程中遇到了很多问题，最终还是解决了，这里记录一下。

> 最终实现的效果，一个项目仓库，main 分支存放源代码，gh-pages 存放生成后的网页代码，github pages 加载 gh-pages 的网页代码。
> 这样，每当我们 push 代码到 main 分支的时候，github action 会自动构建并将代码发布到 gh-pages 分支，github pages 会自动加载 gh-pages 分支的代码，这样就实现了自动部署。

搭建环境：

> linux plasma manjaro
> nodejs 20
> git 2.43
> github 账号配置好 ssh（可以参考我前面教程）
> vscode

你需要熟知的技能：git 相关操作



### 1. 新建 `用户名.github.io` 仓库

![gh-create-repo1.jpg](/images/Init-my-first-hexo-blog/gh-create-repo1.jpg)

记住这串 `仓库的ssh地址` 后面要用到
![ssh-link.jpg](/images/Init-my-first-hexo-blog/ssh-link.jpg)

![gh-create-repo2.jpg](/images/Init-my-first-hexo-blog/gh-create-repo2.jpg)

### 2. 部署你的 ssh 私钥 到仓库变量中

![deploy-key1.jpg](/images/Init-my-first-hexo-blog/deploy-key1.jpg)

填入你的私钥
![deploy-key2.jpg](/images/Init-my-first-hexo-blog/deploy-key2.jpg)

### 3. 初始化 hexo 博客目录

找一个空目录 然后执行下面代码，
把 mobeicanyue.github.io 换成你仓库的名字

```bash
hexo init mobeicanyue.github.io && cd mobeicanyue.github.io
```
执行结果如下
![init-hexo.jpg](/images/Init-my-first-hexo-blog/init-hexo.jpg)

### 4. 初始化 git 仓库并提交到 github

```bash
git init
git add .
git commit -m "Initial commit"
```
执行结果如下
![init-git.jpg](/images/Init-my-first-hexo-blog/init-git.jpg)

把下面 git@xxx 地址换成你仓库的 ssh 地址

```bash
git remote add origin git@github.com:mobeicanyue/mobeicanyue.github.io.git
git push -u origin master
```
执行结果如下
![git-push.jpg](/images/Init-my-first-hexo-blog/git-push.jpg)

此时我们刷新一下 github 仓库，就可以看到我们的代码已经提交上去了
但是网页第一次构建肯定是失败的（打叉），因为还没配置 github action

![github-code.jpg](/images/Init-my-first-hexo-blog/github-code.jpg)

### 5. 新建 gh-pages 分支并将其设置为 pages 的默认部署分支

点击分支
![new-branch1.jpg](/images/Init-my-first-hexo-blog/new-branch1.jpg)
创建 gh-pages 分支
![new-branch2.jpg](/images/Init-my-first-hexo-blog/new-branch2.jpg)
设置 gh-pages 为 pages 的默认部署分支
![set-branch.jpg](/images/Init-my-first-hexo-blog/set-branch.jpg)


### 6. 编写 github actions 代码

1) 修改 _config.yml 文件的 repo 改成你仓库的 ssh 地址
![config.jpg](/images/Init-my-first-hexo-blog/config.jpg)

2) 在 hexo 博客文件夹的 .github 目录创建 deploy.yml 文件

![new-file.jpg](/images/Init-my-first-hexo-blog/new-file.jpg)

下面的代码只需要修改你的用户名和邮箱


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

<br>

3) 最后提交代码并推送
![commit-push.jpg](/images/Init-my-first-hexo-blog/commit-push.jpg)

### 7. 访问站点，部署成功！
地址为 `https://用户名.github.io`

![success.jpg](/images/Init-my-first-hexo-blog/success.jpg)

<br>
<br>

#### 后记
hexo 部署 github pages 的教程特别多，但是质量鱼龙混杂或者写得不清晰，也没有我想要的部署到 github 源代码双分支管理。踩了很多坑，终于是写完了这篇教程，希望能帮到你。