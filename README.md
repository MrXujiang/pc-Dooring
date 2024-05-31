> 让PC制作像搭积木一样简单!

<h1 align="center">Welcome to PC-Dooring 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.2-blue.svg?cacheSeconds=2592000" />
  <a href="https://juejin.im/post/6864410873709592584/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="license:GPL3.0" src="https://img.shields.io/badge/license-GPL3.0-yellow.svg" />
  </a>
</p>

### 🏠 [Homepage](http://h5.dooring.cn/pc_plus/editor?tid=6AC322B0)

### 📦 doc(文档) [PC-Dooring Document](http://h5.dooring.cn/doc)

### [视频教程 | Video tutorial](https://www.zhihu.com/zvideo/1326300284608417792)


相关产品: 
- [V6.Dooring | 大屏可视化编辑器](https://github.com/MrXujiang/v6.dooring.public)
- [H5-Dooring | H5可视化编辑器](https://github.com/MrXujiang/h5-Dooring)
- - [Nocode/WEP | 可视化文档编辑器](https://github.com/MrXujiang/Nocode-Wep)


## Show your support

Give a ⭐️ if this project helped you!

如果本开源项目对您有帮助, 请点个`star`, 支持开源.

## Install(安装)
1. 下载代码 | Download the code
```sh
git clone git@github.com:MrXujiang/pc-Dooring.git
```
2. 进入项目目录 | Go to the project catalog
```sh
cd ./pc-Dooring
```

3. 安装依赖包 | Install the dependency package
```sh
yarn install
or
cnpm install
```

## Usage

本地启动应用 | Launch the app locally
```sh
yarn start
or
cnpm run start
```

如发现本地启动后组件拖拽遇到奇怪的报错, 是应为第三方组件在开发环境的bug, 可以采用一下方式解决:
> If you find that the local start-up component drag encountered strange errors, is a bug that should be a third-party component in the development environment, can be resolved in a way:

```sh
yarn dev
or
cnpm run dev
```
前提是先安装http-server模块.

## 本地服务器部署
1. 打包
```sh
yarn build
```
2. 启动服务
```sh
node server.js
# 或者pm2(需要先全局安装pm2)
pm2 start server.js
```
3. 访问地址
```sh
服务器ip + 3000 (默认为3000, 也可以改成80, 具体参考server.js)
```


## 更新日志 | Update the log
1. 添加数据可视化模块
2. 添加表单设计器模块
3. 添加pc端组件库


## 持续升级 | Continuous upgrades
如果您有更好的想法, 欢迎和我们一起共建, 让国内开源更强大.

## 赞助 | Sponsored
开源不易, 有了您的赞助, 我们会做的更好~

<img src="http://49.234.61.19/uploads/WechatIMG2_1742b586c3d.jpeg" width="180px" />

## 技术反馈和交流群 | Technical feedback and communication
微信：beautifulFront

<img src="http://49.234.61.19/uploads/code_1763cc23385.png" width="180px" />
