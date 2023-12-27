var now = new Date(); // 获取当前时间
const copyrightYearElement = document.getElementById("copyrightYear");

const currentYear = now.getFullYear(); // 获取当前年份
copyrightYearElement.textContent = ` - ${currentYear}`;
function createTime() {
    const now = new Date();  // 获取当前时间
    const grt = new Date("12/26/2023 22:19:15");  // 设置建站时间，格式：月/日/年 时:分:秒

    now.setTime(now.getTime() + 250);  // 更新当前时间为当前时间 + 250 毫秒

    // 计算运行时间
    const days = Math.floor((now - grt) / 1000 / 60 / 60 / 24);
    const hours = Math.floor((now - grt) / 1000 / 60 / 60 - 24 * days);
    const minutes = Math.floor((now - grt) / 1000 / 60 - 24 * 60 * days - 60 * hours);
    const seconds = Math.round((now - grt) / 1000 - 24 * 60 * 60 * days - 60 * 60 * hours - 60 * minutes);

    // 缓存 DOM 查询结果
    const timeDateElement = document.getElementById("timeDate");
    const timesElement = document.getElementById("times");

    // 更新页面元素显示网站运行时间
    timeDateElement.textContent = `本站已运行 ${days} 天`;
    timesElement.textContent = `${hours < 10 ? "0" : ""}${hours} 小时 ${minutes < 10 ? "0" : ""}${minutes} 分 ${seconds < 10 ? "0" : ""}${seconds} 秒`;
}

// 每隔 500 毫秒调用一次 createTime 函数
setInterval(createTime, 500);

// function createtime() {
//     var grt= new Date("12/26/2023 22:19:15");// 在此处修改你的建站时间，格式：月/日/年 时:分:秒
//     now.setTime(now.getTime()+250);
//     days = (now - grt ) / 1000 / 60 / 60 / 24; dnum = Math.floor(days);
//     hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum); hnum = Math.floor(hours);
//     if(String(hnum).length ==1 ){hnum = "0" + hnum;} minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
//     mnum = Math.floor(minutes); if(String(mnum).length ==1 ){mnum = "0" + mnum;}
//     seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
//     snum = Math.round(seconds); if(String(snum).length ==1 ){snum = "0" + snum;}
//     document.getElementById("timeDate").innerHTML = "本站已运行 "+dnum+" 天 ";
//     document.getElementById("times").innerHTML = hnum + " 小时 " + mnum + " 分 " + snum + " 秒";
// }
// setInterval("createtime()", 250);