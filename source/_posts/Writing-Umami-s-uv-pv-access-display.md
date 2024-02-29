---
title: 编写 Umami 的 UV, PV 访问统计显示
tags:
  - Umami
abbrlink: 4259ee82
date: 2024-02-25 19:47:17
---

> Umami is a simple, fast, privacy-focused alternative to Google Analytics.
> 
> Umami 是一个简单、快速、注重隐私的 Google Analytics 替代品。

本站的 Umami 访问统计页面，显示了每日的访问量和访问人数，链接：https://umami.ovvv.top/share/SYu8qUKmty52PW9w/blog

![浏览量展示](display.webp)

我们在前文介绍过如何安装 Umami，本文将介绍编写一个简单的页面，通过 Umami 的 API 调用显示 Umami 的 UV, PV 访问情况。

本文 **默认你已经安装了 Umami 并且添加了一个网站**，如果没有安装 Umami，请参考：{% post_link 'Umami-installation-and-usage-tutorial' 'Umami 安装使用教程' %}


## 1. 新建 `View only` 权限的用户

`Settings` -> `Users` -> `Create user` -> 填写账号密码，`Role` 选择 `View only` -> `Save`

![新建用户](create.webp)


{% fold info @一点碎碎念 %}
肯定有读者很疑惑，为什么不直接调用 Umami 的 API 获取数据，而是要额外创建一个账户。因为我的博客是 **静态开源无服务器** 的，往往需要将生成的代码展示在前端，包括 API 调用。而 Umami 的 API 权限太大了[^1]，如果使用 `admin` 权限的 API Token，那么这个 token 可以获取、修改、删除所有网站的数据，会有严重的安全隐患。所以我们需要创建一个 `View only` 权限的用户，然后使用这个用户的 API Token
{% endfold %}

## 2. 新建 `Team` 并添加用户和网站

`Settings` -> `Teams` -> `Create team` -> 填写名称 -> `Save` -> 找到刚刚创建的 `Team` -> `Edit` -> 复制 `Access code`，点击 `Websites` 中点击 `Add website` 选中你想共享的网站 

换一个浏览器登录 Umami（使用`View only` 权限的用户） -> `Settings` -> `Teams` -> `Join team` -> 输入 `Access code` -> `Join` -> 如果没有出错的话，点击 `Dashboard` 就可以看到你刚刚添加的网站了

## 3. 获取 `View only` 用户的 API Token
根据 Umami 的文档[^2]，我们可以通过以下方式获取 API Token：

```
POST /api/auth/login
```
例如 你的网站地址为 `example.com`，那么你需要使用 `View only` 的账户密码向 `https://example.com/api/auth/login` 发送一个 POST 请求，请求体为：

```json
{
  "username": "your-username",
  "password": "your-password"
}
```

如果成功，你应该会得到以下的结果：
```json
{
  "token": "eyTMjU2IiwiY...4Q0JDLUhWxnIjoiUE_A",
  "user": {
    "id": "cd33a605-d785-42a1-9365-d6cad3b7befd",
    "username": "your-username",
    "createdAt": "2020-04-20 01:00:00"
  }
}
```

保存 token 值，并在所有请求中发送带 `Bearer <token>` 值的 `Authorization` 标头。请求标头应该如下所示：

```
Authorization: Bearer eyTMjU2IiwiY...4Q0JDLUhWxnIjoiUE_A
```

## 4. 发送请求获取数据

这里要用到类似于 `postman` 的 API 测试工具，我使用的是开源的 `hoppscotch`，你也可以使用 `curl` 或者其他工具。

先分析一下官方文档的 API 接口[^3]：
`GET /api/websites/{websiteId}/stats`
![API](API.webp)

有两个必填的 查询参数：`startAt` 和 `endAt`，都是 Unix 毫秒时间戳，表示开始时间和结束时间

`websiteId` 和 `startAt` 需要我们自己获取

`websiteId` 可以在 `Dashboard` -> `View details` -> 看浏览器栏的地址 `https://example.com/websites/{websiteId}` 中找到

`startAt` 可发送 `GET` 请求到 `https://example.com/api/websites/{websiteId}`，请求头为

```
Authorization: Bearer eyTMjU2IiwiY...4Q0JDLUhWxnIjoiUE_A
```

在返回结果中找到 `createdAt` 字段，这个字段就是 `startAt` 的值，也就是你的网站创建时间，数据的开始时间
![createdAt](startTime.webp)


## 5. 编写页面

![页面展示](statistics.webp)

代码是看到木木的博客[^4]而有灵感，而评论区下面的 Nick[^5] 提供了相对正确的思路，我在他代码的基础上进行了改进，如删除无用的参数和优化步骤等。代码如下，修改你对应的参数即可运行：

{% fold info @html 代码 %}
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div style="text-align:center;">
        <h1>Umami 网站统计</h1>
        <span>总访问量 <span id="umami-site-pv"></span> 次</span>

        <span>总访客数 <span id="umami-site-uv"></span> 人</span>
    </div>

    <script>
        // 从配置文件中获取 umami 的配置
        const website_id = 'xxx';

        // 拼接请求地址
        const request_url = 'https://xxx.com' + '/api/websites/' + website_id + '/stats';

        const start_time = new Date('2024-01-01').getTime();
        const end_time = new Date().getTime();

        const token = 'xxxxxx';

        // 检查配置是否为空
        if (!website_id) {
            throw new Error("Umami website_id is empty");
        }
        if (!request_url) {
            throw new Error("Umami request_url is empty");
        }
        if (!start_time) {
            throw new Error("Umami start_time is empty");
        }
        if (!token) {
            throw new Error("Umami token is empty");
        }

        const params = new URLSearchParams({
            startAt: start_time,
            endAt: end_time,
        });

        const request_header = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        };

        async function allStats() {
            try {
                const response = await fetch(`${request_url}?${params}`, request_header);
                const data = await response.json();
                const uniqueVisitors = data.uniques.value; // 获取独立访客数
                const pageViews = data.pageviews.value; // 获取页面浏览量

                let ele1 = document.querySelector("#umami-site-pv")
                if (ele1) {
                    ele1.textContent = pageViews; // 设置页面浏览量
                }

                let ele2 = document.querySelector("#umami-site-uv")
                if (ele2) {
                    ele2.textContent = uniqueVisitors;
                }

                console.log(uniqueVisitors, pageViews);
                console.log(data);
                return data;
            } catch (error) {
                console.error(error);
                return "-1";
            }
        }
        allStats();
    </script>
</body>

</html>
```
{% endfold %}

## 参考
[^1]: https://umami.is/docs/websites-api
[^2]: https://umami.is/docs/authentication
[^3]: https://umami.is/docs/website-stats
[^4]: https://immmmm.com/hi-umami-api/
[^5]: https://github.com/nick-cjyx9/ilesBlog/blob/main/src/composables/useUmami.ts