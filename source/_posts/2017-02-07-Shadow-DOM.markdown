---
layout: post
title:  "Shadow DOM!"
date:   2017-02-11 19:36:33 +0800
tags:
  - web DOM 
categories: 
  - 前端
---

## Shadow DOM

封装web组件的方案
由shdow host 、shadow root、shdow contents 组成，shadow root 对用户不可见

实例

模板
``` html
<template id="component-template">
  <style type="text/css">
    .outer {
      background-color: lightgrey;
      padding: 5px;
    }
    .inner {
      margin: 0 auto;
    }
  </style>
  <div class="outer">
    <p>sdsdsdsd</p>
    <div class="inner"></div>
  </div>
</template>

```

shadow host 容器

```html
<div id="container">Container</div>
```

将shadow contents 加载到容器下

```js

  // 创建 shadow Root
  var shadow = document.querySelector('#container').webkitCreateShadowRoot();
  // shadow host
  var component = document.querySelector('#component-template');
  // add to shadow host
  shadow.appendChild(component.content);
  component.remove();

```