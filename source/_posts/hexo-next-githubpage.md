---
title: 部署hexo+next 到github page 的一些坑
date: 2020-01-14 16:12:02
tags: web
categories: 
- 前端
---

打算把之前写的技术文档整理一下，先花了点时间布了 hexo + next 到github pages 上，同时用 travis 做自动发布，这里记录下遇到的问题。

#### Travis-CI 配置 .travis.yaml 文件

主要参考[这里][hexo]，但这篇文章的是将生成的文字放到了gh-pages分支，但是对应个人博客而言，github pages 只能从master分支发布，参考了评论，合适的配置应该是这样的：


``` yaml
sudo: false
language: node_js
node_js:
  - 10 # use nodejs v10 LTS
cache: npm
branches:
  only:
    - hexo # 这里不能是master，master放 `hexo generate`之后 /public 中生成的内容
script:
  - hexo generate # generate static files
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GH_TOKEN
  keep-history: false # 如果你前面已经把代码推到仓库的master分支，这里可以强制覆盖
  on: # 这是部署的条件
    all_branches: true # 判断发生build的分支，是所有分支都可以部署
  target_branch: master # 部署到的分支，个人现在是只能master分支
  local-dir: public
```

#### 使用 theme/next 作为主题

前面走了很多弯路，直接将 theme/next加博客的仓库中，后面travis编译的适合提示 'layout' 不存在，因为 thmem/next 从github拉下来是有自己单独的仓库管理的。
正确的步骤应该是：
> 1. fork theme-next/hexo-theme-next
> 2. git pull 'https://github.com/<你的用户名>/hexo-theme-next.git' theme/next
> 3. 到 theme/next中，修改 _config.yml 文件, 并保存提交到git
> 4. 通过 git submodule add https://github.com/<username>/hexo-theme-next.git theme/next
> 5. 到 xx.github.io 中，保存提交git

这样之后 travis 在编译的时，会自动init submodule 拉起子库代码,就不会出现缺文件的情况。同时需要注意下，git submodule add 的时候，仓库地址要用https的，不能走ssh通道，不然 travis 拉取 submodule 时会提示： 

``` bash
Please make sure you have the correct access rights and the repository exists.
fatal: clone of 'git@github.com:liop/hexo-theme-next.git' into submodule path '/home/travis/build/liop/liop.github.io/themes/next' failed
Failed to clone 'themes/next'. Retry scheduled
Cloning into '/home/travis/build/liop/liop.github.io/themes/next'...
Permission denied (publickey).
fatal: Could not read from remote repository.
```

#### next 配置语言

hexo 默认是英文，需要修改为：<code> language: zh-CN </code>, 'zh-CN' 对应  theme/next/language 文件夹中的 zh-CN.yml，一些文章说的配置 'zh-Hans' 不起作用是因为theme/next/language 下不存在 zh-Hans.yml 。

#### TODO：
  
接下来将之前的文章迁移过来，遇到问题再记录



[hexo]:https://hexo.io/zh-cn/docs/github-pages.html 'hexo with travis'