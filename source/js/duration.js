var now = new Date(); // 获取当前时间
const copyrightYearElement = document.getElementById("copyrightYear");

const currentYear = now.getFullYear(); // 获取当前年份
copyrightYearElement.textContent = ` - ${currentYear}`;
function createTime() {
    const now = new Date();  // 获取当前时间
    const init = new Date("12/26/2023 22:19:15");  // 设置建站时间，格式：月/日/年 时:分:秒

    // 计算运行时间
    const days = Math.floor((now - init) / 1000 / 60 / 60 / 24); // 计算天数
    const years = Math.floor(days / 365); // 计算年数
    const remainingDays = days % 365; // 计算剩余天数
    const hours = Math.floor((now - init) / 1000 / 60 / 60 - 24 * days);

    document.getElementById("timeYear").textContent = `本站已运行 ${years} 年`;
    document.getElementById("timeDate").textContent = ` ${remainingDays} 天`;
    document.getElementById("times").textContent = ` ${hours < 10 ? "0" : ""}${hours} 小时`;
}
createTime();
console.log("页脚脚本加载成功！");