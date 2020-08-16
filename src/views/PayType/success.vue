<template>
  <div class="success">
    <van-nav-bar
      title="缴费成功"
      left-text="返回"
      right-text="查看缴费记录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <swiper />

    <div class="payInfo">
      <p>缴费年度:2020年</p>
      <p>住户编号:696969</p>
      <p>姓名:李琳</p>
      <p>房屋编号:12345678</p>
      <p>房屋地址:中山区五路88号4单元502室</p>
      <p>建筑面积:123</p>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/swiper' // secondary package based on el-pagination

export default {
  name: 'success',
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
