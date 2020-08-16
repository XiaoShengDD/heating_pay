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
      <p>失败原因失败原因失败原因失败原因失败原因失败原因失败原因</p>
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
      activeNames: ['1'],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1) //返回上一层
    },
    onClickRight() {},
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
