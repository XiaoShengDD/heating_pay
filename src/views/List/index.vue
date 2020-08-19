<template>
  <div class="list">
    <van-nav-bar title="缴费记录" />
    <swiper />

    <van-collapse accordion v-model="activeNames" @change="getPayInfo">
      <van-collapse-item
        v-for="(item,index) in list"
        :key="item.id"
        :title="item.date"
        :name="index"
      >
        <div class="payInfo">
          <p>住户编号：{{ list[index].info.payHouseholdSn }}</p>
          <p>订单状态：{{ list[index].info.orderStatus }}</p>
          <p>缴费年度：{{ list[index].info.payYear }}</p>
          <p>应缴金额：{{ list[index].info.orderPrice }}</p>
          <p>住户地址：{{ list[index].info.houseAddress }}</p>
          <p>房屋面积：{{ list[index].info.acreage }}</p>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import Swiper from "@/components/swiper"; // secondary package based on el-pagination
import { wxOrderList, wxOrderDeatil } from "@/api/index";

export default {
  name: "list",
  components: { Swiper },
  data() {
    return {
      activeNames: "",
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
        for (let key in res.data) {
          this.list.push({
            date: key,
            id: res.data[key],
            info: {
              payHouseholdSn: "",
              orderStatus: "",
              payYear: "",
              orderPrice: "",
              houseAddress: "",
              acreage: "",
            },
          });
        }
      });
    },

    // 查询用户支付详细信息
    getPayInfo(index) {
      if (
        index != "" &&
        index != null &&
        index != "null" &&
        index != undefined
      ) {
        wxOrderDeatil(this.list[index].id).then((res) => {
          this.list[index].info = res.data;
        });
      }
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
    padding: 0 30px;
    text-align: left;

    p {
      margin-bottom: 5px;
    }
  }
}
</style>>
