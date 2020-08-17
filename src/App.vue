<template>
  <div id="app">
    <router-view />

    <div style="height:50px"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/" icon="home-o">公告</van-tabbar-item>
      <van-tabbar-item replace to="/pay" icon="search">缴费</van-tabbar-item>
      <van-tabbar-item replace to="/list" icon="label-o">缴费历史</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { wxLogin } from '@/api/index'
export default {
  data() {
    return {
      active: 0,
      AppId: 'wx1f69a35b38f4978e',
    }
  },
  watch: {
    // 监听路由跳转。
    $route(newRoute, oldRoute) {
      if (newRoute.name == 'Home') {
        this.active = 0
      }
      if (newRoute.name == 'Pay') {
        this.active = 1
      }
      if (newRoute.name == 'List') {
        this.active = 2
      }
      if (!window.localStorage.getItem('openid')) {
        // 获取openId
        if (this.getQueryVariable('code')) {
          let code = this.getQueryVariable('code').replace('&state=123', '')
          this.getCode(code)
        } else {
          this.getCode()
        }
      }
    },
  },
  created() {
    this.font_size() //rem响应式
  },
  methods: {
    getCode(code) {
      // const code = this.$route.query.code
      if (code) {
        // 获取openid
        wxLogin(code).then((res) => {
          if (res.errno == 0) {
            window.localStorage.setItem('openid', res.data.openid)
          }
        })
      } else {
        const local = window.location.href
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
          this.AppId
        }&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      }
    },
    getQueryVariable(variable) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
          return pair[1]
        }
      }
      return false
    },
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
