<template>
  <div class="defray">
    <van-nav-bar
      title="支付"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <div class="price">
      <span>￥</span> 88.6
    </div>
    <div class="beneficiary">收款方</div>
    <div class="img_box">
      <img src="@/assets/logo.png" alt srcset />
    </div>
    <div class="beneficiary_name">**供热有限公司</div>

    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
export default {
  name: 'defray',
  data() {
    return {
      activeNames: ['1'],
    }
  },
  methods: {
    onClickLeft() {},
    onClickRight() {},
    onSubmit() {},
  },
}
</script>

<style lang="sass" scoped>
.price
  font-size: 40px
  text-algin: center
  margin: 60px 0
  color: red
  span
    font-size: 25px

.beneficiary
  color: #ccc
  margin: 5px 0

.img_box
  width: 100px
  height: 100px
  margin: 0 auto
  img
    width: 100%
    height: 100%
    display: block

.beneficiary_name
  font-size: 20px
  margin-top: 20px


</style>>
