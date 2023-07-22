## 本地运行

1. 安装 npm `npm install `
2. 运行服务 `npm run start `

## docker 拉取镜像，生成容器运行。

1. 打开 docker,拉取镜像 `docker pull liucunming/my-order-system:v1`
2. 运行容器 `docker run --name my-order-system4 -p 9004:80 -d liucunming/my-order-system:v1 `
3. 浏览器访问服务 `http://localhost:9004/`
