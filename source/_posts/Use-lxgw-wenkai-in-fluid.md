---
title: 在 Fluid 主题中使用霞鹜文楷
date: 2023-12-27 14:58:04
tags:
- hexo
- fluid
---

近来阅读竹林里有冰的博客，发现他的博客字体很好看，想着把他的字体也用到我的博客里，于是就有了这篇文章。

### 1. 字体介绍
[霞鹜文楷字体仓库](https://github.com/lxgw/LxgwWenKai)
霞鹜文楷 我之前其实在手机上用过，不过后面由于装机加上懒得折腾就没有再设置了，但是博客我觉得为了好的阅读体验还是可以换一下的
![霞鹜文楷](wenkai.webp)

关于在 web 中使用 霞鹜文楷 请参阅 [issue#24](https://github.com/lxgw/LxgwWenKai/issues/24)

其中 [chawyehsu](https://github.com/chawyehsu/lxgw-wenkai-webfont) 提供了打包，但是点进去仓库发现已经有半年没更新了。在 issue 的下面我们可以看到 [CMBill](https://github.com/CMBill/lxgw-wenkai-gb-web) 提供了一个新的打包，我的就是这个打包。

在 [CMBill](https://github.com/CMBill/lxgw-wenkai-gb-web) 的仓库 README 中右键跳转 css 看看内容 ![style.css.webp](style.css.webp)

可以发现这个 css 是分了几个不同的字体种类，还有不同的霞鹜文楷变体可供选择
![font-css.webp](font-css.webp)
将 `style.css` 替换为 `@import url` 之后的内容（去掉./），就可以直接使用了

我最终选择了 `lxgwwenkaigb-bold` 这个字体，这个字体阅读起来比较舒服。
我的博客字体文件为
`https://cdn.jsdelivr.net/gh/CMBill/lxgw-wenkai-gb-web/fonts/lxgwwenkaigb-bold/result.css`

### 2. 使用方法
如果你恰好也用 hexo 的 fluid 主题，那么恭喜你，替换字体很简单，只需要在主题的配置文件里加上一行 `custom_css: https://xxxx`代码就可以了，再修改 font_family。参照你的 css 文件前几行显示的 `fontFamily: `，比如我的是 `fontFamily: LXGW WenKai GB`。

```yaml
# 主题字体配置
font:
  font_size: 17px
  font_family: "LXGW WenKai GB"
  letter_spacing: 0.02em
  code_font_size: 85%

custom_js:
custom_css: https://cdn.jsdelivr.net/gh/CMBill/lxgw-wenkai-gb-web/fonts/lxgwwenkaigb-bold/result.css
```
### 3. 效果展示
![效果](result.webp)