---
title: 将 jpg 转换为 webp
date: 2023-12-28 00:25:25
tags:
---
> 本文主要介绍如何将 Jpg 转换为 WebP。
> 为什么要转换为 WebP 呢？因为 WebP 图片通常比 JPEG 图片更小，同时保持相似的视觉质量。也是现代浏览器支持、推荐使用的图片格式之一。

### 1. 安装 cwebp

Archlinux 系 Linux 安装 `cwebp`
```bash
sudo pacman -S libwebp
```
### 2. 转换
我编写了一个脚本，可以将`当前目录`下的所有 jpg 文件转换为 webp 文件。
代码遍历所有文件夹并将图片转换为 WebP 格式。
```bash
script_dir=$(dirname "$0")

# 使用 find 命令遍历所有子文件夹中的图片文件
find "$script_dir" -type f \( -iname \*.jpg -o -iname \*.jpeg -o -iname \*.png \) -exec sh -c '
  for file do
    # 获取文件的相对路径和文件名
    relpath=$(dirname "$file")
    filename=$(basename "$file")

    # 使用 cwebp 将图片转换为 WebP 格式并保存到当前目录
    cwebp "$file" -o "${relpath}/${filename%.*}.webp"

    # 删除原始图片文件已注释, 建议先在测试环境中运行一下再放到代码仓库中运行
    # rm "$file"
  done
' sh {} +
```
可以看到确实图片体积减少很多，但是由于这张图片清晰度有点低，所以压缩后画质当然也不高。
![compare.webp](compare.webp)

### 3. 更改博客中的图片链接

vscode 或者别的 ide 批量替换你用到的 markdown 图片链接，将 .jpg 替换为 .webp 即可。
![replace.webp](replace.webp)

> 在部署博客之前，记得先在本地测试一下，看看是否有问题。