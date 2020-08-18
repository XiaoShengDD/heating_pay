<template>
  <div class="success">
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    <swiper />

    <div v-if="flag == 1">
      <!-- <div class="payInfo" v-if="dataJson.length == 1">
        <p>住户编号：{{ dataJson[0].householdSn }}</p>
        <p>姓名：{{ dataJson[0].householdName }}</p>
        <p>代缴编号：{{ dataJson[0].exchangeSn }}</p>
        <p>房屋地址：{{ dataJson[0].houseAddress }}</p>
        <p>建筑面积：{{ dataJson[0].acreage }}</p>
        <p>缴费类型：{{ dataJson[0].chargingStandardCategory }}</p>
        <p>应缴金额：{{ dataJson[0].orderPrice }}</p>
      </div>-->

      <van-collapse v-model="activeNames">
        <van-collapse-item
          :title="'住户编号：' + item.householdSn"
          v-for="(item,index) in dataJson"
          :key="item.id"
          :name="index"
        >
          <div class="payInfo">
            <p>住户编号：{{ item.householdSn }}</p>
            <p>姓名：{{ item.householdName }}</p>
            <p>代缴编号：{{ item.exchangeSn }}</p>
            <p>房屋地址：{{ item.houseAddress }}</p>
            <p>建筑面积：{{ item.acreage }}</p>
            <p>缴费类型：{{ item.chargingStandardCategory }}</p>
            <p>应缴金额：{{ item.orderPrice }}</p>
          </div>

          <div style="margin: 20px 50px;">
            <van-button round block type="info" @click="submit(item)" native-type="submit">立即缴费</van-button>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div v-if="flag == 2">
      <p class="error">对不起，您查询的缴费信息不存在，请核对住户编号和房屋地址是否正确</p>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/swiper"; // secondary package based on el-pagination
import { Notify } from "vant";
import { wxHouseholdSearch, subimtOrder } from "@/api/index";
export default {
  name: "success",
  // components: { Swiper },
  components: {
    [Notify.Component.name]: Notify.Component,
    Swiper,
  },
  data() {
    return {
      flag: 0,
      dataJson: [],
      title: "",
      right: "",
      activeNames: [0],
    };
  },
  created() {
    this.getPayInfo();
  },
  methods: {
    getPayInfo() {
      wxHouseholdSearch({ houseSnOrAddress: this.$route.query.id }).then(
        (res) => {
          if (res.errmsg == "成功") {
            this.title = "缴费记录明细";
            this.dataJson = res.data;
            this.flag = 1;
          } else {
            this.title = "未查询到缴费信息";
            this.flag = 2;
          }
        }
      );
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    //支付
    submit(info) {
      let that = this;
      let data = {
        orderPrice: info.orderPrice,
        householdSn: info.householdSn,
        weixinOpenid: window.localStorage.getItem("openid"),
      };
      subimtOrder(data).then((res) => {
        if (
          res.data.result.result_code &&
          res.data.result.result_code == "SUCCESS"
        ) {
          // 调起支付
          WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
              appId: res.data.appId, //公众号名称，由商户传入
              timeStamp: res.data.timestamp, //时间戳，自1970年以来的秒数
              nonceStr: res.data.nonce_str, //随机串
              package: res.data.prepay_id,
              signType: "MD5", //微信签名方式：
              paySign: res.data.sign, //微信签名
            },
            function (res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                that.$router.push({
                  path: "/success",
                  query: { id: info.id },
                });
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              } else {
                // Window.localStorage.setItem('msg', '失败原因')
                // that.$router.push({
                //   path: '/failure',
                // })
                // 支付失败
                Notify("支付失败");
              }
            }
          );
        } else {
          // 支付失败
          Notify(res.data.result.err_code_des);
        }
      });
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

.error 
  padding: 10px
  text-align: left
  



</style>>
