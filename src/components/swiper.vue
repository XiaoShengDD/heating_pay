<template>
  <div class="swiper">
    <van-sticky :offset-top="46">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </van-sticky>
  </div>
</template>

<script>
import bg from "@/assets/bg.png";
export default {
  name: "Swiper",
  data() {
    return {
      images: [bg],
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  ::v-deep .van-swipe-item {
    height: 50vw;
    overflow: hidden;
  }
  img {
    width: 100vw;
    position: relative;
    top: -50px;
  }
}
</style>>
