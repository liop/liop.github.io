---
title: iOS APP 启动完成过程
date: 2020-03-10 15:09:41
tags:
  - iOS
  - 面试
  - 启动
categories:
  - iOS
---

## 1. 解析 info.plist

这块没有
- 加载启动页
- 建立沙箱，检查权限

## 2. Mach-O 加载 或者说是 dyld加载流程

- 设置运行环境，环境变量，获取当前运行架构
- 加载共享缓存
- 加载主执行文件，生成一个imageLoader实例
- 加载所有插入的库
- link 主执行文件 (link过程会先loadLibraries ，定位内部（rebase）、外部（bind）制作引用，比如 字符串、函数)
- link动态库
  - notify（dyld_image_state_bound） => 触发 sNotifyObjCMapped绑定 objc库中map_images()
    - map_image -> map_images_nolock 计算 class selector 的数目
    - 关键函数 _read_images
      - fix selector
      - map class protocal @protocal cattegry
- 执行弱符号绑定
- 关键函数调用 initializeMainExecutable()
  - dependentImage->recursiveInitialization
    - notify(dyld_image_state_dependents_initialized) => 触发sNotifyObjCInit绑定的 objc中的load_images（）
      - 执行所有的 +load 函数
    - 当前image -> doInitialization => 会执行 __attribute__((constructor)) c函数

- 查找入口点并返回 main() 地址


## 程序执行
  
  - main => UIApplicationMain => Appdelegate
