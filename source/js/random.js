function randomRedirect() {
    // 发起网络请求获取 sitemap.txt 文件内容
    fetch("sitemap.txt")
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Network response was not ok. Status: " + response.status
                );
            }
            return response.text();
        })
        .then((data) => {
            let links = data.trim().split("\n"); // 将获取的内容按行分割成数组

            // 验证链接数组不为空
            if (links.length === 0) {
                throw new Error("No links found in the sitemap.");
            }

            // 随机选择一个链接
            let randomIndex = Math.floor(Math.random() * links.length);
            let randomLink = links[randomIndex].trim();

            // 验证随机选择的链接不为空
            if (!randomLink) {
                throw new Error("Invalid random link: " + randomLink);
            }

            let randomNavItem = document.querySelector(
                ".nav-item:nth-child(6) a"
            );

            randomNavItem.href = randomLink;
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

randomRedirect();
