export default {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },
  head: {
    title: 'gvpTest',
    htmlAttrs: {lang: 'en'},
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  css: [],
  serverMiddleware: [
    {
      path: '/video', handler: '~/server-middleware/Video.ts'
    }, {
      path: '/api', handler: '~/server-middleware/Api.ts'
    }
  ],

  components: true,
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv',"@nuxtjs/firebase"],
  firebase:{
      config: require('./firebase-config.json'),
      services:{
        firestore: true,
        auth: true,
        appCheck: true
      }
  },
  loading: {
    continuous: true,
    color: '#847ff9',
    height: '2px',
  },
  axios: {baseURL: '/'},
  build: {}
}
