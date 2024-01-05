#!/bin/bash

# GitHub用户名和仓库名称
GITHUB_USERNAME="mobeicanyue"
REPO_NAME="mobeicanyue.github.io"
BLOG_URL="https://blog.ovvv.top"

# jsDelivr基础路径
JSDELIVR_BASE_URL="https://cdn.jsdelivr.net/gh/$GITHUB_USERNAME/$REPO_NAME@gh-pages"

# 遍历public/posts目录
for post_dir in "public/posts"/*/; do
    echo "$post_dir"
    
    # 处理img标签
    find "$post_dir" -type f -name "index.html" -exec sed -i "s|<img src=\"|<img src=\"$JSDELIVR_BASE_URL|g" {} \;

    # 处理meta标签
    find "$post_dir" -type f -name "index.html" -exec sed -i "s|content=\"$BLOG_URL/posts|content=\"$JSDELIVR_BASE_URL/posts|g" {} \;
done

echo "图片链接和meta标签更新完成！"
