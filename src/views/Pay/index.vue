<template>
  <div class="pay">
    <van-sticky :offset-top="0">
      <van-nav-bar title="查询缴费信息" />
    </van-sticky>

    <swiper />
    <div class="form_box">
      <van-form @submit="onSubmit">
        <van-field
          v-model="code"
          name="code"
          placeholder="住房编号或房屋地址"
          :rules="[{ required: true, message: '住房编号和房租住址不得为空' }]"
        />

        <div style="margin: 20px 0;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/swiper"; // secondary package based on el-pagination

export default {
  name: "pay",
  components: { Swiper },
  data() {
    return {
      code: "",
    };
  },
  methods: {
    // 缴费信息差寻
    onSubmit() {
      if (this.code != "") {
        window.localStorage.setItem("code", this.code);
        this.$router.push({ path: "/PayInfo" });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.form_box
  padding: 20px
  margin-top: 20px
</style>>
