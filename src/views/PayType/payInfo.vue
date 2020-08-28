<template>
  <div class="payInfo">
    <van-sticky :offset-top="0">
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <swiper />

    <van-list
      :error.sync="error"
      error-text="暂无数据"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getPayInfo"
    >
      <van-collapse v-model="activeNames" @change="getInfo">
        <van-collapse-item v-for="(item,index) in dataJson" :key="item.householdSn" :name="index">
          <template #title>
            <div>
              <div>住户编号:{{ item.householdSn }}</div>
              <div>房屋地址:{{ item.houseAddress }}</div>
            </div>
          </template>
          <div>
            <p>住户编号：{{ item.householdSn }}</p>
            <p>住户姓名：{{ item.householdName }}</p>
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
    </van-list>

    <van-dialog title="身份验证" v-model="show" show-cancel-button :before-close="beforeClose">
      <van-field
        label-width="60px"
        v-model="username"
        name="住户姓名"
        label="住户姓名"
        placeholder="请填写住户姓名"
      />
    </van-dialog>
  </div>
</template>

<script>
import Swiper from "@/components/swiper"; // secondary package based on el-pagination
import { Notify, Dialog } from "vant";
import {
  wxHouseholdSearch,
  subimtOrder,
  wxHouseholdConfirmr,
} from "@/api/index";
export default {
  name: "success",
  // components: { Swiper },
  components: {
    [Notify.Component.name]: Notify.Component,
    [Dialog.Component.name]: Dialog.Component,
    Swiper,
  },
  data() {
    return {
      flag: 0,
      show: false,
      loading: false,
      finished: false,
      dataJson: [],
      title: "缴费房屋",
      right: "",
      activeNames: [],
      idnexList: [], // 记录已打开链接
      idnex: 0, // 当前打开的弹层
      pages: 0,
      info: {}, // 当前打开的用户信息
      error: false,
      username: "",
      data: {
        houseSnOrAddress: localStorage.getItem("code"),
        page: 0,
        limit: 20,
      },
    };
  },

  created() {
    // this.getPayInfo();
  },
  mounted() {},
  methods: {
    getInfo(e) {
      if (e.length > this.activeNames.length) {
        this.index = JSON.parse(JSON.stringify(e)).pop();
        this.info = this.dataJson[this.index];
        if (this.idnexList.indexOf(this.index) == -1) {
          e.pop();
          this.show = true;
        }
      }
    },
    beforeClose: function (action, done) {
      const that = this;
      // 点击事件 - 备注按钮提示框
      if (action === "confirm") {
        // 确认
        let data = {
          householdName: this.username,
          householdSn: this.info.householdSn,
        };

        wxHouseholdConfirmr(data).then((res) => {
          if (res.data) {
            let a = [];
            a.push(this.index);
            this.activeNames = [...this.activeNames, ...a];
            if (this.idnexList.indexOf(this.index) == -1) {
              this.idnexList = [...this.idnexList, ...a];
            }
          } else {
            Notify("姓名输入错误");
          }
          this.username = "";
        });
        done(); // 关闭提示框
      } else if (action === "cancel") {
        // 取消
        console.log("[点击事件 - 备注] - 取消");
        done(); // 关闭提示框
      }
    },

    getPayInfo() {
      this.data.page++;
      wxHouseholdSearch(this.data).then((res) => {
        if (res.errmsg == "成功") {
          this.dataJson = [...this.dataJson, ...res.data.records];
          this.pages = res.data.pages;
          if (this.pages == this.data.page) {
            this.finished = true;
          }
        } else {
          this.error = true;
        }
        this.loading = false;
      });
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
          let id = res.data.id;
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
                  query: { id: id },
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

<style lang="scss" scoped>
.payInfo {
  text-align: left;
  p {
    margin-bottom: 5px;
  }
  ::v-deep .van-collapse .van-icon {
    top: 13px;
  }
  ::v-deep .van-loading {
    text-align: center;
    margin-top: 50px;
  }

  ::v-deep .van-field {
    margin: 10px 0;
  }

  .error {
    padding: 10px;
    text-align: left;
  }
}
</style>>
