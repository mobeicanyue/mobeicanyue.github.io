---
title: 启用资源文件夹
abbrlink: 9b9e473f
date: 2023-12-29 00:00:12
tags:
- 优化
---
### 前言
之前就苦于 Hexo 每次写一篇新文章就要去 `source/images` 里面新建一个文件夹，然后把图片放进去，再在文章里面引用。这样很麻烦，而且每次都要手动去 `source/images` 里面新建文件夹，很容易出错。

### 探索
现在我们可以通过启用资源文件夹来解决这个问题。

`
当资源文件管理功能打开后，Hexo 将会在你每一次通过 "hexo new xxx" 命令创建新文章时自动创建一个同名文件夹。将所有与文章有关的资源放在这个关联文件夹中之后，就可以通过相对路径来引用它们，这样我们就得到了一个更简单而且方便得多的管理方式。
`

但是这种方式还要用这种语法来引用图片：
```
{% asset_img 1.webp [title]%}
```
asset_img 是固定值，1.webp 是图片名，title 是图片的标题，可以省略。

如果用正常的 markdown 语法一样引用图片，就无法正常显示。😅😅😅
```markdown
![test](Enable-asset-folder/test.webp)
```
![test](test.webp)

### 解决办法
在 `_config.yml` 中找到 `post_asset_folder` 这一项，将其设置为 `true`，然后添加下面的 `marked`，这样就可以正常引用图片了。
```yml
post_asset_folder: true
marked:
  prependRoot: true
  postAsset: true
```
每次新建文章的时候，Hexo 就会自动在 `source/_posts` 下创建一个同名文件夹，我们只需要把图片放进去，然后在文章中引用就可以了。

现在我们的引用方式就可以像这样了：
```markdown
![refer](refer.webp)
```
![refer](refer.webp)
`直接引用图片，不需要加任何前缀！！！！！`
![对比](compare.webp)
以前图片的路径总是`一大串长长的一行多`，现在这样就可以节省一大段空间，对写作也更加友好了。
