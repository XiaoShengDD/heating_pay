<template>
  <div class="list">
    <van-nav-bar title="缴费记录" />
    <swiper />

    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="(item,index) in list" :key="index" :title="item.year" :name="index">
        <div class="payInfo" v-for="info in item.info" :key="info.id">
          <p>住户编号：{{ info.payHouseholdSn }}</p>
          <p>订单状态：{{ info.orderStatus }}</p>
          <p>缴费年度：{{ info.payYear }}</p>
          <p>应缴金额：{{ info.orderPrice }}</p>
          <p>住户地址：{{ info.houseAddress }}</p>
          <p>房屋面积：{{ info.acreage }}</p>
        </div>
      </van-collapse-item>
    </van-collapse>

    <div v-if="list.length == 0">
      <p class="error">暂无订单信息</p>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/swiper"; // secondary package based on el-pagination
import { wxOrderList } from "@/api/index";

export default {
  name: "list",
  components: { Swiper },
  data() {
    return {
      activeNames: [],
      list: [],
      index: 0,
    };
  },
  created() {
    this.getHistoryPay();
  },
  methods: {
    getHistoryPay() {
      // 用户编号，全局变量
      wxOrderList(window.localStorage.getItem("openid")).then((res) => {
        this.list = res.data;
      });
    },
  },
};
</script>

<style lang="scss" >
.list {
  .van-cell--clickable {
    text-align: left;
  }

  .payInfo {
    padding: 10px 30px 0;
    text-align: left;
    p {
      margin-bottom: 5px;
    }
  }

  .payInfo:nth-last-child(1) {
    margin-bottom: 10px;
  }

  .error {
    padding: 10px;
    text-align: left;
  }
}
</style>>
