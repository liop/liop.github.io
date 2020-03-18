---
title: iOS 性能优化
date: 2020-03-10 14:12:19
tags: 
  - iOS
  - 性能
  - 面试
categories:
  - iOS
---

iOS 面试中经常出现的问题 ```你做过哪些性能优化啊？``` ，在这里总结一下。性能优化是一个很大的词，在做性能优化前需要先确定性能指标，完成性能监控，然后才好谈优化。

## 1. 一般的优化方向

### 启动优化

一般我们选取：
```
 t1 = 用户点击APP到执行main()
 t2 = main()执行到 appDelegate的didFinishLaunchingWithOptions方法执行完毕
 t3 = appDelegate的didFinishLaunchingWithOptions方法执行完毕到首屏显示
```
有些是把t1+t2作为启动时间，考虑到项目组件化，t1+t2+t3 可能更合适

#### t1时间的优化

t1 的时间主要是ldyd加载image:```link rebase bind```，objc初始化:```map_image read_image load_image```  以及静态方法 ```__attribute__((constructor))```



#### t2时间的优化

#### t3时间的优化





#### 卡顿优化

#### 耗电优化

#### 网络优化

## 2. 指标监控





[性能指标]:https://github.com/aozhimin/iOS-Monitor-Platform "iOS 性能监控 SDK —— Wedjat"
[性能优化-电池]: 
[iOS-APP启动过程]:https://blog.csdn.net/Hello_Hwc/article/details/78317863 "深入理解iOS App的启动过程"
[iOS-APP完成的启动过程]:https://blog.csdn.net/weixin_34414650/article/details/88064023 "iOS App 的完整启动过程"