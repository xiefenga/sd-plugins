## 概述

本仓库使用了 monorepo 的方式管理插件

- `plugins`: 前端二开插件

- `packages`: 工具模块，例如脚手架、`request` 封装

- `apps`: 独立应用

- `interfaces`: 后台接口

## packages

- `sd-plugin-scripts`: 二开工程脚手架

- `sd-plugin-request`: 二开 `request` 封装

- `sd-dev-login`: 二开登录

## plugins

前端二开插件，目前仅门户项目

- `portal-login`: 门户登录页

- `portal-background` 目录下是门户后台中的插件

  - `account-manager-page`: 用户信息页面

  - `user-portrait-bigscreen`: 用户画像分析大屏


- `portal-index` 目录下是门户首页中的插件

  - `portal-accordion`: 门户首页手风琴

  - `portal-carousel`: 门户首页左上图片轮播

  - `portal-header`: 门户首页顶栏

  - `portal-reports`: 门户首页右上大屏轮播（大屏插件）

  `portal-shared` 为门户首页插件共享的代码模块

## interfaces

后台接口

- `sdata-business-user`: 用户信息页面用户选择查询接口
- `user-portrait-search`: 用户画像大屏用户查询接口

## apps

独立应用

- `crawl-app`: 新闻爬虫
- `instant-message-popup`: 消息弹窗
