---
title: jS设计模式
toc: true
date: 2020-05-07 11:40:13
tags:
- 技巧
categories:
---

主要记录在看开源库和系统源码时，遇到不错的技术点

#### dispath_once

dispatch_once 实际调用 ```dispatch_once_f``` 

```c

void dispatch_once_f(dispatch_once_t *val, void *ctxt, void (*func)(void *)){
    
    volatile long *vval = val;
    if (dispatch_atomic_cmpxchg(val, 0l, 1l)) {
        func(ctxt); // block真正执行
        dispatch_atomic_barrier();
        *val = ~0l;
    } 
    else 
    {
        do
        {
            _dispatch_hardware_pause();
        } while (*vval != ~0l);
        dispatch_atomic_barrier();
    }
}


```

```dispatch_atomic_cmpxchg``` 实际是 ```__sync_bool_compare_and_swap(p,o,n)```， 这是LockFree给予CAS的一种原子操作机制，原理就是 如果p==o，那么将p设置为n，然后返回true;否则，不做任何处理返回false



## 参考资料
> - []()
> - []()
