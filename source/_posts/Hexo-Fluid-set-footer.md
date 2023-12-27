---
title: Hexo Fluid 设置页脚
date: 2023-12-28 02:26:14
tags:
- hexo
- fluid
---

效果图：
![set-footer.webp](/images/Hexo-Fluid-set-footer/set-footer.webp)

### 1. 修改 `Fluid` 主题配置文件

```yml
footer:
  content: '
    <div>
      Copyright © 2023<span id="copyrightYear"></span> |
      <a href="https://github.com/mobeicanyue/mobeicanyue.github.io" target="_blank" rel="nofollow noopener">
      <span>mobeicanyue</span></a>    
    </div>

    <div>
      <span id="timeDate">载入天数...</span>
      <span id="times">载入时分秒...</span>
      <script src="/js/duration.js"></script>
    </div>

    Powered by
    <a href="https://hexo.io" target="_blank" rel="nofollow noopener"><span>Hexo</span></a>
    <i class="iconfont icon-love"></i>
    <a href="https://github.com/fluid-dev/hexo-theme-fluid" target="_blank" rel="nofollow noopener"><span>Fluid</span></a>
    '
```
新建文件夹`source/js`，新建文件`duration.js`，内容如下：
> 代码来源于网络，由于找的都是大同小异的代码，不知道原作者是谁，版权归原作者所有。
```js
function createtime() {
    var grt= new Date("12/26/2023 22:19:15");// 在此处修改你的建站时间，格式：月/日/年 时:分:秒
    now.setTime(now.getTime()+250);
    days = (now - grt ) / 1000 / 60 / 60 / 24; dnum = Math.floor(days);
    hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum); hnum = Math.floor(hours);
    if(String(hnum).length ==1 ){hnum = "0" + hnum;} minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
    mnum = Math.floor(minutes); if(String(mnum).length ==1 ){mnum = "0" + mnum;}
    seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
    snum = Math.round(seconds); if(String(snum).length ==1 ){snum = "0" + snum;}
    document.getElementById("timeDate").innerHTML = "本站已运行 "+dnum+" 天 ";
    document.getElementById("times").innerHTML = hnum + " 小时 " + mnum + " 分 " + snum + " 秒";
}
setInterval("createtime()", 250);
```