---
title: post_link 的使用
date: 2023-12-28 22:46:11
tags:
---
> 如果使用正常的 `markdown` 语法，会导致目录中的链接无法跳转，所以我使用了 post_link 标签。

<br>

[官方文档](https://hexo.io/zh-cn/docs/tag-plugins#%E5%BC%95%E7%94%A8%E6%96%87%E7%AB%A0)

```markdown
{% post_link filename [title] [escape] %}
```
`使用此标签时可以忽略文章文件所在的路径或者文章的永久链接信息、如语言、日期。`
<br>
我在写目录的时候发现，
如果使用正常的 `markdown` 语法，
```markdown
[博客域名配置](Configure-blog-domain.md)
```
会导致目录中的链接无法跳转（即使两个 markdown 是同路径）。
<br>

报错原因排查：

在我的设想里，点击下面这个链接，应该就跳转到 `Configure-blog-domain.md` 这个文件。实际上 markdown 里面也确实这么做的，因为这就是一个很简单的同路径下的文件跳转。两种写法的对比：
![markdown 写法和 post_link 写法](example.webp)

但是到了 html 里面，情况就截然不同，因为 `hexo` 博客路径是默认带时间的！

html 中的显示：
![html 中的显示](example2.webp)
上面那个代码可以正常访问，但是下面那个就不行了，因为路径不对。
![上面的链接点击](up.webp)
![下面的链接点击](down.webp)
有两个错误：
1. 路径在 `Tutorial-of-Building-a-blog` 下而不是正常的 `日期/无后缀文件名` 下。
2. 链接访问的是 `2023/12/28` 的路径！而我们文件是 `2023/12/27` 写的，所以就就算你解决了后面的那个路径报错，日期问题还是没法解决。hexo 生成静态文件时根本不知道你的文件是哪天写的，所以就会默认使用当前日期。

所以最终的引用解决方案就是 `post_link` 标签。

```markdown
{% post_link 无后缀文章名 文章标题（可选） %}
```
