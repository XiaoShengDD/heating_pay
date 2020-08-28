<template>
  <div class="success">
    <van-sticky :offset-top="0">
      <van-nav-bar title="缴费成功" right-text="查看缴费记录" @click-right="onClickRight" />
    </van-sticky>

    <swiper />

    <div class="payInfo">
      <p>住户编号：{{ list.payHouseholdSn }}</p>
      <p>订单状态：{{ list.orderStatus }}</p>
      <p>缴费年度：{{ list.payYear }}</p>
      <p>应缴金额：{{ list.orderPrice }}</p>
      <p>住户地址：{{ list.houseAddress }}</p>
      <p>房屋面积：{{ list.acreage }}</p>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/swiper"; // secondary package based on el-pagination
import { wxOrderDeatil } from "@/api/index";
export default {
  name: "success",
  components: { Swiper },
  data() {
    return {
      list: {},
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      wxOrderDeatil(this.$route.query.id).then((res) => {
        this.list = res.data;
      });
    },
    onClickRight() {
      this.$router.push({ path: "/list" });
    },
  },
};
</script>

<style lang="sass" scoped>
.payInfo
  padding: 30px 
  text-align: left
  p
    margin-bottom: 5px



</style>>
