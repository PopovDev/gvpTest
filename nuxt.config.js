export default {
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
  plugins: ["~/plugins/firebase.ts"],
  components: true,
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios'],
  axios: {baseURL: '/'},
  build: {}
}
