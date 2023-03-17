docker run -id \
  -v /home/crawl/.env:/home/news/.env \
  -v /home/sdata/tomcat/webapps/storage_area/news_download:/home/news/download \
  --name=crawl-app-1.0 \
  crawl-app:1.0

