const now = new Date(); // 获取当前时间
const init = new Date("2023-12-26T22:19:15"); // 设置初始化时间

const currentYear = now.getFullYear(); // 获取当前年份

// 计算运行时间
const days = Math.floor((now - init) / 1000 / 60 / 60 / 24); // 计算天数
const years = Math.floor(days / 365); // 计算年数
const remainingDays = days % 365; // 计算剩余天数
const hours = Math.floor((now - init) / 1000 / 60 / 60 - 24 * days);

function createTime() {
    document.getElementById("copyrightYear").textContent = ` - ${currentYear}`;
    document.getElementById("timeYear").textContent = `本站已运行 ${years} 年`;
    document.getElementById("timeDate").textContent = ` ${remainingDays} 天`;
    document.getElementById("times").textContent = ` ${hours < 10 ? "0" : ""}${hours} 小时`;
}
createTime();
