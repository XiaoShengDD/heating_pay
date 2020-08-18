<template>
  <div class="pay">
    <van-nav-bar title="查询缴费信息" />
    <swiper />
    <div class="form_box">
      <van-form @submit="onSubmit">
        <van-field
          v-model="code"
          name="code"
          placeholder="请输入住房编号或房屋地址"
          :rules="[{ required: true, message: '请输入住房编号或房屋地址' }]"
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
        this.$router.push({ path: "/PayInfo", query: { id: this.code } });
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
