---
title: 启用博客评论 Giscus
abbrlink: 7671c28e
date: 2023-12-29 16:39:46
tags:
  - Giscus
---

{% note secondary %}
我认为评论功能是一个博客不可或缺的组成部分，作者可以通过评论获得读者反馈，比如说我文章哪里写错了或者哪里需要更新，而读者也可以通过评论与作者交流。

又由于我 Hexo 部署的是 GitHub Pages 静态博客网页，依靠后端的评论系统不现实。所以我考虑依靠 Github 自带的 Issues 或者 Discussions 评论系统来实现评论功能。
{% endnote %}


## 1. 配置 Giscus

[Giscus 配置页](https://giscus.app/zh-CN)

往下滑动，来到仓库这个选项，填入你的 GitHub 仓库地址。
![填入你的仓库 url](https://pic4.zhimg.com/80/v2-63ad66bdd73fa2abe329b96135f89923_1440w.webp)

可以看到报错了，这是因为我们还没有满足开启 Giscus 的条件

```
选择 giscus 连接到的仓库。请确保：

1. 该仓库是公开的，否则访客将无法查看 discussion。
2. giscus app 已安装，否则访客将无法评论和回应。
3. Discussions 功能已在你的仓库中启用。
```

### 1.1 仓库公开

先确保你的仓库是公开的，如果不是，可以在仓库的 Settings 里面修改。或者创建一个新的公开仓库，用来存放博客的评论。
![修改仓库为公开](https://pic1.zhimg.com/80/v2-f6a7d078b2bba550b711d0842a50a510_1440w.webp)

### 1.2 安装 giscus app

安装 giscus app，点击 [giscus app](https://github.com/apps/giscus) 按钮，跳转到 GitHub 的安装页面，点击 `Install` 按钮，选择你的仓库，安装成功后，会跳转回 Giscus 配置页面。
![安装 giscus app](https://pic1.zhimg.com/80/v2-48fbbe27f37257b728b6a51c18582e18_1440w.webp)
![选择仓库](https://pic4.zhimg.com/80/v2-e1175a1a8532fad2e0e65e0a1728ed1b_1440w.webp)
![安装成功](https://pic4.zhimg.com/80/v2-9ff4af2af602fe3d8b26b9e9e1b46b47_1440w.webp)

### 1.3 启用 Discussions 功能

启用 Discussions 功能，点击仓库的 `Settings`，在 `Features` 选项卡下，勾选 `Discussions`.

现在我们就满足他的要求了
![配置成功](https://pic2.zhimg.com/80/v2-87f6a97a98bd253ff8fd78b89115aa0d_1440w.webp)


### 1.4 配置 Giscus 参数

下面我们来配置 Giscus 的参数。
![配置 giscus 参数](https://pic3.zhimg.com/80/v2-3ab1980b9fe5b4569f9c4a83ee39854a_1440w.webp)
![配置 giscus 参数](https://pic2.zhimg.com/80/v2-2d04b343bbeac93921c736e6c040f5d9_1440w.webp)

配置完毕之后滑到下面，这个 `script` 标签会显示你相应的参数。
![参数列表](https://pic3.zhimg.com/80/v2-f130a5c4da97dbd1704254cb5098471a_1440w.webp)

## 2. 配置 comment 参数

{% fold @手动配置 Giscus %}
在你想让评论出现的位置添加上图的 `script` 标签。

但如果已经存在带有 giscus 类的元素，则评论会被放在那里。你可以在嵌入的页面中使用 .giscus 和 .giscus-frame 选择器来自定义容器布局。
{% endfold %}

{% fold @ 主题配置 Giscus %}
如果你的博客主题支持 Giscus，那么直接在主题配置中配置 Giscus 即可。建议参照主题的文档，找到对应的配置项，进行配置。

下面我以 Fluid 主题为例，配置 Giscus。

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

![ok](https://pic3.zhimg.com/80/v2-5958c4ce55d4ea0210a551e7fe10501e_1440w.webp)

如果没有看见评论功能，注意检查一下你的参数配置是否正确。
{% endfold %}

在配置完成后，`giscus` 加载时，会使用 GitHub Discussions 搜索 API 根据选定的映射方式（如 URL、pathname、title 等）来查找与当前页面关联的 discussion。如果找不到匹配的 discussion，giscus bot 就会在第一次有人留下评论或回应时自动创建一个 discussion。这样你的博客读者 登陆 Github 即可对文章评论了。

## 3. 进阶配置

进阶配置可通过在 仓库根目录下 创建一个 `giscus.json` 文件来完成。
如设置 **限制允许评论的域名**，**评论的默认排序**等。

示例如下：

```json
{
  "origins": [
    "https://giscus.app",
    "https://giscus.vercel.app",
    "https://giscus-component.vercel.app"
  ],
  "originsRegex": [
    "https://giscus-git-([A-z0-9]|-)*giscus\\.vercel\\.app",
    "https://giscus-component-git-([A-z0-9]|-)*giscus\\.vercel\\.app",
    "http://selfhost:[0-9]+"
  ],
  "defaultCommentOrder": "oldest"
}
```

- 你可以使用 `origins` 键限制可以加载 giscus 以及 存储库 Discussion 的域名。 `origins` 键接受一个字符串列表，将与 加载 giscus 的页面的 `window.origin` 进行校验。
- `originsRegex` 键使用正则表达式来校验 `origin`。
- `defaultCommentOrder` 键用于设置评论的默认排序方式。可选值为 `oldest` 或 `newest`。默认是 `oldest`。
