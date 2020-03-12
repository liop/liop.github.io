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

这一步没什么好说的
- 加载相关信息，如果启动页
- 建立沙箱，检查权限

## 2. Mach-O 加载 或者说是 dyld加载流程

- 设置运行环境，环境变量，获取当前运行架构
- 加载主执行文件，生成一个imageLoader实例
- 检查共享缓存是否映射到共享区
- 加载所有插入的库
- link 主执行文件 (link过程会先loadLibraries ，定位内部（rebase）、外部（bind）制作引用，比如 字符串、函数)
- link子库
- notify（dyld_image_state_bound） => 触发 sNotifyObjCMapped绑定 objc库中map_images()
  - map_image -> map_images_nolock 计算 class selector 的数目
  - 关键函数 _read_images
    - fix selector
- 关键函数调用 initializeMainExecutable()
  - dependentImage->recursiveInitialization
  - notify(dyld_image_state_dependents_initialized) => 触发sNotifyObjCInit绑定的 objc中的load_images（）
    - 执行所以的 +load 函数
  - 当前image -> doInitialization => 会执行 __attribute__((constructor)) c函数
  - 加载分类（Category）中的方法  
  - C++ 静态对象加载
- _main() return main() 地址


## 程序执行
  
  todo:
