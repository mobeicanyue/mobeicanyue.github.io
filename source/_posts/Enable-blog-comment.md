---
title: 启用博客评论
abbrlink: 7671c28e
date: 2023-12-29 16:39:46
tags:
  - Giscus
---

{% note secondary %}
我认为评论功能是一个博客不可或缺的组成部分，作者可以通过评论获得读者反馈，比如说我文章哪里写错了或者哪里需要更新，而读者也可以通过评论与作者交流。

又由于我 Hexo 部署的是 GitHub Pages 静态博客网页，依靠后端的评论系统不现实。所以我考虑依靠 Github 自带的 Issues 或者 Discussions 评论系统来实现评论功能。

{% endnote %}

Fluid 主题支持三种基于 GitHub 的评论系统，分别是：`Gitalk` `Utterances` `Giscus`，前两者基于 Issues，后者基于 Discussions。我选择 Discussions，因为我觉得 Discussions 更适合评论，Issues 更适合提 BUG 或需求。

在配置完成后，`giscus` 加载时，会使用 GitHub Discussions 搜索 API 根据选定的映射方式（如 URL、pathname、title 等）来查找与当前页面关联的 discussion。如果找不到匹配的 discussion，giscus bot 就会在第一次有人留下评论或回应时自动创建一个 discussion。这样你的博客读者 登陆 Github 即可对文章评论了。


### 1. 配置 Giscus

[Giscus 配置页](https://giscus.app/zh-CN)

往下滑动，来到仓库这个选项，填入你的 GitHub 仓库地址。
![填入你的仓库 url](configure1.webp)

可以看到报错了，这是因为我们还没有满足开启 Giscus 的条件

```
选择 giscus 连接到的仓库。请确保：

1. 该仓库是公开的，否则访客将无法查看 discussion。
2. giscus app 已安装，否则访客将无法评论和回应。
3. Discussions 功能已在你的仓库中启用。
```

1. 先确保你的仓库是公开的，如果不是，可以在仓库的 Settings 里面修改。或者创建一个新的公开仓库，用来存放博客的评论。
![修改仓库为公开](configure2.webp)

2. 安装 giscus app，点击 [giscus app](https://github.com/apps/giscus) 按钮，跳转到 GitHub 的安装页面，点击 `Install` 按钮，选择你的仓库，安装成功后，会跳转回 Giscus 配置页面。
![安装 giscus app](configure3.webp)
![选择仓库](configure4.webp)
![安装成功](configure5.webp)

3. 启用 Discussions 功能，点击仓库的 `Settings`，在 `Features` 选项卡下，勾选 `Discussions`。

4. 配置 giscus 参数
![配置 giscus 参数](configure6.webp)
![配置 giscus 参数](configure7.webp)
> 输出 Discussion 的元数据 不知道是什么选项就没有开，有懂的评论区说一下。

现在我们就满足他的要求了
![配置成功](fulfillment.webp)

此时来到下面，这个 `script` 标签就会显示你相应的参数。
![参数列表](configure8.webp)

### 2. 配置 comment 参数

1. 主题不支持，手动添加评论

在你想让评论出现的位置添加上图的 `script` 标签。但如果已经存在带有 giscus 类的元素，则评论会被放在那里。
你可以在嵌入的页面中使用 .giscus 和 .giscus-frame 选择器来自定义容器布局。

<br/>

2. 主题支持，修改主题配置

修改主题配置（建议搜索 comment 照着修改）

```yml
comments:
    enable: true
    type: giscus
```
post 和 about 都可以开启评论
来到 giscus: 标签下，对照着 script 标签，填入相应的参数

```yml
giscus:
  repo: 你的 repo
  repo-id: 你的 repo-id
  category: 你的 category
  category-id: 你的 category-id
  theme-light: light
  theme-dark: dark
  mapping: pathname
  reactions-enabled: 1
  emit-metadata: 0
  input-position: top
  lang: zh-CN
```

检查无误后，清除一下缓存 `hexo clean` 再部署 Hexo 就可以看到评论功能了。

![ok](ok.webp)

如果没有看见评论功能，注意清除一下缓存 `hexo clean` 或者检查一下你的参数配置是否正确。

<br/><br/><br/><br/>

2323.12.30 更新

发生了件趣事，昨天下午我开启了 `Giscus` ，晚上就崩溃了，一直显示 `Fetch Failed`报错 😣我还以为是我配置出了问题，就重新配置了一遍，还是不行。
![评论区报错](fail.webp)

我去 Github 上面看了一下，很多人都遇到了这个问题。
![Github Issue](fail1.webp)

作者稍后回复说他在度假，回来后（一月 2 号）会修复这个问题。
![Github Issue](fail2.webp)

这位韩国友人说他用了九个月第一期出现这个问题。
行吧，真不幸，刚用上就崩溃了，那就等个几天吧。
![Github Issue](fail3.webp)

这位友人还以为这个`bug` 是产品特色，哈哈哈哈
![这位友人还以为这个`bug` 是产品特色](fail4.webp)
