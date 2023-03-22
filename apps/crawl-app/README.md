## 概述

门户新闻爬虫，定时爬取强军网中的新闻插入门户数据库

## 镜像构建

```shell

# 构建镜像
docker build -t crawl-app .

# 镜像导出
docker save -o crawl-app.tar.gz IMAGE_ID

# 镜像导入
docker load -i crawl-app.tar.gz
```

## 启动

`.env` 为爬虫的配置文件，启动 docker 镜像时需要挂载数据卷

1. 配置文件
2. 日志目录
3. 下载文件目录（需要挂载到 tomcat 下）

```shell

useradd crawl

passwd crawl

cd /home/crawl

docker run -id \
  -v /home/crawl/.env:/home/news/.env \
  -v /home/crawl/logs:/home/news/logs \
  -v /home/sdata/tomcat/webapps/storage_area/news_download:/home/news/download \
  --name=crawl-app IMAGE_ID
```

## 配置

- LOG_LEVEL: 日志级别

- CRON: 爬取频率，CRON 表达式

- NEWS_COLUMN_API_URL: 获取所有新闻栏目数据服务地址

- DMDB_URL: 达梦数据库连接地址，其中包括了用户名密码

- NEWS_TABLE: 新闻表名

- RECORDS_TABLE: 爬取记录表名

- MYSQL_URL: mysql 连接地址

- MYSQL_USER: mysql 用户

- MYSQL_PASSWORD: mysql 密码

- CURRENT_DB: 当前使用的数据库，dmdb / mysql