<template>
  <div class="home">
    <van-sticky :offset-top="0">
      <van-nav-bar title="公告详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>

    <swiper />

    <div class="info">
      <div class="title">{{des.title}}</div>
      <div class="desBox">
        <div class="des" v-html="des.detail"></div>
        <div class="time">{{ des.createTime }}</div>
      </div>
    </div>

    <!-- <div style="margin: 20px 50px;">
      <van-button round block type="info" native-type="submit">立即缴费</van-button>
    </div>-->
  </div>
</template>

<script>
import Swiper from "@/components/swiper"; // secondary package based on el-pagination
import { announcementDetail } from "@/api/index";

export default {
  name: "home",
  components: { Swiper },
  data() {
    return {
      des: {},
    };
  },
  created() {
    this.getDes();
  },
  methods: {
    getDes() {
      announcementDetail(this.$route.params.id).then((res) => {
        this.des = res.data;
      });
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
}
.info {
  padding: 10px;
  margin: 10px;
  text-align: left;
}

.des {
  padding: 10px 0;
}
.time {
  text-align: right;
  color: #ccc;
}
</style>>
