<template>
  <div class="user">
    <van-sticky :offset-top="0">
      <van-nav-bar title="个人中心" />
    </van-sticky>

    <div class="header">
      <p class="agent_name">{{info.exchangeSn}}</p>
      <div class="user_info_box">
        <!-- <img class="user_img" src="@/assets/logo.png" alt /> -->
        <div class="user_info">
          <p>{{info.householdName}}</p>
          <p>{{info.houseAddress}}</p>
        </div>
      </div>
    </div>
    <van-cell title="历史缴费记录" @click="getrRecording" />
    <!-- <van-cell title="立即缴费" is-link to="/" /> -->
  </div>
</template>



<script>
import {
  wxHouseholdInfo, // 查询个人信息
} from "@/api/index";

export default {
  name: "user",
  data() {
    return {
      activeNames: ["1"],
      info: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      // 查询个人信息
      wxHouseholdInfo("32164").then((res) => {
        this.info = res.data;
      });
    },
    // 查询缴费记录接口
    getrRecording() {
      this.$router.push({ path: "/list" });
    },
  },
};
</script>

<style lang="sass" >
.user
  .header
    background-color: #40b9df
    background-image: linear-gradient(to right, #40b9df, #5293e3)
    color: #fff
    .agent_name
      text-align: left
      padding: 30px 30px 50px
      font-size: 20px

  .user_info_box
    display: flex
    align-items: center
    padding: 0 30px 50px
    .user_info
      display: flex
      text-align: left
      align-items: center
      flex-wrap: wrap
      p:nth-child(1)
        font-size: 20px
        margin-bottom: 5px
      p
        display: block
        width: 100%

    .user_img
      width: 50px
      height: 50px

  .van-cell__title
    text-align: left
</style>>
