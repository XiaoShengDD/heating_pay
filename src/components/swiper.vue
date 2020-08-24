<template>
  <div class="swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import bg from "@/assets/bg.jpg";
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
  img {
    // height: 40vw;
    width: 100vw;
  }
}
</style>>
