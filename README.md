# LockMe

## 简介

* 开源免费的密码管理工具
* 开发平台为微信小程序
* 数据存储使用小程序云
* 加密算法为国密SM2
* 有配套的文字教程（计划中）
* 有配套的视频教程（计划中）

## 配置

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
![初始化](https://raw.githubusercontent.com/pushmetop/resource/master/lockme/init.png)

##### 密码中心
![密码中心](https://raw.githubusercontent.com/pushmetop/resource/master/lockme/index.png)

##### 设置
![设置](https://raw.githubusercontent.com/pushmetop/resource/master/lockme/setting.png)

## 打赏&联系

如果您感觉有收获，欢迎给我打赏，以激励我输出更多的优质内容。

![打赏&联系](https://raw.githubusercontent.com/pushmetop/resource/master/donate/donate.png)

## 进度表

- 初始化
  - [x] 简单密码
  - [x] 创建新私钥
  - [x] 导入旧私钥

- 密码中心
  - [x] 密码创建
  - [x] 密码删除
  - [x] 密码修改
  - [x] 密码搜索
  - [x] 密码复制
  - [ ] 密码标签

- 设置
  - [x] 皮肤设置
  - [x] 锁定时间
  - [x] 备份数据
  - [x] 导入数据
  - [x] 设置私钥
  - [x] 更改私钥
  - [x] 什么是公私钥
  - [x] 关于我们
