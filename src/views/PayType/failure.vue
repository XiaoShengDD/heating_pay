<template>
  <div class="failure">
    <van-nav-bar
      title="缴费失败"
      left-text="返回"
      right-text="重新支付"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <swiper />

    <div class="payInfo">
      <p>{{msg}}</p>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/swiper' // secondary package based on el-pagination

export default {
  name: 'failure',
  components: { Swiper },
  data() {
    return {
      msg: window.localStorage.getItem('msg'),
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1) //返回上一层
    },
    onClickRight() {
      this.$router.go(-1) //返回上一层
    },
  },
}
</script>

<style lang="sass" scoped>
.payInfo
  padding: 30px 
  text-align: left
  p
    margin-bottom: 5px



</style>>
