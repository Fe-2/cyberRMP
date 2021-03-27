# Nuxt + Express + Mongodb

### 此项目包含Vue SSR渲染以及API接口服务

## 项目开始

```bash
# 安装依赖
$ npm install

# Vue渲染服务 localhost:8080. API 服务 localhost:9090
$ npm run dev:server  开发环境使用自定义服务器接口中间件启动（开发时使用此方式）
$ npm run dev         Nuxt.js默认启动方式
$ npm run prod:server 生产环境使用自定义服务器接口中间件启动（正式环境使用此方式）

# build for production and launch server（nuxt 默认正式环境启动）
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
