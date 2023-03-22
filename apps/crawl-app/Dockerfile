FROM node:16-alpine

LABEL author="0x1461A0@x1294699027@gmail.com"

RUN mkdir -p /home/news/crawl

COPY . /home/news/crawl

WORKDIR /home/news/crawl

# RUN apt-get update
# RUN apt-get install -y vim

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install pm2 -g

RUN yarn

RUN yarn build

ENV NODE_ENV=production

CMD ["pm2-runtime", "dist/main.js"]
