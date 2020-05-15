---
title: iOS 13 版本适配
date: 2020-04-03 16:23:48
tags: 
  - iOS 13
  - 适配
categories:
  - iOS
---

#### 1、新建的项目启动黑屏或者window不存在

因为 iOS 13 下默认通过UISceneDelegate来管理窗口生命周期
需要在AppleDelegate.h中添加window:

```objc
@perperty (strong,nonatomic) UIWindow *window;
```

  在AppleDelegate.m 中添加

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    if (@available(iOS 13.0, *)) {
        // iOS 13 去 SceneDelegate 处理中了
    } else {
        self.window = [[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
        self.window.rootViewController = [ContainerViewController shareInstance];
        [self.window makeKeyAndVisible];
    }
    return YES;
}
```

#### 2、一些私有属性已经不存在了，访问会crash

*  <code>UITextField</code> 的 <code> _placeholderLabel.textColor</code>
*  <code>UITextField</code> 的 <code> _placeholderLabel.font</code>
*  <code>UISearchBar</code> 的 <code>_cancelButton</code>
*  <code>[UIApplication sharedApplication]</code> 的 <code>statusBarWindow</code>

需要去掉或者重新实现，比如

```objc
// iOS 13下会crash
[textfiled setValue:color forKeyPath:@"_placeholderLabel.textColor"];
[textfiled setValue:font forKeyPath:@"_placeholderLabel.font"];
// 替换为
textfiled.attributedPlaceholder = xxx;
```

#### 3、模态视图控制器切换不完全

iOS 13 控制器的<code>modalPresentationStyle</code>被默认设置为 <code>UIModalPresentationAutomatic</code>
解决方案：

  1. 如果像使用这个默认系统模式的话，可能需要适配页面。
  2. 修改视图控制器的 <code>modalPresentationStyle</code>

#### 4、NSObjectNotAvailableException

一些类以前被标记为 API_DEPRECATED 被移除了，需要使用新类

* MPMoviePlayerController => AVPlayerViewController
* UISearchDisplayController => UISearchController
* UIAlertView => UIAlertController

#### 5、一些API 被弃用

弃用 LaunchImage，使用 LaunchScreen.storyboard，不然没法提交审核
弃用 UIWebView，使用WKWebView

### 6、一些权限变化

* 蓝牙权限描述：
  弃用 NSBluetoothPeripheralUsageDescription
  新增 NSBuletoothAlwaysUsageDescription
  如果支持iOS 13以前版本的话，两个都要
* 获取WIFI的SSID和BSSID：
  iOS 13 需要先开启 Access WiFi Information capability

#### 7、使用第三方登录的问题

如果集成了第三方登录，就需要提供 Sign in with Apple
如果没集成第三方登录，就不用提供

#### 8、NSData description

iOS 13 之前可以通过description 方法将data 转化为string
iOS 13 以后需要通过
```objc

- (NSString *)hexadecimalString: (NSData *)data {
    const unsigned char *dataBuffer = (const unsigned char *)[data bytes];

    if (!dataBuffer) {
        return [NSString string];
    }

    NSUInteger dataLength  = [data length];
    NSMutableString *hexString  = [NSMutableString stringWithCapacity:(dataLength * 2)];

    for (int i = 0; i < dataLength; ++i) {
        [hexString appendFormat:@"%02x", (unsigned int)dataBuffer[i]];
    }

    return [NSString stringWithString:hexString];
}
```
这个可能影响加解密和远程通知的TOKEN 获取

#### 9、暗黑模式

暂时不适配的处理：
```objc
// 修改代码
if (@available(iOS 13.0, *)) {
    [UIApplication sharedApplication].keyWindow.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
}
// 或者 修改info.plist
<key>UIUserInterfaceStyle</key>
<string>Light</string>
```
适配的处理：
系统方案查看 UIColor+UIColorNameColors 和 UIColor+DynamicColors
参考：
腾讯的：[使用 QMUITheme 实现换肤并适配 iOS 13 Dark Mode](https://github.com/Tencent/QMUI_iOS/wiki/%E4%BD%BF%E7%94%A8-QMUITheme-%E5%AE%9E%E7%8E%B0%E6%8D%A2%E8%82%A4%E5%B9%B6%E9%80%82%E9%85%8D-iOS-13-Dark-Mode)
百度的：[百度APP iOS暗黑模式适配的完美解决方案](https://developer.baidu.com/topic/show/290490)


## 参考资料
> - [《iOS13的特性和适配》](https://www.jianshu.com/p/5bb6bc7ef565)
