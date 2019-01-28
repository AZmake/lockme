## 简介

##### LockMe 是什么呢？

* 一款免费开源的密码管理小程序。
* 源码地址 [https://github.com/pushmetop/lockme](https://github.com/pushmetop/lockme) 。

##### 市面上有许许多多的密码管理工具，为何要特意造轮子呢？

* 自己造的轮子放心。
* 需要写一个小程序练手。
* 想体验 `免费` 小程序云所谓的 `Serverless`。

##### 为什么不使用 wepy 这类小程序开发框架呢？

* 学习和使用一个知识的时候，要知其然，知其所以然。
* wepy 等框架其实对小程序进行了很多特殊的封装，如果对小程序本身不熟悉，出现错误的时候有可能会一头雾水。

##### LockMe 怎么保证安全性？

* 采用了 `国密算法 SM2` 的公私钥算法。
* 私钥由用户个人进行保存。
* 私钥不进行触网。
* 密码数据都由公钥进行加密存储。

## 使用与配置

##### 初始化项目

* 创建 `project.config.json`
* 复制 `miniprogram/config-example.js` 为 `miniprogram/utils/Config.js` 环境变量
* 配置 `miniprogram/utils/Config.js` 环境变量
* 上传 `cloudfunctions/` 云函数
* 根据 `cloudfunction.collection` 创建云数据库

##### 环境变量说明

* `cloud.env` 小程序云环境 ID
* `cloud.collection` 小程序云的对应数据库集合
* `cloud.collection.safes` 密码集合
* `cloud.collection.settings` 设置集合
* 其他配置请参考小程序官方文档 [传送门](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)


## 演示

##### 初始化
![初始化](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/init.png)

##### 密码中心
![密码中心](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/index.png)

##### 设置
![设置](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/setting.png)

## 设计理念

基于大家日常生活中最常使用的网站 `百度` 的交互进行设计，更方便和直觉的让用户使用 `LockMe`。

先回想一下平时使用百度时的三个基本状态：

不进行任何搜索操作时：

![baidu](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/baidu-base.png)

进行关键词搜索且有结果时：

![baidu](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/baidu-search.png)

无结果时需要点击 `百度一下`：

![baidu](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/baidu-unsearch.png)

因而在 `LockMe` 中的搜索密码、创建密码的交互逻辑也与此类似。

不进行任何搜索操作时：

![lockme](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/lockme-base.png)

进行关键词搜索且有结果时：

![lockme](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/lockme-search.png)

无结果时需要点击 `创建` 便可创建新的密码记录：

![lockme](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/lockme-unsearch.png)

嘻嘻，所以 `LockMe` 是一款有大厂交互的工具，小二编了吹了这么久 🐂 ，小哥哥小姐姐你还不试试嘛？还不赶紧给小二点个 `Star`？

## 打赏&联系

如果您感觉有收获，欢迎给我打赏，以激励我输出更多的优质内容。

![打赏&联系](https://raw.githubusercontent.com/pushmetop/resource/master/donate/donate.png)

> 本文原稿来自 [PushMetop](https://pushmetop.github.io)
