# LockMe

## 简介

* 开源免费的密码管理工具 
* 有配套的文字教程（计划中）
* 有配套的视频教程（计划中）

## 配置

##### 初始化项目

* 复制 `project.config.example.json` 为 `project.config.json`
* 根据环境变量说明配置项目
* 上传 `cloudfunctions/` 目录中的函数
* 根据 `cloudfunction.collection` 创建云函数数据库

##### 环境变量说明

* `appid` 小程序ID
* `cloudfunction.env` 小程序云环境 ID
* `cloudfunction.collection` 小程序云的对应数据库集合
* `cloudfunction.collection.passwords` 密码集合
* 其他配置请参考小程序官方文档 [传送门](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)


## 打赏&联系

如果您感觉有收获，欢迎给我打赏，以激励我输出更多的优质内容。

![打赏&联系](https://raw.githubusercontent.com/pushmetop/resource/master/donate/donate.png)

## 进度表

- [x] 密码中心的整体布局
- [x] 密码搜索
- [x] 密码复制
- [ ] 密码删除
- [ ] 密码创建
- [ ] 单公私钥管理
- [ ] 多公私钥管理
- [ ] 防偷窥简单密码
- [ ] 用户设置
