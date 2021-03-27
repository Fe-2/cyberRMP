/*eslint-disable*/
const cookieParser = require('cookie-parser');
const os = require('os');

const interfaces = os.networkInterfaces(); // 环境中获取局域网中的本机iP地址
let IPAdress = '';
for (const devName in interfaces) {
  const iface = interfaces[devName];
  for (let i = 0; i < iface.length; i++) {
    const alias = iface[i];
    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
      IPAdress = alias.address;
    }
  }
}

process.env.hotUpdate = '0';// 开发环境热更新状态
process.env.baseIP = IPAdress;
process.env.baseUrl = `http://${IPAdress}:9090`;
module.exports = {
  server: {
    port: 9090,
    host: IPAdress,
  },
  env: {
    hotUpdate: '0',
    baseIP: IPAdress,
    baseUrl: `http://${IPAdress}:9090`,
  },
  serverMiddleware: [
    cookieParser(),
    { path: '/API', handler: '@/serverAPI/api/index' }, // 提供API接口服务的服务器中间件
  ],
  router: {
    middleware: 'auth', // 提供登录鉴权的页面渲染中间件
  },
  loading: {
    color: '#f88311',
    height: '2px',
  },
  buildDir: '.FirefinchRMP',
  telemetry: false,
  babelrc: false,
  cacheDirectory: undefined,
  presets: ['@nuxt/babel-preset-app'],
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Firefinch RMP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'Firefinch RMP', name: 'Firefinch RMP', content: process.env.npm_package_description || 'Firefinch RMP' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/reset.css',
    '@/assets/css/element-ui/theme-chalk/index.css',
    // 'element-ui/lib/theme-chalk/index.css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/element-ui',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/components',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `http://${IPAdress}:9090`,
  },
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    // analyze: true,
    // assetFilter: (assetFilename) => {
    //   return assetFilename.endsWith('.js');
    // },
    transpile: [/^element-ui/],
    extractCSS: process.env.NODE_ENV === 'production',
    optimization: {
      runtimeChunk: {
        name: 'firefinch-chunk',
      },
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 250000,
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            chunks: 'initial',
            priority: -10,
            reuseExistingChunk: false,
            test: /node_modules\/(.*)\.js/,
          },
          styles: {
            name: 'chunk-styles',
            test: /\.(scss|css)$/,
            chunks: 'all',
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    },
  },
};
